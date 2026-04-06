# WanFlow 正式交付与发布说明

最后更新：2026-04-07

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
- 部署脚本：`deploy/systemd/`
- 项目文档：`README.md`、`docs/project-status-and-roadmap.md`、`docs/deployment/systemd-linux.md`
- 样例与归档：`examples/`、`samples/`、`LOGO/`

不建议把 `platform-data/`、`deploy/`、`web/`、`src/` 从交付包中拆开。

## 3. 当前主机的运行基线

- 固定端口：`3010`
- systemd 用户服务：`wanflow-web`
- 当前健康接口：`http://127.0.0.1:3010/api/health`
- 当前运行目录：`/home/wanguancheng/AProj/WanFlow/Data-Centric`

当前系统服务已切到：

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

## 5. 发布前必跑验证

按下面顺序执行，不要跳步：

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
python3 -m pytest tests -q

cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
npm run smoke:platform

curl http://127.0.0.1:3010/api/health
curl http://127.0.0.1:3010/api/platform/projects
systemctl --user status wanflow-web --no-pager
```

必须确认：

- Python 测试退出码为 `0`
- Web 构建退出码为 `0`
- smoke 脚本退出码为 `0`
- 健康接口返回 `status: ok`
- `platformDir` 指向当前交付目录下的 `platform-data/`

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
3. 配置环境变量文件
4. 跑 `npm run build`
5. 安装或更新 `wanflow-web` systemd 服务
6. 固定在 `3010` 端口验证，不新增测试端口

## 9. 当前版本管理边界

- 当前目录已初始化本地 git 仓库
- 当前已添加 `.gitignore`，默认忽略 `platform-data/`、`runs/`、`web/.next/`、`web/node_modules/` 等运行态或构建态内容
- 当前还没有绑定远端仓库，也还没有形成正式发布标签

## 10. 当前已知非阻塞项

- 历史样例快照中的旧机器绝对路径已清理，但历史计划文档仍保留阶段性语义，不应当成当前运行手册
- 平台权限、成员机制和批量任务治理仍可继续增强
