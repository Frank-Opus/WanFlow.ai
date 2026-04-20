# WanFlow GEO 优化变更总览（可追溯）

更新时间：2026-04-19
适用仓库：`C:\Users\16933\Desktop\新建文件夹\WanFlow.ai`

## 1) 本次核心目标
- 按你之前的 GEO/SEO 审计结果，把“可直接改代码”的问题落地。
- 重点解决：`llms.txt`、元信息、canonical、结构化数据、FAQ、可提取内容、引用信号。

## 2) 问题 -> 解决动作 -> 文件

| 审计问题 | 已做优化 | 对应文件 |
|---|---|---|
| 缺少 `llms.txt` | 新增 LLM 读取指引文件 | `web/public/llms.txt` |

| 首页标题/描述偏弱 | 强化首页 metadata（title/description/keywords/OG/Twitter） | `web/src/app/layout.tsx`, `web/src/app/page.tsx` |

| 缺 canonical | 为首页与关键路由补 canonical | `web/src/app/page.tsx`, `web/src/app/about/page.tsx`, `web/src/app/cases/page.tsx`, `web/src/app/contact/page.tsx`, `web/src/app/solutions/page.tsx`, `web/src/app/privacy/page.tsx`, `web/src/app/terms/page.tsx` |

| 缺 WebSite / FAQ / 日期信号 schema | 新增/补强 JSON-LD：`Organization` `WebSite` `WebPage` `FAQPage`，并补 `datePublished/dateModified` | `web/src/app/page.tsx` |

| 页面缺 FAQ 可提取内容 | 新增可见 FAQ 区块，并与 FAQ schema 对齐 | `web/src/components/marketing/home-page.tsx`, `web/src/app/page.tsx` |

| 缺摘要与结构化可读块 | 新增“关键结论”摘要块 + 指标表格（更利于 AI 提取） | `web/src/components/marketing/home-page.tsx` |

| 权威信号不足 | 新增方法/治理参考链接（NIST/ISO/arXiv） | `web/src/components/marketing/home-page.tsx` |

| 客户端动态头信息不一致 | 同步首页/路由动态 title/description 逻辑 | `web/src/components/shared/marketing-head-sync.tsx` |

## 3) 你最关心的 llms 配置
- 结论：**不是原本就有，是本次新增**。
- 文件：`web/public/llms.txt`
- 线上访问路径（部署后）：`https://wanflowai.com/llms.txt`

## 4) 验证结果
- 已执行构建：`npm run build`
- 结果：构建通过（Next.js 编译成功）。

## 5) 下次快速自查（1 分钟）
1. 打开仓库：`C:\Users\16933\Desktop\新建文件夹\WanFlow.ai`
2. 看 `web/public/llms.txt` 是否存在
3. 看 `web/src/app/page.tsx` 是否包含 JSON-LD（Organization/WebSite/WebPage/FAQPage）
4. 看首页是否有“关键结论 + FAQ + 参考依据”
5. 本地跑：`npm run build`

## 6) 当前涉及改动文件清单
- `web/src/app/layout.tsx`
- `web/src/app/page.tsx`
- `web/src/app/about/page.tsx`
- `web/src/app/cases/page.tsx`
- `web/src/app/contact/page.tsx`
- `web/src/app/solutions/page.tsx`
- `web/src/app/privacy/page.tsx`
- `web/src/app/terms/page.tsx`
- `web/src/components/marketing/home-page.tsx`
- `web/src/components/shared/marketing-head-sync.tsx`
- `web/public/llms.txt`

## 7) 注释：为什么“改了很多但页面看起来变化不大”
- 这次改动分两层：
- `用户可见层`：例如首页新增的“关键结论 / 指标表格 / FAQ / 参考依据”，这类改动打开页面能直接看到。
- `机器可见层`：例如 `title`、`description`、`canonical`、`JSON-LD`、`llms.txt`，这类改动主要给搜索引擎和大模型抓取，不会明显改变页面样式。
- 所以“肉眼看不出变化”并不代表没优化，通常表示改动集中在 GEO/SEO 抓取层。
- 如果需要“每个页面都能明显看到变化”，后续要补的是可见内容模块（如每页的摘要块、FAQ、数据表），不是只改 metadata。

## 8) 同步主分支时的冲突说明（solutions 页）
- 冲突文件：`web/src/app/solutions/page.tsx`
- 冲突原因：主分支与 `geo-optimization` 分支都修改了同一段 `metadata`。
- 当时两边差异：
- `geo-optimization`：强化了 GEO 标题/描述，并新增 `canonical: '/solutions'`。
- `origin/main`：描述中加入了“汽车零部件”场景表述。
- 最终合并策略：
- 保留 GEO 强化（标题 + canonical）。
- 吸收主分支新增业务场景（把“汽车零部件”并入描述）。
- 最终结果：`solutions` 页同时具备 GEO 元信息增强与主分支最新业务文案，不丢任何一侧关键信息。
