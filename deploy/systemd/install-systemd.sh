#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
SERVICE_NAME="${SERVICE_NAME:-wanflow-web}"
SYSTEMD_DIR="${SYSTEMD_DIR:-/etc/systemd/system}"
ENV_DIR="${ENV_DIR:-/etc/wanflow}"
ENV_PATH="${ENV_PATH:-${ENV_DIR}/wanflow-web.env}"
SERVICE_PATH="${SYSTEMD_DIR}/${SERVICE_NAME}.service"
START_SCRIPT="${APP_ROOT}/deploy/systemd/start-wanflow-web.sh"
SERVICE_USER="${SERVICE_USER:-${SUDO_USER:-$(id -un)}}"
SERVICE_GROUP="${SERVICE_GROUP:-$(id -gn "${SERVICE_USER}")}"

mkdir -p "${ENV_DIR}"

if [[ ! -f "${ENV_PATH}" ]]; then
  cp "${APP_ROOT}/deploy/systemd/wanflow-web.env.example" "${ENV_PATH}"
  echo "Created ${ENV_PATH}. Update WANFLOW_QWEN_API_KEY before starting the service."
fi

cat > "${SERVICE_PATH}" <<EOF
[Unit]
Description=WanFlow enterprise evaluation web platform
After=network.target

[Service]
Type=simple
User=${SERVICE_USER}
Group=${SERVICE_GROUP}
WorkingDirectory=${APP_ROOT}/web
EnvironmentFile=${ENV_PATH}
ExecStart=/usr/bin/env bash ${START_SCRIPT}
Restart=always
RestartSec=5
TimeoutStartSec=180
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
EOF

chmod 644 "${SERVICE_PATH}"
chmod +x "${START_SCRIPT}"

systemctl daemon-reload
echo "Installed ${SERVICE_PATH}"
echo "Next steps:"
echo "  1. Edit ${ENV_PATH}"
echo "  2. sudo systemctl enable --now ${SERVICE_NAME}"
echo "  3. sudo systemctl status ${SERVICE_NAME}"
