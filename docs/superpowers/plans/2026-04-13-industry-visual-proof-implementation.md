# Industry Visual Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the `行业解决方案` and `真实案例` pages into a more visual, quantified, enterprise-facing presentation with industry hero images, module proof slots, originality labels, AI capability labels, and smoother navigation motion.

**Architecture:** Extend the bilingual marketing copy model in `web/src/lib/marketing.ts` so industry strips and case strips can render structured business proof instead of generic narrative blocks. Then update the two marketing page components and shared CSS so the UI presents stronger hierarchy, numbered proof lists, image slots, technical labels, and animated nav-state movement without changing routes.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, existing marketing components, global CSS, npm build verification

---

### File Structure

**Files to modify**
- `web/src/lib/marketing.ts`
  Purpose: add headline-grade industry copy, quantified signals, image-slot directions, module-level AI/originality/technical labels, and richer case fields for both `zh` and `en`
- `web/src/components/marketing/solutions-page.tsx`
  Purpose: render a stronger industry strip layout with dominant industry titles, numbered lists, module visual slots, and productized labels
- `web/src/components/marketing/cases-page.tsx`
  Purpose: render each case at equal depth with quantitative chips, numbered deliverables, and visual proof slots
- `web/src/components/shared/site-header.tsx`
  Purpose: animate desktop navigation state with a moving active pill that follows the current route
- `web/src/app/globals.css`
  Purpose: add numbered-list styling, stronger industry title scale, stat-chip styling, module-proof slot styling, and nav pill motion

**Files to verify**
- `web/src/app/solutions/page.tsx`
- `web/src/app/cases/page.tsx`

---

### Task 1: Restructure marketing copy for visual proof

**Files:**
- Modify: `web/src/lib/marketing.ts`

- [ ] **Step 1: Add failing type pressure by referencing the new fields in the plan**

```ts
// Target shape for each industry entry
{
  title: '金融与保险',
  headline: '把审核、补件与复核接成一条稳定交付链',
  summary: '围绕审核、补件、客服、风控、合规等高频业务环节...',
  stats: ['1 套统一规则口径', '4 个关键处理节点', '3 类高频业务模块'],
  imageTitle: '建议图片：风控审核台或流程指挥大屏',
  imageHint: '适合放审批流界面、风控任务台...',
  originalMethod: '规则库先行',
  technicalTraits: ['状态机驱动', '异常回退', '全链路留痕'],
  modules: [
    {
      title: '审核与补件流重构',
      mappedModule: '流程编排与自动化',
      aiCapability: '规则判断 + 多智能体分发 + 人工复核',
      technicalTrait: '状态流转与回退控制',
      originalMethod: '双轨审核闭环',
      deliverables: ['审核规则库', '补件回路设计', '状态追踪机制'],
      imageTitle: '建议小图：审核节点流程图',
      outcome: '高频审核任务更稳定',
    },
  ],
}
```

- [ ] **Step 2: Update the Chinese `solutions.industries` and `cases.cards` entries with the new structured fields**

```ts
title: '金融与保险',
headline: '把审核、补件与复核接成一条稳定交付链',
originalMethod: '规则库先行',
technicalTraits: ['状态机驱动', '异常回退', '全链路留痕'],
modules: [
  {
    title: '审核与补件流重构',
    mappedModule: '流程编排与自动化',
    aiCapability: '规则判断 + 多智能体分发 + 人工复核',
    technicalTrait: '状态流转与回退控制',
    originalMethod: '双轨审核闭环',
    imageTitle: '建议小图：审核节点流程图',
    deliverables: ['审核规则库', '补件回路设计', '状态追踪机制'],
    outcome: '高频审核任务更稳定',
  },
],
```

- [ ] **Step 3: Mirror the same structure in English so the locale types remain aligned**

```ts
title: 'Finance & Insurance',
headline: 'Connect review, resubmission, and recheck into one stable delivery chain',
originalMethod: 'Rules-first execution',
technicalTraits: ['State-machine flow', 'Fallback control', 'Full-chain traceability'],
modules: [
  {
    title: 'Review and resubmission flow redesign',
    mappedModule: 'Workflow Orchestration & Automation',
    aiCapability: 'Rule judgment + multi-agent routing + human review',
    technicalTrait: 'Controlled state transitions',
    originalMethod: 'Dual-track review loop',
    imageTitle: 'Suggested small visual: review node flow diagram',
    deliverables: ['Review rules library', 'Resubmission loop design', 'State tracking model'],
    outcome: 'High-volume review work becomes steadier',
  },
],
```

- [ ] **Step 4: Run a focused build to verify the new copy shape is accepted**

Run: `cd /root/wanflow/web && npm run build`
Expected: build completes without TypeScript errors about missing `headline`, `mappedModule`, `aiCapability`, `technicalTrait`, or `originalMethod`

- [ ] **Step 5: Commit the copy model update**

```bash
git -C /root/wanflow add web/src/lib/marketing.ts
git -C /root/wanflow commit -m "refactor: expand marketing proof content model"
```

### Task 2: Rebuild the solutions page into a stronger solution catalog

**Files:**
- Modify: `web/src/components/marketing/solutions-page.tsx`
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Update labels and section framing so the headings read like enterprise website copy**

```ts
const labels = locale === 'zh'
  ? {
      industriesTitle: '覆盖核心行业，直达高频业务链路',
      industriesBody: '围绕审核、异常工单、经营复盘、知识治理与共享服务等关键场景，形成可落地、可扩展、可持续优化的解决方案。',
      stats: '关键数字',
      originalMethod: '原创方法',
      technicalTraits: '技术特点',
      mappedModule: '对应模板',
      aiCapability: 'AI 能力',
    }
  : {
      industriesTitle: 'Coverage across core industries and high-frequency business chains',
      industriesBody: 'From review workflows and exception handling to reporting, knowledge governance, and shared services, each lane is built for live business execution.',
      stats: 'Key numbers',
      originalMethod: 'Original method',
      technicalTraits: 'Technical traits',
      mappedModule: 'Mapped module',
      aiCapability: 'AI capability',
    };
```

- [ ] **Step 2: Replace the current industry heading block with dominant titles, stat chips, and numbered result lists**

```tsx
<div className="space-y-3">
  <p className="mkt-kicker">{item.title}</p>
  <h3 className="mkt-industry-title">{item.headline}</h3>
  <p className="mkt-copy text-[0.98rem] sm:text-[1.02rem]">{item.summary}</p>
</div>
<div className="mkt-stat-row">
  {item.stats.map((stat) => (
    <span key={stat} className="mkt-stat-chip">{stat}</span>
  ))}
</div>
<ol className="mkt-number-list mt-3">
  {item.outcomes.map((outcome, index) => (
    <li key={outcome} className="mkt-number-item">
      <span className="mkt-number-badge">{index + 1}</span>
      <span>{outcome}</span>
    </li>
  ))}
</ol>
```

- [ ] **Step 3: Extend each module card to show mapped module, AI capability, technical trait, original method, numbered deliverables, and its own visual proof slot**

```tsx
<div className="mkt-proof-label-grid">
  <span className="mkt-proof-tag"><strong>{labels.mappedModule}:</strong> {module.mappedModule}</span>
  <span className="mkt-proof-tag"><strong>{labels.aiCapability}:</strong> {module.aiCapability}</span>
  <span className="mkt-proof-tag"><strong>{labels.technicalTraits}:</strong> {module.technicalTrait}</span>
  <span className="mkt-proof-tag"><strong>{labels.originalMethod}:</strong> {module.originalMethod}</span>
</div>
<div className="mkt-module-image-slot">
  <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.imageSlot}</p>
  <p className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{module.imageTitle}</p>
</div>
```

- [ ] **Step 4: Add CSS for the stronger industry title, proof tags, and module image slot**

```css
.mkt-industry-title {
  font-size: clamp(1.9rem, 2.6vw, 2.8rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
  font-weight: 700;
}

.mkt-proof-label-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.mkt-proof-tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(77, 123, 148, 0.18);
  border-radius: 999px;
  background: rgba(248, 251, 253, 0.9);
  padding: 0.4rem 0.72rem;
  font-size: 0.8rem;
}

.mkt-module-image-slot {
  min-height: 8.75rem;
  border: 1px dashed rgba(86, 125, 149, 0.26);
  border-radius: 1rem;
  padding: 0.95rem;
}
```

- [ ] **Step 5: Run build and confirm the industry strips compile**

Run: `cd /root/wanflow/web && npm run build`
Expected: build succeeds and `/solutions` remains statically generated

- [ ] **Step 6: Commit the solutions page upgrade**

```bash
git -C /root/wanflow add web/src/components/marketing/solutions-page.tsx web/src/app/globals.css
git -C /root/wanflow commit -m "feat: upgrade industry solutions presentation"
```

### Task 3: Rebuild every real case as a quantified proof strip

**Files:**
- Modify: `web/src/components/marketing/cases-page.tsx`
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Update case labels so the section reads like delivery proof instead of page explanation**

```ts
const labels = locale === 'zh'
  ? {
      caseGridTitle: '按真实业务链路看交付',
      caseGridBody: '每个案例都直接对应一个真实业务问题，重点展示方案怎么落、交付物怎么沉淀、结果怎么被看见。',
      stats: '关键数字',
      originalMethod: '原创方法',
      technicalTraits: '技术特点',
      aiCapability: 'AI 能力',
    }
  : {
      caseGridTitle: 'Read delivery through real business chains',
      caseGridBody: 'Each case maps to a real business problem and shows how the solution landed, what was delivered, and how the outcome became visible.',
      stats: 'Key numbers',
      originalMethod: 'Original method',
      technicalTraits: 'Technical traits',
      aiCapability: 'AI capability',
    };
```

- [ ] **Step 2: Add a stat row and stronger title framing to every case strip**

```tsx
<div className="space-y-3">
  <p className="mkt-kicker">{item.sector}</p>
  <h3 className="zh-card-title text-[1.32rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
</div>
<div className="mkt-stat-row">
  {item.stats.map((stat) => (
    <span key={stat} className="mkt-stat-chip">{stat}</span>
  ))}
</div>
```

- [ ] **Step 3: Add numbered deliverables plus originality and technical tags in the right column**

```tsx
<ol className="mkt-number-list mt-3">
  {item.deliverables.map((deliverable, index) => (
    <li key={deliverable} className="mkt-number-item">
      <span className="mkt-number-badge">{index + 1}</span>
      <span>{deliverable}</span>
    </li>
  ))}
</ol>
<div className="mkt-proof-label-grid">
  <span className="mkt-proof-tag"><strong>{labels.originalMethod}:</strong> {item.originalMethod}</span>
  <span className="mkt-proof-tag"><strong>{labels.aiCapability}:</strong> {item.aiCapability}</span>
  <span className="mkt-proof-tag"><strong>{labels.technicalTraits}:</strong> {item.technicalTraits.join(' / ')}</span>
</div>
```

- [ ] **Step 4: Add a dedicated case image slot style if the shared industry slot looks too generic**

```css
.mkt-case-image-slot {
  min-height: 9.25rem;
  border: 1px dashed rgba(86, 125, 149, 0.26);
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(250, 252, 253, 0.92), rgba(235, 244, 248, 0.86));
  padding: 0.95rem;
}
```

- [ ] **Step 5: Run build and verify the cases page still compiles**

Run: `cd /root/wanflow/web && npm run build`
Expected: build succeeds and `/cases` remains statically generated

- [ ] **Step 6: Commit the case-page upgrade**

```bash
git -C /root/wanflow add web/src/components/marketing/cases-page.tsx web/src/app/globals.css
git -C /root/wanflow commit -m "feat: strengthen real case proof layout"
```

### Task 4: Polish nav motion and complete verification

**Files:**
- Modify: `web/src/components/shared/site-header.tsx`
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Keep the moving active pill logic and ensure it follows route prefixes, not exact equality only**

```ts
const activeItem = copy.nav.find((item) => (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)));
const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
```

- [ ] **Step 2: Add the animated nav pill style and keep the active link itself visually calm**

```css
.site-nav-pill {
  position: absolute;
  inset: 0 auto 0 0;
  margin: 0.25rem 0;
  border-radius: 999px;
  transition:
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
    width 360ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms var(--mk-ease-soft);
}

.site-nav-link-active {
  background: transparent;
  box-shadow: none;
}
```

- [ ] **Step 3: Run the final production build**

Run: `cd /root/wanflow/web && npm run build`
Expected: full Next.js build succeeds with `/solutions` and `/cases` emitted as static routes

- [ ] **Step 4: Deploy the updated build to the running container**

Run:

```bash
docker cp /root/wanflow/web/.next/. wanflow-web:/app/web/.next/
docker restart wanflow-web
```

Expected: `wanflow-web` restarts successfully

- [ ] **Step 5: Smoke-test both pages from the live domain**

Run:

```bash
curl -L --max-time 20 -s https://wanflowai.com/solutions | rg "覆盖核心行业|金融与保险|1 套统一规则口径"
curl -L --max-time 20 -s https://wanflowai.com/cases | rg "按真实业务链路看交付|某头部消费金融机构的审核与复核链路重构|1 套统一审核规则"
```

Expected: both commands return matching lines from the updated live HTML

- [ ] **Step 6: Commit the navigation polish and any final adjustments**

```bash
git -C /root/wanflow add web/src/components/shared/site-header.tsx web/src/app/globals.css
git -C /root/wanflow commit -m "refactor: polish marketing navigation motion"
```

---

## Self-Review

### Spec Coverage
- Industry hero image slots: covered in Task 1 and Task 2
- Module-level visual slots: covered in Task 1 and Task 2
- Five-template mapping and AI attributes: covered in Task 1 and Task 2
- Original methods and technical traits: covered in Task 1, Task 2, and Task 3
- Quantified proof on both pages: covered in Task 1, Task 2, and Task 3
- Smooth navigation switching: covered in Task 4

### Placeholder Scan
- No `TBD`, `TODO`, or “similar to above” placeholders remain
- Every task contains exact files, commands, and code snippets

### Type Consistency
- Industry fields use `headline`, `stats`, `originalMethod`, `technicalTraits`, and module-level `mappedModule`, `aiCapability`, `technicalTrait`, `originalMethod`, `imageTitle`
- Case fields use `stats`, `deliverables`, `imageTitle`, `originalMethod`, `aiCapability`, `technicalTraits`

