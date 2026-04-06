# 历史路径净化与版本边界初始化执行单
status: completed

## Goal
- 清理历史样例快照中的旧机器绝对路径，避免后续交付继续暴露无效来源路径。
- 为当前项目补最小可用的 git 版本管理边界，但不擅自创建提交或远端。

## Scope
- `platform-data/uploads/**/*qf3_item.json`
- `runs/**/artifact.json`
- `samples/generated/QF3-yang-mills-monopole.fls`
- `docs/superpowers/plans/2026-04-04-wanflow-proofbench.md`
- `.gitignore`
- `.git/`

## Changes
- 将历史 JSON / 运行快照里的旧绝对路径统一替换为：
  - `samples/reference/QF3.pdf`
  - `samples/reference/QF3-yang-mills-monopole.tex`
  - `samples/reference/数学竞赛题(1).docx`
- 将历史 handoff 计划中的旧项目根路径替换为当前目录 `/home/wanguancheng/AProj/WanFlow/Data-Centric`
- 新增 `.gitignore`，忽略 Python 缓存、Next.js 构建目录、环境文件、`platform-data/`、`runs/` 等运行态内容
- 初始化本地 git 仓库，但未创建提交、未绑定远端

## Verification
- `rg -n "/Users/suhui/Documents/百度同步/Project_Interest/Data-Centric" examples samples platform-data runs docs/superpowers` => 无结果
- `git rev-parse --is-inside-work-tree` => `true`
- `git status --short` => 仓库已初始化，项目文件可被版本管理识别
- `curl -sS http://127.0.0.1:3010/api/health` => `status: ok`
- `curl -sS http://127.0.0.1:3010/api/platform/projects` => 返回合法 JSON

## Notes
- `.gitignore` 只建立边界，不代表这些目录无价值；`platform-data/` 和 `runs/` 仍应按交付/备份策略单独保存
- 当前未做 `git add` / `git commit`，避免在没有你确认前擅自固化版本
