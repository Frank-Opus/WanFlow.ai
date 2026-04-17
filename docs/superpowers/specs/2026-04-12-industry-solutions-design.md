# Industry Solutions And Real Cases Design

## Goal
Restructure the marketing information architecture so the site speaks in a clearer B2B language. The current `解决方案` page over-explains internal logic with standalone sections such as `系统架构`, `典型触发场景`, and `交付模型`. The new structure should lead with buyer-facing content: industries, business problems, solution combinations, and outcomes.

## Scope
This design covers two top-level marketing pages in the frontend:

- `解决方案` becomes `行业解决方案`
- `案例` becomes `真实案例`

The change is structural and editorial. It does not introduce new backend features, new routes beyond renaming labels, or new data sources.

## Design Principles
- Speak from the enterprise buyer's perspective, not the internal delivery perspective.
- Explain what WanFlow can solve in plain business language before describing capabilities.
- Keep the page compact and scannable on desktop and mobile.
- Reuse existing visual system and component patterns unless a section no longer fits the new structure.

## Page 1: 行业解决方案

### Purpose
Help a visitor answer three questions quickly:

1. Does WanFlow understand my industry
2. What problems can WanFlow solve
3. What capabilities support those solutions

### Final Structure
The page should contain only these major sections:

1. Hero
2. Industry solution grid or stacked industry sections
3. Service modules
4. Final CTA

### Sections Removed
Remove these standalone sections from the current page:

- `系统架构`
- `典型触发场景`
- `交付模型` or `交付步骤`
- Any separate proof-oriented explainer block

If useful, their meaning may be absorbed into industry cards or service-module copy, but they should not remain as independent sections.

### Industry Section Content Model
Each industry block should include:

- Industry name
- Typical business problems
- Recommended solution combination
- Expected business outcomes

### Initial Industry Set
Start with five broad industries that match WanFlow's current positioning:

- 金融与保险
- 制造与供应链
- 零售与电商
- 医疗与医药
- 企业运营与共享服务

### Example Content Direction
- 金融与保险: 审核提效, 客服自动化, 风控流程协同, 合规留痕
- 制造与供应链: 订单协同, 异常流转, 供应链运营效率, 跨系统处理
- 零售与电商: 多平台运营, 数据汇总, 内容与客服协同, 日报周报自动化
- 医疗与医药: 文档解析, 知识治理, 合规流程, 智能问答辅助
- 企业运营与共享服务: 财务, 人事, 客服, 行政等重复流程自动化

### Service Modules Positioning
Keep the existing five service modules, but frame them as WanFlow's common delivery capability layer rather than the page's main story.

Recommended module list:

- 数据标注与治理
- 工作流编排与自动化
- 企业级多智能体
- 人机协同交付
- 模型运营与持续优化

The section should explain that different industries call different combinations of the same delivery modules.

## Page 2: 真实案例

### Purpose
Show that WanFlow has shipped practical enterprise work and can describe outcomes in a structured, credible way.

### Final Structure
The page should contain:

1. Hero
2. One featured case
3. A grid of additional real cases
4. Final CTA

### Sections Removed
Remove the standalone `证明层` section. Proof should be embedded inside each case through outcomes, deliverables, and execution details.

### Case Content Model
Each case should use a consistent structure:

- Client type
- Original problem
- Solution combination
- Delivery process highlights
- Business results
- Concrete deliverables or proof points

### Featured Case
The featured case should feel more concrete than the current version. It should include a clearer challenge, a more specific intervention summary, and measurable or at least operationally credible outcomes.

### Additional Case Cards
The supporting cards may remain anonymized, but they should read like real delivery slices rather than conceptual examples. Good formats include:

- 某消费金融机构的审核流重构
- 某制造企业的异常工单协同
- 某电商品牌的运营自动化与周报生成
- 某企业共享服务中心的多流程协同

## Navigation And Label Changes
- Change the top-level navigation label from `解决方案` to `行业解决方案`
- Change the top-level navigation label from `案例` to `真实案例`
- Keep route paths stable if possible to avoid unnecessary deployment or SEO risk unless route labels are generated directly from file structure

## Copy Guidance
- Avoid abstract wording such as `证明层`, `系统骨架`, or `触发场景` as section titles
- Prefer direct enterprise wording such as `适用行业`, `典型问题`, `方案组合`, `可交付结果`, and `真实案例`
- Keep language formal, clear, and practical
- Avoid exaggerated AI marketing language

## Responsive And UX Notes
- Industry cards must remain readable on mobile without overflow
- Keep section count low to reduce page fatigue
- Preserve current CTA flow to the contact page

## Non-Goals
- No new case-management CMS
- No new filtering system
- No animation redesign beyond what existing sections already use
- No homepage rewrite as part of this task

## Implementation Notes
- Update page components under `web/src/components/marketing/`
- Update bilingual copy in `web/src/lib/marketing.ts`
- Reuse existing shared primitives where possible
- Validate with at least a production build after implementation
