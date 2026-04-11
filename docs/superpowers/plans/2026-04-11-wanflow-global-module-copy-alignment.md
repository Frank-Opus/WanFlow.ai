# WanFlow Global Module Copy Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align visible marketing copy and metadata across the public site with the approved Chinese and English five-module system.

**Architecture:** Keep the change copy-first and centered in `web/src/lib/marketing.ts`, which remains the source of truth for marketing content. Then update route metadata files so search and share previews no longer describe WanFlow using the retired module set.

**Tech Stack:** Next.js 15 App Router, TypeScript, shared marketing copy objects, Docker hot deployment on the production host

---

### Task 1: Align Chinese visible copy with the new module system

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Verify: `web/src/components/marketing/home-page.tsx`
- Verify: `web/src/components/shared/site-footer.tsx`

- [ ] **Step 1: Replace remaining Chinese legacy service lists in site, hero, signals, footer, and contact copy**

```ts
description: 'WanFlow 万物归流帮助企业把数据标注与治理、流程编排与自动化、企业级智能体和模型运营真正接进业务里'
```

```ts
items: ['数据标注与治理', '流程编排与自动化', '企业级智能体', '人机协同交付']
```

```ts
items: ['模型运营与持续优化', '数据治理体系', '人机协同交付', '企业交付支持']
```

- [ ] **Step 2: Replace homepage support-signal cards so they reflect the new narrative**

```ts
{ value: '5', label: '核心能力模块', detail: '覆盖从数据到执行再到优化的完整闭环' },
{ value: 'Agents', label: 'Enterprise AI Agents', detail: '以安全、稳定、可控的方式参与企业任务执行' },
{ value: 'Ops', label: 'Continuous Optimization', detail: '围绕反馈、评测和结果持续迭代' },
```

- [ ] **Step 3: Update Chinese case sectors and route-adjacent descriptions that still use the retired labels**

```ts
sector: '流程编排与自动化'
sector: '模型运营与持续优化'
```

Run: `rg -n "AI 数据标注|自动化数据处理|流程自动化|Process as a Service|模型运营服务" web/src/lib/marketing.ts`
Expected: no remaining Chinese marketing copy uses the retired core-module set outside intentionally preserved historical/product references

### Task 2: Align English marketing copy with the approved five modules

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Verify: `web/src/components/marketing/solutions-page.tsx`

- [ ] **Step 1: Replace English site description, hero summary, footer lists, and support-signal language**

```ts
'WanFlow helps enterprises connect data labeling and governance, workflow orchestration and automation, enterprise AI agents, and model operations into one working delivery system.'
```

```ts
items: ['Data Labeling & Governance', 'Workflow Orchestration & Automation', 'Enterprise AI Agents', 'Human-in-the-Loop Delivery']
```

```ts
{ value: 'Agents', label: 'Enterprise AI Agents', detail: 'controlled AI execution inside enterprise workflows' },
```

- [ ] **Step 2: Replace English module titles and related case sectors**

```ts
title: 'Data Labeling & Governance'
title: 'Workflow Orchestration & Automation'
title: 'Enterprise AI Agents'
title: 'Human-in-the-Loop Delivery'
title: 'Model Operations & Continuous Optimization'
```

- [ ] **Step 3: Verify `Process as a Service` is no longer presented as a core module in English marketing copy**

Run: `rg -n "Process as a Service" web/src/lib/marketing.ts`
Expected: no homepage, footer, or module section uses it as a current core module label

### Task 3: Align metadata and manifest copy

**Files:**
- Modify: `web/src/app/layout.tsx`
- Modify: `web/src/app/page.tsx`
- Modify: `web/src/app/contact/page.tsx`
- Modify: `web/src/app/solutions/page.tsx`
- Modify: `web/src/app/cases/page.tsx`
- Modify: `web/src/app/manifest.ts`

- [ ] **Step 1: Replace root metadata description and keywords with the new module system**

```ts
description: 'WanFlow 万物归流帮助企业把数据标注与治理、流程编排与自动化、企业级智能体和模型运营真正接进业务里'
keywords: ['WanFlow', '万物归流', '数据标注与治理', '流程编排与自动化', '企业级智能体', '人机协同交付', '模型运营与持续优化']
```

- [ ] **Step 2: Replace English Open Graph and Twitter descriptions**

```ts
description: 'Data labeling and governance, workflow orchestration, enterprise AI agents, human-in-the-loop delivery, and continuous model optimization for enterprise teams.'
```

- [ ] **Step 3: Align route-level page metadata and manifest descriptions**

```ts
description: '查看 WanFlow 如何以数据标注与治理、流程编排与自动化、企业级智能体和模型运营闭环构建企业 AI 执行体系。'
```

Run: `rg -n "AI 数据标注|自动化数据处理|流程自动化|Process as a Service|模型运营服务" web/src/app/layout.tsx web/src/app/page.tsx web/src/app/contact/page.tsx web/src/app/solutions/page.tsx web/src/app/cases/page.tsx web/src/app/manifest.ts`
Expected: route metadata no longer uses the retired module wording

### Task 4: Build, test, deploy, and commit

**Files:**
- Build artifact: `web/.next/`
- Runtime target: Docker container `wanflow-web`

- [ ] **Step 1: Build the frontend**

Run: `npm run build`
Working directory: `web/`
Expected: Production build completes successfully.

- [ ] **Step 2: Run frontend unit tests**

Run: `npm run test:unit`
Working directory: `web/`
Expected: PASS

- [ ] **Step 3: Run the focused marketing Playwright suite**

Run: `npx playwright test tests/e2e/marketing-site.spec.ts --workers=1`
Working directory: `web/`
Expected: PASS

- [ ] **Step 4: Hot deploy to production container**

Run: `docker cp /root/wanflow/web/.next/. wanflow-web:/app/web/.next/`
Expected: build output copied successfully

Run: `docker restart wanflow-web`
Expected: container restarts and returns healthy

- [ ] **Step 5: Verify the live site reflects the new expressions**

Run: `curl -sS https://wanflowai.com | rg "数据标注与治理|流程编排与自动化|企业级智能体|人机协同交付|模型运营与持续优化|Enterprise AI Agents|Continuous Optimization"`
Expected: updated copy appears in live HTML

- [ ] **Step 6: Commit the implementation**

```bash
git add web/src/lib/marketing.ts web/src/app/layout.tsx web/src/app/page.tsx web/src/app/contact/page.tsx web/src/app/solutions/page.tsx web/src/app/cases/page.tsx web/src/app/manifest.ts docs/superpowers/plans/2026-04-11-wanflow-global-module-copy-alignment.md
git commit -m "feat: align global module copy"
```

## Self-Review

- Spec coverage: the plan covers visible Chinese copy, visible English copy, and metadata alignment.
- Placeholder scan: all files, commands, and target wording are explicit.
- Type consistency: all edits stay within existing metadata objects and marketing copy structures.
