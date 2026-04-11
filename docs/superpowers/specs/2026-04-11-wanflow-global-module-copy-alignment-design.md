# WanFlow Global Module Copy Alignment Design

## Goal
Align the public marketing site around the new five-module structure so users do not see one set of module names on the homepage and a different set elsewhere. The alignment should cover both Chinese and English copy, including visible page content and metadata.

## Approved Direction
Use one shared module system across the public site.

Chinese modules:
1. `数据标注与治理`
2. `流程编排与自动化`
3. `企业级智能体`
4. `人机协同交付`
5. `模型运营与持续优化`

English modules:
1. `Data Labeling & Governance`
2. `Workflow Orchestration & Automation`
3. `Enterprise AI Agents`
4. `Human-in-the-Loop Delivery`
5. `Model Operations & Continuous Optimization`

## Scope
Update both user-facing copy and metadata-related copy.

This includes:
- homepage supporting descriptions and signal cards
- solutions page module titles and supporting descriptions
- cases, contact, about, and footer references where old module lists remain
- route metadata in `layout.tsx`, route-level `page.tsx` metadata, and `manifest.ts`
- English marketing copy where the old module system still appears

## Expression Rules
Remove `Process as a Service` as a homepage or core module label in both languages.

Do not reintroduce a split between `AI 数据标注` and `自动化数据处理` as two separate top-level homepage modules.

Do not make the English set a literal slogan translation. Keep it formal, enterprise-readable, and structurally parallel to the Chinese version.

## Copy Intent
The site should read as one operating system for enterprise AI delivery, not as a loose list of outsourced services.

`企业级智能体` / `Enterprise AI Agents` should be framed as controlled enterprise execution capability, with safety, stability, and governance expressed in supporting text rather than overloaded titles.

`人机协同交付` / `Human-in-the-Loop Delivery` should explain WanFlow's differentiation: AI handles repeatable execution while people handle judgment, review, and exception management.

`模型运营与持续优化` / `Model Operations & Continuous Optimization` should carry the ideas of closed loop, iteration, and long-term evolution.

## File Targets
Primary source of truth:
- `web/src/lib/marketing.ts`

Metadata and manifest alignment:
- `web/src/app/layout.tsx`
- `web/src/app/page.tsx`
- `web/src/app/contact/page.tsx`
- `web/src/app/solutions/page.tsx`
- `web/src/app/cases/page.tsx`
- `web/src/app/manifest.ts`

## Success Criteria
- no visible Chinese page still uses the previous five-module wording
- no visible English marketing section still presents `Process as a Service` as a core module
- metadata and manifest no longer describe the company with the old module set
- homepage, solutions page, and footer present a consistent enterprise-facing narrative
