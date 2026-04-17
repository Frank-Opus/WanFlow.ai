# Industry Visual Proof Design

## Goal
Upgrade the `行业解决方案` and `真实案例` pages from text-heavy explanation into a stronger enterprise-facing presentation. The new version should feel more credible, more visual, and more productized. It should show specific industry lanes, concrete AI-enabled modules, stronger quantitative framing, and clearer WanFlow differentiation through original methods and technical traits.

## Scope
This design updates two existing marketing pages:

- `行业解决方案`
- `真实案例`

It does not change routing. It changes information hierarchy, copy style, visual structure, and content model.

## Core Problems To Fix
- Some current headings still read like internal design notes rather than website copy.
- Industry titles are not visually dominant enough.
- The pages mention AI capability, but do not package it as business-facing execution capability.
- The five core modules exist, but are not strongly woven into industry-specific business modules.
- The pages show too few quantified proof signals.
- Original WanFlow methods and technical characteristics are not visible enough.

## Design Direction
The pages should feel closer to an enterprise solution catalog and delivery proof system, not a strategy memo.

### Page 1: 行业解决方案

Each industry should become one full-width solution strip with four parts:

1. Industry title and hero statement
2. One large industry image
3. Three concrete business-module cards
4. Quantified proof and originality labels

### Industry Strip Structure
For each industry:

- Large, visually dominant industry name
- One formal business headline that can live on a website
- One industry image slot
- Three module cards
- Quantified signal row
- Original method / AI capability / technical trait labels

### Image Strategy
- Each industry gets one large image
- Each module gets one smaller visual slot, not another full-size image

The large image should establish industry context. The small visual slot should behave like proof: UI crop, process diagram, dashboard fragment, system flow, or structured artifact preview.

### Industry Content Model
Each industry strip should include:

- Industry name
- Website-grade headline
- One-sentence business framing
- 3 quantified signals
- 3 business modules
- 1 image direction for the industry hero image

Each business module should include:

- Module title
- What business action it solves
- Which WanFlow core module it maps to
- What AI ability is involved
- What technical characteristic makes it credible
- Concrete deliverables
- One small image direction

### Required Label Types
Each industry module should explicitly show:

- `对应模板` or `Mapped module`
- `AI 能力` or `AI capability`
- `技术特点` or `Technical trait`
- `原创方法` or `Original method`

These should be short, productized labels rather than long explanation paragraphs.

### Quantification Strategy
Use three levels of proof:

1. Structural numbers
   Example: `3 类业务模块`, `4 个关键节点`, `1 套统一规则体系`
2. Delivery numbers
   Example: `12 个节点接入`, `7 套 SOP`, `3 类数据源治理`
3. Outcome numbers
   Example: `时效提升 38%`, `回退减少 42%`

Do not fabricate outcome numbers. If true outcome data is missing, use structural and delivery numbers first.

## Page 2: 真实案例

The case page should show every case at the same level. No featured case.

### Case Structure
Each case card or strip should include:

- Industry
- Client type
- Original problem
- Solution combination
- Delivery process
- Deliverables
- Quantified signals
- Original method / technical trait / AI capability tags
- One case image slot

### Case Quantification
Every case should include at least one visible quantitative row:

- `1 套规则库`
- `4 个节点重构`
- `3 类交付物`

If real results exist, they should be added as stronger proof.

## Copy Guidance
- Remove all copy that sounds like process explanation for designers
- Prefer compact enterprise headlines
- Make industry names visually primary
- Keep business language direct, formal, and concrete
- Avoid generic AI theater wording

## Visual Guidance
- Industry names should be much larger than supporting labels
- Quantified chips should be prominent and repeatable
- Ordered lists should use styled numeric markers (`1`, `2`, `3`), not dash bullets
- Navigation switching should feel smooth and continuous through animated active-state movement

## Non-Goals
- No route changes
- No CMS introduction
- No made-up business results
- No separate “technology overview” page in this task

## Implementation Notes
- Update `web/src/lib/marketing.ts` to support new content fields
- Update `web/src/components/marketing/solutions-page.tsx`
- Update `web/src/components/marketing/cases-page.tsx`
- Update `web/src/components/shared/site-header.tsx` and related CSS for navigation motion polish
- Update `web/src/app/globals.css` for numbered list styles, industry title scale, stat chips, and image-slot patterns
