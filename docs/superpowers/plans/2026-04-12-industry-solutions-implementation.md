# Industry Solutions And Real Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current solution and case pages with a buyer-facing `行业解决方案 / 真实案例` structure and keep route paths stable.

**Architecture:** Keep the existing Next.js App Router pages and marketing primitives, but rewrite the information architecture in `marketing.ts` and simplify both page components so they render only the approved sections. Update navigation and metadata labels to match the new page roles.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, existing marketing UI primitives, npm build verification

---

### Task 1: Rewrite shared marketing copy and labels

**Files:**
- Modify: `web/src/lib/marketing.ts`

- [ ] Update the navigation labels to `行业解决方案 / 真实案例` in Chinese and `Industry Solutions / Real Cases` in English.
- [ ] Replace the current `solutions` copy model with hero copy, industry examples, service-module copy, and final CTA copy in both locales.
- [ ] Replace the current `cases` copy model with hero copy, one featured real case, supporting case cards, and final CTA copy in both locales.
- [ ] Remove or stop depending on copy blocks for standalone architecture, trigger, delivery, and proof sections.

### Task 2: Simplify the solutions page into industry-led sections

**Files:**
- Modify: `web/src/components/marketing/solutions-page.tsx`

- [ ] Replace the current architecture, trigger, and delivery sections with a single industry solutions section.
- [ ] Keep the service modules section, but rewrite labels and supporting text so it reads as shared delivery capability instead of the main story.
- [ ] Update hero aside content so it reinforces industry breadth and business problems rather than trigger lists.
- [ ] Preserve CTA flow to `/contact` and `/cases`.

### Task 3: Rebuild the cases page as real-case proof

**Files:**
- Modify: `web/src/components/marketing/cases-page.tsx`

- [ ] Change the page framing from generic cases to `真实案例 / Real Cases`.
- [ ] Keep one featured case block and make the labels more concrete around client type, problem, solution, delivery, and result.
- [ ] Rewrite the case grid so each card reads like an anonymized real delivery slice.
- [ ] Remove the standalone proof section and keep proof points inside the featured case and cards.

### Task 4: Align metadata and route-facing labels

**Files:**
- Modify: `web/src/app/solutions/page.tsx`
- Modify: `web/src/app/cases/page.tsx`
- Modify: `web/src/components/shared/marketing-head-sync.tsx`

- [ ] Update route metadata titles and descriptions to `行业解决方案 / 真实案例` and their English equivalents.
- [ ] Keep `/solutions` and `/cases` paths unchanged.

### Task 5: Verify and record

**Files:**
- No source changes required unless verification exposes issues

- [ ] Run `npm run build` inside `web/`.
- [ ] If build passes, inspect diff and summarize the change set.
- [ ] Commit the page redesign with a conventional commit message.
