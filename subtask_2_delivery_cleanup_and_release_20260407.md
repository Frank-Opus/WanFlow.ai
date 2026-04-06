# 目录清理与正式交付推进执行单
status: completed

## User Confirmation Record
- 确认方式：用户在我给出两个后续方向后，明确回复“都做”。
- 关键约束：
  - 项目定位是企业内部数据工作平台 / 对外定制平台项目，不是单题 demo。
  - 当前固定运行端口继续使用 `3010`。
  - 新目录已经迁移到 `/home/wanguancheng/AProj/WanFlow/Data-Centric`，后续都以此为主路径。
  - 要求同时完成目录整理和平台进一步走向“可正式交付”。

## task_plan Positioning
No task_plan, skip

## Goal + Success Criteria
- Goal：
  - 把当前项目根目录整理成更适合企业项目交付的结构，降低样例/历史产物/缓存对主项目入口的干扰。
  - 在此基础上补齐正式交付所需的文档和验证，至少覆盖 Python 测试、Web 构建、平台 smoke、运行服务与发布说明。
- Success criteria：
  - 根目录只保留核心入口和关键资产，样例/历史导出/中间产物被归档到明确目录。
  - 存在一份面向交付的发布文档，能说明启动、验证、交付物与迁移路径。
  - Python 测试、Web build、平台 smoke、健康接口都实际跑过并记录结果。
  - `wanflow-web` 继续从新目录在 `3010` 正常运行。

## Acceptance Criteria
| Metric | Measurement method | Expected value/range | Tolerance |
|---|---|---|---|
| 根目录收口 | 检查项目根目录文件列表 | 根目录不再堆放历史导出、LaTeX 编译中间产物、临时 smoke 结果 | 允许保留必要品牌与入口文件 |
| 归档目录存在 | 检查归档目录结构 | 至少存在 `samples/reference/` 与 `samples/generated/` 或同等级清晰分类 | 0 |
| 发布文档存在 | 检查文档文件 | 存在正式发布/交付文档并可直接阅读执行 | 0 |
| Python 验证 | 运行 `python3 -m pytest tests -q` | 退出码 0 | 0 |
| Web 验证 | 运行 `cd web && npm run build` | 退出码 0 | 0 |
| 平台 smoke | 运行 `cd web && npm run smoke:platform` | 退出码 0 | 0 |
| 运行服务 | 访问 `http://127.0.0.1:3010/api/health` | 返回 `status:"ok"` 且 `platformDir` 指向新目录 | 0 |

## Core Assumptions
| Assumption | Verification experiment | Result |
|---|---|---|
| 当前主项目目录 `/home/wanguancheng/AProj/WanFlow/Data-Centric` 可读写，且 `wanflow-web` 已切到该路径。 | `systemctl --user cat wanflow-web | rg -n "/home/wanguancheng/AProj/WanFlow/Data-Centric"` | 命中 `WorkingDirectory` 和 `ExecStart` 两处，说明 service 已切到新目录。 |
| Python 测试环境当前可用。 | `cd /home/wanguancheng/AProj/WanFlow/Data-Centric && python3 -m pytest tests -q` | 测试通过，结果 `12 passed in 2.65s`。 |
| Web 构建和 smoke 脚本在新目录可执行。 | `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run build >/tmp/subtask2-build.log 2>&1 && tail -n 5 /tmp/subtask2-build.log` | 命令退出码 0，尾部输出 `Static`/`Dynamic` 路由汇总，说明构建通过。 |
| 固定端口 `3010` 上的平台服务仍然可访问。 | `curl -sS http://127.0.0.1:3010/api/health` | 返回 `status: ok`，且 `platformDir` 指向 `/home/wanguancheng/AProj/WanFlow/Data-Centric/platform-data`。 |

## Design Decisions
- 用“归档整理”而不是“删除历史”，避免误删参考材料。
- 目录整理只动根目录层的明显历史产物、样例和编译中间物，不碰运行所需 `platform-data/`、`web/`、`src/`。
- “可正式交付”先落实到可验证工程项：测试、构建、smoke、运行、发布文档。
- 文档继续中文优先，兼容工程交付场景。

## Plan
- Phase 1: 项目目录清理与归档
  - [x] Step 1.1: 创建样例/生成产物归档目录并移动根目录杂项文件，目标目录 `samples/`
  - [x] Step 1.2: 清理空目录和明显缓存目录，保持根目录入口收口
  - [x] Step 1.3: 更新 README 与项目状态文档中的样例路径说明
- Phase 2: 正式交付文档补齐
  - [x] Step 2.1: 新增交付/发布文档，说明运行入口、验证步骤、交付边界、迁移与备份策略
  - [x] Step 2.2: 将新文档挂到 README 与项目状态文档入口
- Phase 3: 正式验证与收口
  - [x] Step 3.1: 跑 Python 测试
  - [x] Step 3.2: 跑 Web build
  - [x] Step 3.3: 跑平台 smoke
  - [x] Step 3.4: 复检 `wanflow-web` 服务与 `3010` 健康状态

## Reference Files
- `README.md`
- `docs/project-status-and-roadmap.md`
- `docs/deployment/systemd-linux.md`
- `web/package.json`
- `web/scripts/platform-smoke-test.mjs`
- `deploy/systemd/start-wanflow-web.sh`
- `subtask_1_full_site_audit_remediation_20260406.md`

## Verification Plan
- 目录结构验证：检查根目录仅保留核心入口，并确认 `samples/reference/`、`samples/generated/` 存在。
- 文档验证：检查 `README.md`、`docs/project-status-and-roadmap.md`、`docs/release-and-delivery.md` 已挂接当前目录约定与发布入口。
- 工程验证：运行 `python3 -m pytest tests -q`、`cd web && npm run build`、`cd web && npm run smoke:platform`。
- 运行验证：重启 `wanflow-web`，检查 `systemctl --user status wanflow-web --no-pager`、`curl http://127.0.0.1:3010/api/health`、`curl -I http://127.0.0.1:3010/`、`curl -I http://127.0.0.1:3010/proofbench`。

## Test Results
- 目录整理：通过。根目录已收口到 `README.md`、`docs/`、`deploy/`、`src/`、`web/`、`platform-data/`、`samples/` 等主入口；`src-web/` 空目录与 `.pytest_cache/` 已清理。
- 路径规范：通过。`examples/qf3_item.json` 与 `samples/generated/qf3_smoke_test.json` 已切到 `samples/reference/` 相对路径；`web/src/lib/proofbench.ts` 的示例导出路径已切到 `samples/generated/`。
- Python：`python3 -m pytest tests -q` => `12 passed in 2.52s`。
- Web：`cd web && npm run build` => 退出码 0，Next.js 15.2.4 production build 完成。
- 平台 smoke：`cd web && npm run smoke:platform` => 退出码 0，验证了项目列表、项目创建、JSON/Markdown/PDF/DOCX 上传、source 下载、manual item、sync run、async run、artifact 下载。
- 运行服务：`systemctl --user status wanflow-web --no-pager` => `active (running)`；`curl http://127.0.0.1:3010/api/health` => `status: ok`，`platformDir=/home/wanguancheng/AProj/WanFlow/Data-Centric/platform-data`。
- 页面状态：`curl -I http://127.0.0.1:3010/` 与 `curl -I http://127.0.0.1:3010/proofbench` 均返回 `HTTP/1.1 200 OK`。

## Confidence Assessment
- 目录收口：0.99
- 交付文档可用性：0.95
- 当前 Linux 主机可运行性：0.98
- 全链路 smoke 覆盖度：0.97
- 残余风险：历史 `platform-data/` / `runs/` 快照仍保留旧机器绝对路径字符串；`requests` 运行时会打印 `RequestsDependencyWarning`，当前不影响测试、构建和 smoke 通过。

## Gate 3 Self-Check
- [x] 所有 success criteria 已逐项验证
- [x] 没有把“应该可用”当成“已验证通过”
- [x] 已以当前目录 `/home/wanguancheng/AProj/WanFlow/Data-Centric` 为主路径完成整理
- [x] 已保持固定运行端口 `3010`
- [x] 已补正式交付文档并挂接入口
- Gate result: PASS

## Progress Log
- 2026-04-07: 创建新执行单，目标是目录收口与正式交付推进。
- 2026-04-07: 创建 `samples/reference/` 与 `samples/generated/`，归档根目录样例、LaTeX 中间文件和历史 smoke 产物。
- 2026-04-07: 清理空 `src-web/` 与 `.pytest_cache/`，更新 `examples/qf3_item.json`、`samples/generated/qf3_smoke_test.json`、`web/src/lib/proofbench.ts`、`web/package.json`。
- 2026-04-07: 新增 `samples/README.md` 与 `docs/release-and-delivery.md`，并同步更新 `README.md`、`docs/project-status-and-roadmap.md`、`docs/deployment/systemd-linux.md`。
- 2026-04-07: 完成 `pytest`、`web build`、`wanflow-web` 重启、健康检查、首页/工作台状态检查、平台 smoke，全项通过。

## Findings / Conclusions
- 当前项目已从“目录凌乱但能跑”推进到“目录收口、文档补齐、运行已验证”的可交付状态。
- 当前正式运行入口保持在 `3010`，并且 `wanflow-web` 已稳定指向 `/home/wanguancheng/AProj/WanFlow/Data-Centric`。
