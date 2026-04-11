# WanFlow 本轮对话记录与关键决策

最后更新：2026-04-11

这不是逐字聊天导出，而是面向迁移/接手使用的结构化会话记录，保留本轮对话中的关键需求、设计决策、部署决策和验证结论。

## 1. 项目目标

用户要求在现有企业内部平台基础上，新增一套全新的官网（marketing website），并与内部平台形成统一品牌与统一交付体系。

核心背景：

- 公司：`WanFlow / 万物归流`
- 定位：数据驱动型 AI 公司
- 对标参考：Invisible AI 的叙事方式与现代科技风官网表达
- 主营：
  - AI 数据标注
  - 自动化数据处理
  - 流程自动化
  - Process as a Service
  - 模型运营服务

## 2. 用户明确提出过的产品与设计要求

- 全站用中文与英文双语，默认中文
- 官网包含：
  - 首页
  - 解决方案
  - 案例
  - 关于我们
  - 联系我们
- 设计上明确参考 ClickHouse 风格设计稿结构，但配色需重新设计，不使用纯黑背景
- 后续多轮审美调整中，用户还明确要求：
  - 桌面端布局问题要修
  - 移动端兼容要好
  - 动画要更成熟
  - 动画做“跳出来”的感觉
  - 淡出速度慢一点，但不要太慢
  - 中文字体要替换为更合适的字体

## 3. 官网与内部平台的结构决策

用户明确确认了以下结构：

- 内部平台正式作为 `proofbench`
- 正式访问路径采用小写：`/dataflow/proofbench`
- 旧路径 `/proofbench` 不保留兼容，直接删除
- 官网中的入口也统一指向 `/dataflow/proofbench`
- 内部平台正式文案命名采用：`WanFlow BenchmarkOps`

## 4. 鉴权与企业版预留

用户要求内部平台开始加入鉴权，并明确说明：

- 先做标准版
- 但要为企业版预留后续接入企业 SSO / OAuth 的结构

已完成决策：

- 当前标准版使用 credentials auth
- 环境变量层面已预留 OAuth / enterprise SSO 扩展位
- 未登录访问工作台时跳转登录页

## 5. 联系方式与对外信息决策

用户最终确认的联系信息：

- 微信：`FrankXu0303`
- 邮箱：`wanflow@163.com`

这些信息已经进入：

- 联系我们页面
- 官网结构化内容
- E2E 测试断言

## 6. 部署方式决策

用户明确要求：

- 平时在当前机器开发
- 真正上线部署时，到 `HKZ` 机器上完成正式部署
- 使用正式域名：`wanflowai.com`

后续实际落地方案：

- 正式站点运行在 `HKZ`
- `Caddy` 负责 TLS 和反向代理
- 应用容器监听宿主机 `127.0.0.1:3010`
- 域名：
  - `wanflowai.com`
  - `www.wanflowai.com`

## 7. Docker 部署中的关键技术决策

部署过程中发现 HKZ 无法稳定从 Docker Hub 拉基础镜像，因此最终形成了以下正式方法：

- 不依赖 HKZ 远端 build
- 在本地工作站构建 `wanflow-web:local`
- 通过 `docker save | ssh HKZ docker load` 把镜像传到 HKZ
- HKZ 用 `docker-compose.prod.yml + docker-compose.remote-image.yml` 启动

这是一个关键运维事实，后续接手人必须知道。

## 8. 本轮实际解决过的重要问题

### 8.1 Vercel 报错 “No Next.js version detected”

用户曾遇到该错误，后续已转为更稳妥的正式部署方案，即 HKZ + Docker + Caddy。

### 8.2 桌面端大量显示问题

用户明确指出“手机兼容显示地不错，但是电脑端有很多问题”，后续已系统性修复桌面端布局、溢出与层级问题。

### 8.3 页面顶部白条问题

用户指出页面顶部出现 `DATA-DRIVEN AI OPERATIONS` 白条，要求删除；后续已处理。

### 8.4 前端动画与视觉节奏问题

后续多轮针对动画风格、速度、呈现方式进行了持续打磨。

### 8.5 Playwright 联系表单 E2E 假失败

真实根因最终确认：

- Playwright 复用了残留的 Lighthouse 本地服务
- 导致联系表单提交到了错误的运行时目录
- 测试在读取 `.playwright-runtime/marketing-leads` 时找不到目录

最终修复：

- Playwright 默认端口改为 `3402`
- `reuseExistingServer` 改为 `false`
- Lighthouse 启动 / 关闭逻辑改为独立、可回收，不再污染 E2E 环境

对应提交：

- `b418845 fix: isolate e2e and lighthouse servers`

## 9. 本轮关键提交

近期关键提交包括：

- `8c9f254 feat: add docker deployment for hkz`
- `fa38f31 fix: remove docker buildkit syntax dependency`
- `b418845 fix: isolate e2e and lighthouse servers`

## 10. 当前最终状态

- 官网可访问
- HKZ 线上容器健康
- `wanflowai.com` 可访问
- `www.wanflowai.com` 可访问
- 工作台入口统一为 `/dataflow/proofbench`
- 本地 fresh build / unit / playwright / lighthouse 全通过

## 11. 后续接手建议

如果后续换机器、换人或换部署节点，最重要的是保持以下几件事不丢：

1. 官网与内部平台已经合并为统一站点，而不是两个独立项目
2. 正式路径是 `/dataflow/proofbench`，旧 `/proofbench` 已废弃
3. 标准版 auth 已上线，OAuth / SSO 只是预留结构，不是已完成功能
4. HKZ 正式部署依赖本地镜像传输方案，而不是远端直接 build
5. 联系信息、品牌文案与视觉风格已经过多轮用户确认，不建议随意回退

