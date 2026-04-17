# WanFlow Docker + HKZ Deployment Design

Date: 2026-04-11
Branch: `feat/platform-auth-contact-refresh`
Status: Draft approved for implementation pending final user review

## Goal

Create a production-ready deployment shape for WanFlow that matches the current working system:

- local development remains on the current workstation
- release deployment happens on the remote `HKZ` host via SSH
- public access uses `wanflowai.com`
- the running service includes both the marketing site and `DataFlow / ProofBench`
- the deployment preserves current file-backed platform storage, Python-backed processing, and credentials auth

## Context

The current application is not a static marketing site. It includes:

- Next.js marketing pages and route handlers under `web/`
- protected platform routes under `/dataflow/proofbench`
- file-backed persistence for projects, uploads, artifacts, and contact leads
- Python-dependent processing and runner scripts
- a Caddy server already present on `HKZ`
- DNS for `wanflowai.com` already pointing to `HKZ`

This means the deployment target should support:

- persistent writable storage
- a Node runtime
- a Python runtime
- background process execution from the web app
- host-level reverse proxy and TLS

## Chosen approach

Use a **single application container** for the WanFlow app and keep **Caddy on the HKZ host** as the public reverse proxy.

### Why this is the right fit now

- It matches the current architecture without forcing a premature split into multiple services.
- It uses the infrastructure already on `HKZ` instead of replacing it.
- It supports the current file-backed storage model by mounting a host directory.
- It keeps the path to public deployment short and understandable.
- It leaves room for later evolution into multi-container services if the platform grows.

## Rejected alternatives

### 1. Deploy the whole system directly to Vercel

Rejected because the current platform writes files, stores state on disk, depends on Python, and uses runner scripts that are a poor fit for Vercel serverless execution.

### 2. Full containerized stack including Caddy in Docker

Rejected for now because `HKZ` already has a working host-level Caddy service. Replacing it would add deployment risk without delivering immediate product value.

### 3. Split web app and worker into separate containers now

Rejected for now because the current priority is reliable deployment, not horizontal scaling. A split architecture would increase operational complexity before there is a proven need.

## Target runtime architecture

### Host responsibilities (`HKZ`)

`HKZ` will provide:

- Docker engine and Docker Compose plugin
- host-level Caddy
- persistent storage directories
- environment file for production secrets
- public DNS target for `wanflowai.com` and `www.wanflowai.com`

### Container responsibilities

The application container will provide:

- Node.js runtime for Next.js production server
- Python 3 runtime for platform processing scripts
- built Next.js production bundle
- execution of the unified web app on an internal port

### Reverse proxy flow

Public request flow:

1. browser requests `https://wanflowai.com`
2. host-level Caddy receives the request and terminates TLS
3. Caddy reverse proxies to `127.0.0.1:3010`
4. Docker maps host `127.0.0.1:3010` to container port `3010`
5. Next.js serves the marketing site, login flow, and platform APIs

## Deliverables to implement

### 1. Docker packaging

Add a production `Dockerfile` that:

- uses a multi-stage build
- installs Node dependencies and builds the Next.js app
- includes Python 3 in the runtime image
- runs the production server from `web/`
- keeps the final image focused on runtime needs only

### 2. Compose configuration

Add a production compose file that:

- defines a `wanflow-web` service
- builds from the repo root with the web app as the main entrypoint
- loads an env file such as `.env.production`
- binds only to `127.0.0.1:3010:3010`
- mounts a host persistent directory for `WANFLOW_PLATFORM_DIR`
- restarts automatically unless explicitly stopped

### 3. Environment configuration

Add a production env template that groups variables into:

- core runtime
- auth
- model / provider
- storage
- optional future auth provider flags

Must include at minimum:

- `PORT`
- `WANFLOW_PLATFORM_DIR`
- `WANFLOW_QWEN_API_KEY`
- `WANFLOW_PYTHON_BIN`
- `WANFLOW_BASE_URL`
- `WANFLOW_DEFAULT_MODEL`
- `WANFLOW_SESSION_COOKIE`
- `WANFLOW_SESSION_SECRET`
- `WANFLOW_SESSION_TTL_SECONDS`
- `WANFLOW_ADMIN_EMAIL`
- `WANFLOW_ADMIN_PASSWORD`
- `WANFLOW_ADMIN_NAME`
- `WANFLOW_ADMIN_ROLE`
- `WANFLOW_AUTH_ENABLE_OAUTH`
- `WANFLOW_AUTH_SSO_HINT`

### 4. Deployment documentation

Document a clear release workflow for:

- local verification before deployment
- git push / pull flow
- Docker build and restart on `HKZ`
- Caddy config for `wanflowai.com`
- post-deploy health checks
- rollback guidance

## Required project cleanup while implementing

This task should also standardize deployment-facing project structure without changing product behavior.

### Keep

- `web/` for the app
- `deploy/systemd/` as existing non-Docker fallback
- `docs/deployment/` for operational docs
- `platform-data/` as the logical persistent state root

### Add

- repo-root `Dockerfile`
- repo-root `docker-compose.prod.yml`
- repo-root or deployment directory production env template
- updated docs explaining Docker as the primary deployment path on `HKZ`

### Do not change in this task

- do not migrate file-backed storage to a database
- do not replace credentials auth with OAuth / SSO
- do not split the application into multiple runtime services
- do not change public route structure

## Operational workflow

### Local development workflow

On the workstation:

1. implement and test changes locally
2. run fresh verification commands
3. commit and push to GitHub

### HKZ deployment workflow

On deployment:

1. SSH to `HKZ`
2. pull the target branch or deployment branch
3. ensure production env file exists
4. rebuild and restart with Docker Compose
5. confirm local health from the server
6. confirm public access through `wanflowai.com`

## Verification plan

Implementation will only be considered complete after these checks pass.

### Local verification

- `npm run build`
- `npm run test:unit`
- `npx playwright test --workers=1`
- Docker build succeeds locally

### Container verification

- container starts successfully
- `/api/health` returns success from inside the host
- contact route remains public
- `/dataflow/proofbench` redirects unauthenticated users to login
- login succeeds with configured credentials

### Remote verification on HKZ

- `docker compose ps` shows healthy running service
- `curl http://127.0.0.1:3010/api/health` succeeds on HKZ
- `curl -I https://wanflowai.com` succeeds publicly
- manual browser validation of homepage and login route succeeds

## Caddy integration design

Host-level Caddy will be updated to serve:

- `wanflowai.com`
- `www.wanflowai.com`

and reverse proxy them to:

- `127.0.0.1:3010`

This task should produce the exact Caddy snippet needed, but should not assume that unrelated domains on the host are removed automatically.

## Security expectations

- The app must bind to loopback on the host and only be exposed publicly through Caddy.
- Production secrets must live in a server env file, not in git.
- The default development auth secret must be replaced before deployment.
- Credentials auth remains acceptable for the current standard version, but the deployment docs must clearly call out that admin credentials should be rotated.

## Risks and mitigations

### Risk: missing Node runtime on HKZ

Mitigation: Docker becomes the runtime boundary, so HKZ only needs Docker and Caddy instead of a host Node installation.

### Risk: file-backed persistence lost during container recreation

Mitigation: always mount `WANFLOW_PLATFORM_DIR` from a host path outside the container filesystem.

### Risk: Docker image omits Python requirements

Mitigation: build the runtime image with Python 3 and install the project Python dependencies needed by the current processing chain.

### Risk: public domain points to server before app is healthy

Mitigation: validate `127.0.0.1:3010` locally on HKZ before switching or reloading Caddy config.

## Success criteria

This design is successful when:

- the project can be built into a Docker image from the repo
- HKZ can run the app with Docker Compose using a production env file
- `wanflowai.com` serves the live WanFlow site through host-level Caddy
- `DataFlow / ProofBench` remains protected by auth in production
- persistent project and lead data survive container restarts through mounted storage

## Self-review

- No placeholders remain.
- The scope is intentionally limited to packaging, deployment structure, and operational docs.
- The design stays aligned with the current codebase instead of inventing a new architecture.
- The chosen approach minimizes deployment risk on `HKZ` while preserving a clean upgrade path later.
