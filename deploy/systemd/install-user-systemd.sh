#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
SERVICE_NAME="${SERVICE_NAME:-wanflow-web}"
USER_SYSTEMD_DIR="${USER_SYSTEMD_DIR:-${HOME}/.config/systemd/user}"
USER_ENV_DIR="${USER_ENV_DIR:-${HOME}/.config/wanflow}"
USER_ENV_PATH="${USER_ENV_PATH:-${USER_ENV_DIR}/wanflow-web.env}"
USER_SERVICE_PATH="${USER_SYSTEMD_DIR}/${SERVICE_NAME}.service"
START_SCRIPT="${APP_ROOT}/deploy/systemd/start-wanflow-web.sh"
NODE_BIN_DIR="$(dirname "$(command -v node)")"
PYTHON_BIN_DEFAULT="${WANFLOW_PYTHON_BIN:-$(command -v python3)}"

mkdir -p "${USER_SYSTEMD_DIR}" "${USER_ENV_DIR}"

if [[ ! -f "${USER_ENV_PATH}" ]]; then
  cp "${APP_ROOT}/deploy/systemd/wanflow-web.env.example" "${USER_ENV_PATH}"
  python3 - "${USER_ENV_PATH}" "${PYTHON_BIN_DEFAULT}" <<'PY'
from pathlib import Path
import sys

env_path = Path(sys.argv[1])
python_bin = sys.argv[2]
text = env_path.read_text(encoding="utf-8")
text = text.replace("HOST=0.0.0.0", "HOST=127.0.0.1")
text = text.replace("WANFLOW_PYTHON_BIN=/home/wanguancheng/miniconda3/bin/python3", f"WANFLOW_PYTHON_BIN={python_bin}")
env_path.write_text(text, encoding="utf-8")
PY
  chmod 600 "${USER_ENV_PATH}"
  echo "Created ${USER_ENV_PATH}. Update WANFLOW_QWEN_API_KEY before starting the service."
fi

cat > "${USER_SERVICE_PATH}" <<EOF
[Unit]
Description=WanFlow enterprise evaluation web platform (user)
After=network.target

[Service]
Type=simple
WorkingDirectory=${APP_ROOT}/web
Environment=HOME=${HOME}
Environment=PATH=${NODE_BIN_DIR}:$(dirname "${PYTHON_BIN_DEFAULT}"):/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin
EnvironmentFile=${USER_ENV_PATH}
ExecStart=/usr/bin/env bash ${START_SCRIPT}
Restart=always
RestartSec=5
TimeoutStartSec=180
TimeoutStopSec=30

[Install]
WantedBy=default.target
EOF

chmod 644 "${USER_SERVICE_PATH}"
chmod +x "${START_SCRIPT}"

systemctl --user daemon-reload
echo "Installed ${USER_SERVICE_PATH}"
echo "Next steps:"
echo "  1. Edit ${USER_ENV_PATH}"
echo "  2. systemctl --user enable --now ${SERVICE_NAME}"
echo "  3. systemctl --user status ${SERVICE_NAME}"
