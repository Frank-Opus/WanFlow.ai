# WanFlow 数据平台项目状态与规划

最后更新：2026-04-07

## 1. 项目定位

这个项目不是单题评测 demo，也不是一次性的数学题验证页面。

当前项目应被定义为：

- 面向企业内部数据团队的通用数据工作平台
- 或者面向外部客户交付的定制化数据平台项目底座
- 当前重点场景是“多源数据导入 -> 标准化 -> 题目/任务治理 -> 模型评测 -> 结果产物交付”

从产品视角看，`WanFlow.ai` 是品牌与站点壳层，`BenchmarkOps` 是当前已经落地的主工作模块。

## 2. 当前结论

截至当前时间，这个项目已经从“单题验证工具”推进到了“企业数据平台雏形”，核心方向已经锁定，主要运行链路已经打通，前端也已经完成了一轮企业化收口。

当前最重要的判断有三条：

1. 平台方向已经明确，不应该再退回 `ProofBench` 单题式方案。
2. Python 评测引擎必须保留，Web 平台负责编排、治理、展示和交付。
3. 现在最需要做的是继续把平台能力补齐、验证做深、交付文档做规范，而不是重写架构。

## 3. 目标用户与业务场景

### 3.1 目标用户

- 企业内部数据运营团队
- Benchmark / Evaluation 工程团队
- 交付经理、项目经理、售前或实施团队
- 面向外部客户做定制数据平台时的项目团队

### 3.2 典型业务场景

- 导入客户或内部提供的 PDF / DOCX / JSON / Markdown / TeX / TXT / 文件夹资料
- 将异构输入归一化为平台可以处理的统一格式
- 从标准化结果中形成 `ProblemItem`
- 以固定模型或客户指定模型执行同步 / 异步评测
- 沉淀 `BenchmarkRun` 与可下载 `Artifact`
- 输出 JSON / XLSX / LaTeX / 诊断文件，形成企业交付物

## 4. 已锁定的产品与架构约束

这些约束已经在 handoff 和当前实现中被锁定，不建议再改方向。

### 4.1 固定核心对象

平台核心对象固定为：

- `Project`
- `SourceFile`
- `ProblemItem`
- `BenchmarkRun`
- `Artifact`

### 4.2 架构方向

- 前台 / 中台：Next.js + TypeScript + App Router + Route Handlers
- 核心执行引擎：Python
- 当前存储形态：文件型平台存储，根目录为 `platform-data/`
- 运行方式：同时支持 sync 和 async

### 4.3 产品展示约束

- 默认语言：中文
- 支持中英双语
- 默认展示模型：`Qwen/Qwen3-235B-A22B-Thinking-2507`
- 实际调用时：需要归一化到服务端真实支持的模型 ID

当前已验证的模型服务信息：

- 模型服务地址：`http://35.220.164.252:3888/v1/`
- 当前健康接口返回的归一化模型 ID：`qwen3-235b-a22b-thinking-2507`

## 5. 当前项目目录应如何理解

当前项目根目录：`Data-Centric/`

建议把各目录理解为下面这几个层：

### 5.1 引擎层

- `src/math_eval_framework/`

职责：

- Python 评测 CLI
- 模型请求
- 重复评测
- 结果导出
- 标准化 / 评分 / 产物生成

### 5.2 平台数据层

- `platform-data/`

职责：

- 当前平台的项目、文件、题目、运行、产物数据存储
- 这是现在的近线平台存储底座

### 5.3 Web 平台层

- `web/`

职责：

- 企业工作台
- 平台 API Route Handlers
- 上传 / 管理 / 运行 / 预览 / 下载

### 5.4 样例与资产层

- `examples/`
- `samples/reference/`
- `samples/generated/`
- `LOGO/`

职责：

- 样例数据入口
- 已归档的参考文件
- 已归档的历史生成产物
- 品牌资产

### 5.5 部署层

- `deploy/systemd/`
- `docs/deployment/systemd-linux.md`

职责：

- 固定 `3010` 端口的 systemd 部署
- 本机 Linux 用户服务安装与发布

## 6. 当前已完成到什么程度

### 6.1 平台基础能力

已完成或基本完成的部分：

- Python 评测引擎已存在并可执行重复评测
- JSON / XLSX 导出链路已存在
- 平台对象模型已建立
- 文件型平台存储已建立
- 平台 API 已建立
- async worker 已建立
- 模型名展示与归一化逻辑已建立

关键文件：

- `src/math_eval_framework/cli.py`
- `src/math_eval_framework/exporter.py`
- `web/src/lib/platform-types.ts`
- `web/src/lib/platform-store.ts`
- `web/src/app/api/platform/projects/route.ts`
- `web/src/app/api/platform/projects/[projectId]/sources/route.ts`
- `web/src/app/api/platform/projects/[projectId]/items/route.ts`
- `web/src/app/api/platform/projects/[projectId]/runs/route.ts`
- `web/src/app/api/platform/artifacts/download/route.ts`
- `web/scripts/platform-runner.mjs`

### 6.2 前端工作台

最近一轮已经做完的工作：

- 首页已从单题 landing page 收口为企业平台首页
- 工作台已围绕 `Project / SourceFile / ProblemItem / BenchmarkRun / Artifact` 重新组织
- 导航、工作台切换器、上传交互补了关键无障碍语义
- 样式系统做了一轮共享 token/class 收口
- 旧 `demo` 命名与部分旧文案已清理

关键文件：

- `web/src/app/page.tsx`
- `web/src/app/proofbench/page.tsx`
- `web/src/components/platform/platform-console.tsx`
- `web/src/components/shared/site-header.tsx`
- `web/src/components/shared/site-footer.tsx`
- `web/src/app/globals.css`
- `web/src/lib/i18n.ts`
- `web/src/lib/proofbench.ts`

### 6.3 部署与运行

当前 Linux 主机上已有固定端口运行方案：

- 端口固定为：`3010`
- 当前服务名：`wanflow-web`
- 当前健康接口：`http://127.0.0.1:3010/api/health`

已验证健康接口返回：

- `status = ok`
- API key 已配置
- Python 解释器已解析
- 平台存储目录可用
- 模型端点可用
- 展示模型可归一化到真实 provider model ID

## 7. 当前真实验证状态

以下不是“理论支持”，而是已经跑过的事实。

### 7.1 已验证通过

- `cd web && npm run build`
- `curl http://127.0.0.1:3010/api/health`
- `curl http://127.0.0.1:3010/api/platform/projects`
- 首页 `http://127.0.0.1:3010/`
- 工作台 `http://127.0.0.1:3010/proofbench`

最近一次明确结果：

- `web` 生产构建通过
- 首页返回 `HTTP/1.1 200 OK`
- 工作台返回 `HTTP/1.1 200 OK`
- 项目列表接口返回合法 JSON
- 健康接口返回 `status: ok`

### 7.2 已有 smoke 流程，但建议继续跑

当前 `web/package.json` 已包含：

- `npm run check:platform-config`
- `npm run smoke:platform`

现有 smoke 目标覆盖：

- 项目列表
- 项目创建
- JSON / Markdown / PDF / DOCX 上传
- 文件归一化与题目抽取
- source download
- manual item creation
- sync run
- async run
- artifact download

## 8. 当前还存在什么问题

项目已经能作为“企业数据平台项目底座”继续推进，但还不算最终交付版本。

### 8.1 文档层问题

- 已补齐根 `README.md`、项目全景文档与正式交付文档，但仍需要随着功能迭代持续维护
- 历史 handoff / superpowers 资料仍保留旧路径记录，应该视为归档上下文，不作为当前运行文档

### 8.2 工程层问题

- 前端还有历史样式残留，虽然已经收口一轮，但还不是完全统一的 design system
- 本地 git 仓库已初始化，但尚未绑定远端，也还没有正式提交基线

### 8.3 平台能力问题

虽然基础链路已经有了，但要真正作为企业内部或对外定制平台交付，还需要继续补：

- 更完整的 source ingestion 管线
- 更规范的项目权限和成员机制
- 更清晰的 artifact 分类与交付模板
- 更稳定的批量任务编排与失败重试
- 更系统的 deployment / backup / migration 方案

## 9. 当前建议的项目理解方式

如果现在要对外或对内介绍这个项目，建议统一用下面的表述：

> WanFlow 是一个企业级数据工作平台项目底座。
> 当前已落地的核心模块是 `BenchmarkOps`，负责把异构数据输入、标准化、任务治理、模型评测与结果交付整合到一个统一工作台中。
> 它既可以作为企业内部数据团队的平台，也可以作为给其他公司定制交付的平台项目基础。

这段表述比“数学题评测网站”更接近当前真实状态。

## 10. 推荐的后续规划

下面是建议的下一阶段路线，不建议再回到大拆大改。

### Phase A：文档与项目整理

目标：

- 建立单一事实源文档
- 明确项目定位、目录结构、启动方式、部署方式
- 把 transfer 包里的项目整理为独立项目目录

本轮已开始完成。
当前已完成 README、样例归档和正式交付文档补齐。

### Phase B：平台能力补齐

目标：

- 完整验证上传 -> 归一化 -> 题目形成 -> sync run -> async run -> artifact download
- 补齐 source ingestion 在 PDF / DOCX / folder 场景下的异常与边缘情况
- 补齐 artifact 展示和下载命名规范

重点文件：

- `web/src/app/api/platform/projects/[projectId]/sources/route.ts`
- `web/src/app/api/platform/projects/[projectId]/items/route.ts`
- `web/src/app/api/platform/projects/[projectId]/runs/route.ts`
- `web/scripts/platform-runner.mjs`
- `src/math_eval_framework/cli.py`
- `src/math_eval_framework/exporter.py`

### Phase C：平台产品化

目标：

- 强化 `Project` 视角，而不是“题目视角”
- 增加项目说明、状态、成员、权限、交付语义
- 增加更稳定的任务编排和结果回看能力

### Phase D：发布与运维

目标：

- 固化 systemd 部署流程
- 固化环境文件模板
- 固化备份、迁移、回滚策略
- 对 `platform-data/` 做明确备份策略

当前基础文档：

- `docs/deployment/systemd-linux.md`
- `docs/release-and-delivery.md`

## 11. 当前建议的项目入口文档

后续建议用下面几个文件作为项目入口：

1. `README.md`
2. `docs/project-status-and-roadmap.md`
3. `docs/release-and-delivery.md`
4. `docs/deployment/systemd-linux.md`
5. `subtask_1_full_site_audit_remediation_20260406.md`

其中：

- `README.md` 负责快速理解
- `docs/project-status-and-roadmap.md` 负责项目全景
- `docs/release-and-delivery.md` 负责交付边界、验证与迁移说明
- `docs/deployment/systemd-linux.md` 负责部署运行
- `subtask_1_full_site_audit_remediation_20260406.md` 负责记录最近一轮前端审计与验证事实

## 12. 当前状态一句话总结

这个项目已经不是“题目 demo”，而是一个已经具备平台雏形、可继续工程化推进的企业数据工作平台项目。

下一步不应该重写，而应该继续沿着当前架构，把平台能力、文档、部署和交付标准补齐。
