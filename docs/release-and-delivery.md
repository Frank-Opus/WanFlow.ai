# WanFlow 正式交付与发布说明

最后更新：2026-04-11

## 1. 交付定位

当前交付对象不是单题 demo，而是企业内部数据工作平台 / 对外定制平台项目底座。

本项目当前交付重点是 `BenchmarkOps` 主工作台，覆盖：

- `Project`
- `SourceFile`
- `ProblemItem`
- `BenchmarkRun`
- `Artifact`

## 2. 当前交付物边界

交付目录以项目根 `Data-Centric/` 为准，建议按下面几层理解：

- 核心引擎：`src/math_eval_framework/`
- Web 平台：`web/`
- 平台运行数据：`platform-data/`
- 部署脚本：`deploy/systemd/`、`deploy/docker/`
- 项目文档：`README.md`、`docs/project-status-and-roadmap.md`、`docs/deployment/docker-hkz.md`、`docs/deployment/systemd-linux.md`
- 样例与归档：`examples/`、`samples/`、`LOGO/`

不建议把 `platform-data/`、`deploy/`、`web/`、`src/` 从交付包中拆开。

## 3. 当前主机的运行基线

- 固定端口：`3010`
- 当前正式公网推荐运行方式：`docker compose + host Caddy`
- 当前健康接口：`http://127.0.0.1:3010/api/health`
- 当前正式域名：`https://wanflowai.com`
- 当前平台入口：`/dataflow/proofbench`

备用路径仍保留：

- systemd 服务名：`wanflow-web`
- `WorkingDirectory=/home/wanguancheng/AProj/WanFlow/Data-Centric/web`
- `ExecStart=/home/wanguancheng/AProj/WanFlow/Data-Centric/deploy/systemd/start-wanflow-web.sh`

## 4. 环境变量与模型约束

当前环境要求：

- `WANFLOW_QWEN_API_KEY`
- `WANFLOW_PYTHON_BIN`
- `WANFLOW_BASE_URL`
- `WANFLOW_DEFAULT_MODEL`
- `PORT`

当前默认产品展示模型：

- `Qwen/Qwen3-235B-A22B-Thinking-2507`

当前已验证可归一化到服务端模型：

- `qwen3-235b-a22b-thinking-2507`

模型端点：

- `http://35.220.164.252:3888/v1/`

### Standard auth environment variables

- `WANFLOW_SESSION_COOKIE`
- `WANFLOW_SESSION_SECRET`
- `WANFLOW_SESSION_TTL_SECONDS`
- `WANFLOW_ADMIN_EMAIL`
- `WANFLOW_ADMIN_PASSWORD`
- `WANFLOW_ADMIN_NAME`
- `WANFLOW_ADMIN_ROLE`
- `WANFLOW_CONTACT_NOTIFY_TO`
- `WANFLOW_CONTACT_EMAIL_MODE`
- `WANFLOW_CONTACT_SMTP_HOST`
- `WANFLOW_CONTACT_SMTP_PORT`
- `WANFLOW_CONTACT_SMTP_SECURE`
- `WANFLOW_CONTACT_SMTP_USER`
- `WANFLOW_CONTACT_SMTP_PASS`
- `WANFLOW_CONTACT_SMTP_FROM`
- `WANFLOW_AUTH_ENABLE_OAUTH`
- `WANFLOW_AUTH_SSO_HINT`

标准版当前使用 credentials auth，同时在 provider 配置中预留了 OAuth / enterprise SSO 扩展位。
联系表单如果要自动转发到邮箱，需要额外配置 SMTP；对于 `163.com` 邮箱，应填写 SMTP 授权码而不是网页登录密码。

## 5. 发布前必跑验证

按下面顺序执行，不要跳步：

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
npm run test:unit
npx playwright test --workers=1

cd /home/wanguancheng/AProj/WanFlow/Data-Centric
docker build -t wanflow-web:local .
```

如果要做服务器前的容器级联调，再补一轮：

```bash
cp deploy/docker/wanflow-web.env.example deploy/docker/wanflow-web.env
# 填好真实配置后
docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build
curl http://127.0.0.1:3010/api/health
curl -I http://127.0.0.1:3010/
curl -I http://127.0.0.1:3010/dataflow/proofbench
docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml down
```

必须确认：

- Web 构建退出码为 `0`
- 前端单测退出码为 `0`
- Playwright 退出码为 `0`
- Docker 镜像构建成功
- 容器健康检查通过
- 健康接口返回 `status: ok`
- `/dataflow/proofbench` 未登录时正确跳转登录页

## 6. 已覆盖的真实链路

当前 smoke 已覆盖：

- 项目列表
- 项目创建
- JSON / Markdown / PDF / DOCX 上传
- 归一化和题目抽取
- source artifact 下载
- manual item 创建
- sync run
- async run
- artifact 下载

## 7. 目录整理规则

为保证交付面貌和可维护性，当前目录规则如下：

- 根目录只保留工程入口、部署、文档、运行数据和品牌资产
- `samples/reference/` 存放参考样例
- `samples/generated/` 存放历史生成产物和中间文件
- `examples/qf3_item.json` 作为 smoke 标准示例入口

## 8. 备份与迁移建议

至少同时备份下面几部分：

- `platform-data/`
- `web/`
- `src/`
- `deploy/`
- `docs/`
- `examples/`
- `samples/`
- `LOGO/`

迁移到新主机时，建议顺序：

1. 拷贝整个 `Data-Centric/`
2. 安装 Python 依赖与 `web/` Node 依赖
3. 配置 `deploy/docker/wanflow-web.env`
4. 执行 `docker compose --env-file deploy/docker/wanflow-web.env -f docker-compose.prod.yml up -d --build`
5. 配置或更新宿主机 Caddy 指向 `127.0.0.1:3010`
6. 固定在 `3010` 端口验证，不新增测试端口

## 9. 当前版本管理边界

- 当前目录已初始化本地 git 仓库
- 当前已添加 `.gitignore`，默认忽略 `platform-data/`、`runs/`、`web/.next/`、`web/node_modules/` 等运行态或构建态内容
- 当前还没有绑定远端仓库，也还没有形成正式发布标签

## 10. 当前已知非阻塞项

- 历史样例快照中的旧机器绝对路径已清理，但历史计划文档仍保留阶段性语义，不应当成当前运行手册
- 平台权限、成员机制和批量任务治理仍可继续增强
