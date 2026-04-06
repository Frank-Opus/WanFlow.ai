# WanFlow Linux Systemd Deployment

## Scope

This deployment path is for the current Linux host. It runs the unified Next.js platform in production mode while keeping the Python evaluation engine available to the platform API and async worker.

For delivery scope, verification order, backup, and migration notes, read `docs/release-and-delivery.md` together with this document.

## Files

- `deploy/systemd/start-wanflow-web.sh`
- `deploy/systemd/wanflow-web.env.example`
- `deploy/systemd/install-systemd.sh`
- `deploy/systemd/install-user-systemd.sh`
- `web/scripts/check-platform-config.mjs`
- `web/src/app/api/health/route.ts`

## Runtime assumptions

- Repo root: this project snapshot directory
- Node dependencies already installed in `web/`
- Python runtime available at `WANFLOW_PYTHON_BIN`
- Model endpoint reachable at `WANFLOW_BASE_URL`

## One-time setup

1. Build dependencies if needed:

```bash
cd /path/to/Data-Centric/web
npm install
```

2. Install Python package dependencies:

```bash
cd /path/to/Data-Centric
python3 -m pip install -e .
```

This now installs the OCR fallback used for scanned PDFs:

- `rapidocr-onnxruntime`

3. Install the systemd unit:

```bash
cd /path/to/Data-Centric
sudo bash deploy/systemd/install-systemd.sh
```

### No-sudo fallback

If the host does not allow writing `/etc/systemd/system` but `systemctl --user` is available, install the user service instead:

```bash
cd /path/to/Data-Centric
bash deploy/systemd/install-user-systemd.sh
```

This creates:

- `~/.config/systemd/user/wanflow-web.service`
- `~/.config/wanflow/wanflow-web.env`

Recommended for the current workstation:

- keep `HOST=127.0.0.1`
- keep `PORT=3010`
- ensure `loginctl show-user $USER` reports `Linger=yes`

## Environment file

The installer creates `/etc/wanflow/wanflow-web.env` if it does not exist.

User-service mode creates `~/.config/wanflow/wanflow-web.env` instead.

Required values:

- `WANFLOW_QWEN_API_KEY`
- `WANFLOW_PYTHON_BIN`
- `WANFLOW_BASE_URL`
- `WANFLOW_DEFAULT_MODEL`
- `PORT`

Recommended current defaults:

- `PORT=3010`
- `WANFLOW_BASE_URL=http://35.220.164.252:3888/v1/`
- `WANFLOW_DEFAULT_MODEL=Qwen/Qwen3-235B-A22B-Thinking-2507`

Port policy:

- Keep validation and staging on the fixed local port `3010`
- Do not fan out to `3011+` for ad hoc test instances
- Restart the existing `3010` process before each new verification round

Optional override:

- `WANFLOW_SKIP_MODEL_CATALOG_CHECK=1`
  - Use only when the upstream model catalog endpoint is intentionally unreachable during boot and you still want local startup.

## Startup preflight

The systemd start script now runs a config preflight before `next start`:

```bash
cd /path/to/Data-Centric/web
npm run check:platform-config
```

Current checks:

- `WANFLOW_QWEN_API_KEY` exists
- `WANFLOW_PYTHON_BIN` resolves, otherwise falls back to `python3`
- `WANFLOW_BASE_URL/models` is reachable
- `WANFLOW_DEFAULT_MODEL` normalizes to a model id that exists in the live catalog

If any required check fails, startup stops before the service binds to port `3010`.

## Operations

Start and enable:

```bash
sudo systemctl enable --now wanflow-web
```

User-service mode:

```bash
systemctl --user enable --now wanflow-web
```

Restart after code updates:

```bash
cd /path/to/Data-Centric/web
npm run build
sudo systemctl restart wanflow-web
```

User-service mode:

```bash
cd /path/to/Data-Centric/web
npm run build
systemctl --user restart wanflow-web
```

Check logs:

```bash
sudo journalctl -u wanflow-web -n 200 --no-pager
```

User-service mode:

```bash
journalctl --user -u wanflow-web -n 200 --no-pager
```

Check status:

```bash
sudo systemctl status wanflow-web
```

User-service mode:

```bash
systemctl --user status wanflow-web
```

Health probe:

```bash
curl http://127.0.0.1:3010/api/health
```

Expected:

- HTTP `200` when the app is live and required runtime checks pass
- HTTP `503` when required runtime checks fail
- Response body includes `status`, `checks`, `baseUrl`, normalized model id, Python runtime resolution, and storage readiness

## Verified release checklist

Use this exact sequence on the current Linux host:

```bash
cd /path/to/Data-Centric/web
npm run build

cd /path/to/Data-Centric
python3 -m pytest tests -q

sudo systemctl restart wanflow-web
curl http://127.0.0.1:3010/api/health
curl http://127.0.0.1:3010/api/platform/projects

cd /path/to/Data-Centric/web
npm run smoke:platform
```

What the smoke script now verifies:

- project list API
- multi-file source upload in one request
- relative path persistence
- JSON source import
- Markdown source normalization through the Python CLI
- PDF source normalization and artifact download
- DOCX source normalization and artifact download
- normalized/text source download route
- manual item creation
- sync benchmark run
- async benchmark run
- artifact download

## Notes

- The web service exposes both platform UI and Route Handlers.
- Sync benchmark runs execute Python inline through the API process.
- Async benchmark runs spawn `web/scripts/platform-runner.mjs`, which uses the same environment variables and Python interpreter configuration.
- Scanned PDFs first try embedded-text extraction, then OCR fallback via `rapidocr-onnxruntime`. If OCR still fails, the platform persists explicit diagnostics warnings.
- `platform-data/` is stored under the repo root by the current file-backed platform store. Back it up together with the repo if you need state persistence.
