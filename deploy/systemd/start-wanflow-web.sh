#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
WEB_DIR="${APP_ROOT}/web"

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-3010}"
NODE_ENV="${NODE_ENV:-production}"
WANFLOW_PYTHON_BIN="${WANFLOW_PYTHON_BIN:-$(command -v python3)}"
WANFLOW_BASE_URL="${WANFLOW_BASE_URL:-http://35.220.164.252:3888/v1/}"
WANFLOW_DEFAULT_MODEL="${WANFLOW_DEFAULT_MODEL:-Qwen/Qwen3-235B-A22B-Thinking-2507}"
: "${WANFLOW_QWEN_API_KEY:?WANFLOW_QWEN_API_KEY is required}"

export NODE_ENV
export HOST
export PORT
export WANFLOW_PYTHON_BIN
export WANFLOW_BASE_URL
export WANFLOW_DEFAULT_MODEL
export WANFLOW_QWEN_API_KEY

cd "${WEB_DIR}"

npm run check:platform-config

if [[ ! -d .next ]]; then
  npm run build
fi

exec npm run start -- --hostname "${HOST}" --port "${PORT}"
