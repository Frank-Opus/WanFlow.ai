# WanFlow Docker + HKZ 部署手册

最后更新：2026-04-11

这套流程是 `wanflowai.com` 的当前推荐部署方式：

- 本地开发和验证仍在工作站完成
- 正式发布通过 SSH 登录 `HKZ`
- `HKZ` 宿主机保留 Caddy 负责 TLS 和反向代理
- WanFlow 应用本体通过 Docker Compose 运行在 `127.0.0.1:3010`
- 平台入口继续是 `/dataflow/proofbench`

## 1. 新增的部署文件

- `Dockerfile`
- `docker-compose.prod.yml`
- `deploy/docker/start-wanflow-web.sh`
- `deploy/docker/wanflow-web.env.example`

## 2. 运行形态

请求路径：

1. 浏览器访问 `https://wanflowai.com`
2. `HKZ` 上的 Caddy 终止 TLS
3. Caddy 反代到 `127.0.0.1:3010`
4. Docker 将宿主机 `127.0.0.1:3010` 映射到容器 `3010`
5. Next.js 提供官网、登录页、`/dataflow/proofbench` 和 API

## 3. 本地发布前验证

发布前先在本地工作站跑 fresh 验证：

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
npm run test:unit
npx playwright test --workers=1

cd /home/wanguancheng/AProj/WanFlow/Data-Centric
docker build -t wanflow-web:local .
```

如需本地容器验证，再补一轮：

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
cp deploy/docker/wanflow-web.env.example deploy/docker/wanflow-web.env
# 填入真实密钥后再执行

docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build
curl http://127.0.0.1:3010/api/health
curl -I http://127.0.0.1:3010/
curl -I http://127.0.0.1:3010/dataflow/proofbench

docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml down
```

## 4. HKZ 一次性准备

### 4.1 安装 Docker

如果 `HKZ` 还没有 Docker，先安装：

```bash
ssh HKZ
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
```

确认：

```bash
docker --version
docker compose version
```

### 4.2 准备站点目录

建议目录：

```bash
mkdir -p /srv/wanflow
cd /srv/wanflow
git clone https://github.com/Frank-Opus/WanFlow.ai.git app
cd app
```

如果后续想把运行数据放到仓库外，建议同时准备：

```bash
mkdir -p /srv/wanflow/platform-data
```

## 5. HKZ 生产环境文件

在 `HKZ` 上复制模板：

```bash
cd /srv/wanflow/app
cp deploy/docker/wanflow-web.env.example deploy/docker/wanflow-web.env
```

至少替换这些值：

- `WANFLOW_QWEN_API_KEY`
- `WANFLOW_SESSION_SECRET`
- `WANFLOW_ADMIN_PASSWORD`

推荐同时调整：

- `WANFLOW_PLATFORM_HOST_DIR=/srv/wanflow/platform-data`
- `WANFLOW_ADMIN_EMAIL`
- `WANFLOW_ADMIN_NAME`

说明：

- `WANFLOW_PLATFORM_HOST_DIR` 是宿主机目录
- `WANFLOW_PLATFORM_DIR` 是容器内目录
- `WANFLOW_MARKETING_LEADS_DIR` 默认放在平台数据目录下

## 6. HKZ 启动与更新

拉最新代码并启动：

```bash
ssh HKZ
cd /srv/wanflow/app
git fetch --all
git checkout main
git pull --ff-only

docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build
```

查看状态：

```bash
docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml ps
docker logs --tail=200 wanflow-web
```

## 7. Caddy 配置

把 `HKZ` 上 `/etc/caddy/Caddyfile` 调整为至少包含下面这段：

```caddy
wanflowai.com, www.wanflowai.com {
  encode zstd gzip
  reverse_proxy 127.0.0.1:3010
}
```

重载 Caddy：

```bash
caddy fmt --overwrite /etc/caddy/Caddyfile
systemctl reload caddy
```

## 8. 发布后验证

先在 `HKZ` 宿主机检查本地回环：

```bash
curl http://127.0.0.1:3010/api/health
curl -I http://127.0.0.1:3010/
curl -I http://127.0.0.1:3010/dataflow/proofbench
```

再检查公网：

```bash
curl -I https://wanflowai.com
curl -I https://www.wanflowai.com
```

预期：

- `/api/health` 返回 `200`
- 首页可访问
- `/dataflow/proofbench` 在未登录时跳转到登录页
- 登录后可进入 ProofBench 平台

## 9. 回滚

如果新版本异常：

```bash
cd /srv/wanflow/app
git log --oneline -n 5
git checkout <last-known-good-commit>
docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build
```

如果只是临时停止：

```bash
docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml down
```

数据不会因为容器重建而丢失，只要 `WANFLOW_PLATFORM_HOST_DIR` 指向的宿主机目录未被删除。

## 10. 现在仍保留的 fallback

`deploy/systemd/` 仍然保留，作为非 Docker 的备用部署方式；但对 `HKZ + wanflowai.com` 这条正式公网链路，当前应优先使用 Docker + Caddy。
