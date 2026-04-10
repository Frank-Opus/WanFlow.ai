# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS web-deps
WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS web-builder
WORKDIR /app
COPY --from=web-deps /app/web/node_modules ./web/node_modules
COPY web ./web
COPY DataFlow ./DataFlow
RUN cd web && npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3010 \
    VIRTUAL_ENV=/opt/venv \
    PATH=/opt/venv/bin:$PATH \
    WANFLOW_PYTHON_BIN=/opt/venv/bin/python \
    NEXT_TELEMETRY_DISABLED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-pip python3-venv ca-certificates libglib2.0-0 libgl1 libgomp1 \
  && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml ./
COPY src ./src
RUN python3 -m venv "$VIRTUAL_ENV" \
  && "$VIRTUAL_ENV/bin/pip" install --no-cache-dir --upgrade pip \
  && "$VIRTUAL_ENV/bin/pip" install --no-cache-dir .
COPY --from=web-builder /app/web ./web
COPY examples ./examples
COPY LOGO ./LOGO
COPY deploy/docker/start-wanflow-web.sh ./deploy/docker/start-wanflow-web.sh
EXPOSE 3010
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || '3010') + '/api/health').then((res) => { if (!res.ok) process.exit(1); }).catch(() => process.exit(1))"
WORKDIR /app/web
CMD ["/bin/bash", "/app/deploy/docker/start-wanflow-web.sh"]
