# WanFlow 数据平台项目

## 这是什么

这是一个企业内部数据工作平台项目，也是一个可对外定制交付的数据平台项目底座。

当前已经落地的核心模块是 `BenchmarkOps`，负责把下面这条链路整合到一个统一工作台中：

- 多格式文件导入
- 数据标准化
- `ProblemItem` 治理
- sync / async 模型评测
- 结果回看
- `Artifact` 下载与交付

这个项目不再按“单题 demo”理解。

## 核心对象

- `Project`
- `SourceFile`
- `ProblemItem`
- `BenchmarkRun`
- `Artifact`

## 当前技术结构

- Python 评测引擎：`src/math_eval_framework/`
- 平台数据存储：`platform-data/`
- Web 平台：`web/`
- Linux systemd 部署：`deploy/systemd/`
- 样例与归档：`samples/`

## 先看哪些文档

1. 项目全景与规划：`docs/project-status-and-roadmap.md`
2. Linux 部署：`docs/deployment/systemd-linux.md`
3. 正式交付与发布：`docs/release-and-delivery.md`
4. 最近一轮前端审计与验证：`subtask_1_full_site_audit_remediation_20260406.md`

## 当前运行状态

固定验证端口：

- `http://127.0.0.1:3010`

健康检查：

```bash
curl http://127.0.0.1:3010/api/health
```

最近已验证通过：

- `cd web && npm run build`
- 首页 `/`
- 工作台 `/proofbench`
- 项目列表接口 `/api/platform/projects`
- 健康接口 `/api/health`

## Web 常用命令

```bash
cd web
npm run build
npm run check:platform-config
npm run smoke:platform
```

## Python 常用命令

```bash
cd /path/to/Data-Centric
python3 -m pytest tests -q
```

## 样例与归档目录

- 参考样例：`samples/reference/`
- 生成产物：`samples/generated/`
- smoke 示例题：`examples/qf3_item.json`

根目录只保留主工程入口、部署、文档和运行数据目录；历史导出与样例不再散落在项目根层。

## 当前默认模型

前端默认展示：

- `Qwen/Qwen3-235B-A22B-Thinking-2507`

实际运行时会归一化到服务端真实支持的模型 ID。

## 当前建议

如果你要继续推进这个项目，不要从页面 demo 思路出发，而要从“企业平台项目”思路出发：

- 先看 `docs/project-status-and-roadmap.md`
- 再按 `Project / SourceFile / ProblemItem / BenchmarkRun / Artifact` 继续补能力
- 保留 Python 引擎，不要把执行链迁走
