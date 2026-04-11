# WanFlow 迁移交接包说明

最后更新：2026-04-11

## 1. 当前代码状态

- 当前工作目录：`/home/wanguancheng/AProj/WanFlow/Data-Centric/.worktrees/platform-auth-contact-refresh`
- 当前分支：`feat/platform-auth-contact-refresh`
- 当前最新本地/远端提交：`b418845` (`fix: isolate e2e and lighthouse servers`)
- 当前远端仓库：`https://github.com/Frank-Opus/WanFlow.ai.git`

说明：

- `b418845` 修复的是本地验证链路中的测试隔离问题，不影响当前线上业务功能。
- HKZ 线上服务器当前仍运行 `fa38f31`，站点已验证可用。

## 2. 当前线上实际状态

正式公网：

- 域名：`https://wanflowai.com`
- 域名：`https://www.wanflowai.com`
- 官网首页：`/`
- 内部平台正式入口：`/dataflow/proofbench`
- 已移除旧路径：`/proofbench`

HKZ 当前部署事实：

- 服务器仓库路径：`/srv/wanflow/app`
- 服务器数据目录：`/srv/wanflow/platform-data`
- 生产 env：`/srv/wanflow/app/deploy/docker/wanflow-web.env`
- compose 覆盖：`/srv/wanflow/app/docker-compose.remote-image.yml`
- Caddy 文件：`/etc/caddy/Caddyfile`
- 线上容器：`wanflow-web`
- 线上镜像：`wanflow-web:local`
- 线上容器端口映射：`127.0.0.1:3010 -> 3010`
- HKZ 当前运行提交：`fa38f31`

说明：

- HKZ 因拉取 Docker Hub 基础镜像不稳定，正式部署采用“本机构建镜像 + `docker save | ssh HKZ docker load`”模式。
- HKZ 上不是远端 `docker build` 成功部署，而是加载本地已验证镜像后再用 compose 启动。

## 3. 当前功能边界

官网（marketing website）已包含：

- 首页
- 解决方案
- 案例
- 关于我们
- 联系我们
- 中文 / 英文双语，默认中文

内部平台当前正式命名与路径：

- 中文理解：WanFlow 内部平台 / BenchmarkOps
- 页面品牌名：`WanFlow BenchmarkOps`
- 正式访问路径：`/dataflow/proofbench`

鉴权基线：

- 已完成标准版 credentials auth
- 已预留企业版 SSO / OAuth 扩展结构
- 未登录访问 `/dataflow/proofbench` 会跳转登录页

## 4. 当前验证状态

本地 fresh 验证已通过：

```bash
cd web
npm run build
npm run test:unit
npx playwright test --workers=1
npm run audit:lighthouse
```

最新结果：

- `build`：通过
- `test:unit`：7/7 通过
- `playwright`：31 passed / 23 skipped / 0 failed
- `lighthouse`：通过
  - `home`: 95 / 100 / 96 / 100
  - `solutions`: 92 / 100 / 96 / 100
  - `contact`: 100 / 100 / 96 / 100
  - `proofbench-login`: 100 / 100 / 96 / 100

HKZ / 公网已验证：

- `curl http://127.0.0.1:3010/api/health`：`status: ok`
- `curl -I http://127.0.0.1:3010/`：`200`
- `curl -I http://127.0.0.1:3010/dataflow/proofbench`：`307` 到登录页
- `curl -I https://wanflowai.com`：`HTTP/2 200`
- `curl -I https://www.wanflowai.com`：`HTTP/2 200`

## 5. 这次迁移包里应该重点看什么

优先阅读：

1. `README.md`
2. `docs/release-and-delivery.md`
3. `docs/deployment/docker-hkz.md`
4. `docs/deployment/systemd-linux.md`
5. `docs/migration/2026-04-11-conversation-record.md`

## 6. 迁移到新机器的推荐步骤

### 方案 A：直接用本迁移压缩包恢复源码快照

1. 把 `repo-snapshot.tar.gz` 拷到新机器
2. 解压到目标目录
3. 进入 `web/` 执行 `npm install`
4. 在项目根执行 Python 依赖安装
5. 按 `docs/deployment/docker-hkz.md` 或 `docs/deployment/systemd-linux.md` 配置环境并启动

### 方案 B：用 git 历史恢复

1. 把 `git-history.bundle` 拷到新机器
2. 执行：

```bash
git clone git-history.bundle WanFlow
cd WanFlow
git checkout feat/platform-auth-contact-refresh
```

3. 然后按文档补依赖与环境变量

说明：

- 如果新机器要完整继承平台历史数据，请一并保留 `platform-data/`
- 如果新机器只需要代码和文档，可不使用旧的运行态构建目录

## 7. 推荐迁移后第一轮验证

```bash
cd web
npm install
npm run build
npm run test:unit
npx playwright test --workers=1
npm run audit:lighthouse
```

如果要启动正式服务：

```bash
cd /path/to/project
cp deploy/docker/wanflow-web.env.example deploy/docker/wanflow-web.env
# 填真实密钥

docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build
curl http://127.0.0.1:3010/api/health
```

## 8. 当前已知注意事项

- 本工作树的 `.git` 是 worktree 指针，不适合直接当作“完整裸仓库”迁移；因此本迁移包额外包含 `git-history.bundle`
- 不建议迁移 `web/node_modules/`、`web/.next/`、`web/playwright-report/`、`web/test-results/` 等构建或验证产物
- HKZ 线上真实 env 不应直接打进压缩包，密钥仍建议在目标机器单独配置
- 若目标机器也是正式公网机，建议继续固定使用 `3010` 端口

