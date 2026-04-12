# WanFlow Homepage Capability Modules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Chinese marketing copy so the homepage capability section presents the approved five-module structure and supporting closed-loop positioning.

**Architecture:** Keep the change copy-only and centered in the marketing copy source. Update homepage module titles, descriptions, and section framing in `web/src/lib/marketing.ts`, then align the Chinese solutions-page module titles so navigation does not create contradictory service naming.

**Tech Stack:** Next.js 15 App Router, TypeScript, shared marketing copy objects, Docker hot deployment on the production host

---

### Task 1: Refresh homepage capability module copy

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Verify: `web/src/components/marketing/home-page.tsx`

- [ ] **Step 1: Update the section heading and body in the Chinese `capabilityModules` block**

```ts
capabilityModules: {
  eyebrow: '能力模块',
  title: '五个模块，一套持续进化的交付闭环',
  body: '这五个模块不是彼此割裂的服务列表，而是同一套交付系统里的关键环节，能够持续运行、持续反馈、持续优化',
```

- [ ] **Step 2: Replace the five homepage module titles and supporting copy**

```ts
items: [
  {
    title: '数据标注与治理',
    body: '把标注规范、数据标准、质检机制和治理节奏一起定清楚，让数据不只是产出，更能长期可用',
    outcome: '建立稳定的数据基础',
  },
  {
    title: '流程编排与自动化',
    body: '把审批、流转、质检、系统动作和异常处理接进同一套执行流程，减少人为断点',
    outcome: '让跨团队执行更顺、更稳',
  },
  {
    title: '企业级多智能体',
    body: '围绕企业任务构建安全、稳定、可控的智能体能力，让 AI 能真正参与执行，而不只是提供回答',
    outcome: '把 AI 变成可管理的执行力量',
  },
  {
    title: '人机协同交付',
    body: '把 AI 的执行效率和人的判断、复核、兜底结合起来，让复杂任务可以真实落地',
    outcome: '兼顾效率、质量与交付确定性',
  },
  {
    title: '模型运营与持续优化',
    body: '围绕模型表现、业务反馈、运行监控和效果验证持续迭代，让系统越跑越稳、越用越准',
    outcome: '形成可持续进化的运营闭环',
  },
],
```

- [ ] **Step 3: Run a focused diff review**

Run: `git diff -- web/src/lib/marketing.ts`
Expected: Only the Chinese homepage capability module section changes, with no accidental homepage BenchmarkOps reintroduction.

### Task 2: Align Chinese solutions-page module naming

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Verify: `web/src/components/marketing/solutions-page.tsx`

- [ ] **Step 1: Update the Chinese `solutions.modules` titles to match the approved module set**

```ts
modules: [
  { title: '数据标注与治理', ... },
  { title: '流程编排与自动化', ... },
  { title: '企业级多智能体', ... },
  { title: '人机协同交付', ... },
  { title: '模型运营与持续优化', ... },
]
```

- [ ] **Step 2: Keep deliverables and outcomes business-readable while reflecting the new module boundaries**

```ts
{
  title: '企业级多智能体',
  body: '围绕企业场景设计可控的智能体执行能力，让任务理解、知识调用和动作执行进入同一套系统。',
  deliverables: ['任务与权限边界', '知识与工具接入', '执行链路设计', '运行与审计机制'],
  outcomes: ['更强的自动执行能力', '更可控的企业落地方式'],
}
```

- [ ] **Step 3: Review the rendered section labels for consistency**

Run: `rg -n "五大模块如何变成可执行交付系统|服务模块" web/src/components/marketing/solutions-page.tsx web/src/lib/marketing.ts`
Expected: The page shell stays unchanged, while module names reflect the updated homepage vocabulary.

### Task 3: Build, verify, and hot deploy the marketing update

**Files:**
- Build artifact: `web/.next/`
- Runtime target: Docker container `wanflow-web`

- [ ] **Step 1: Build the frontend**

Run: `npm run build`
Working directory: `web/`
Expected: Production build completes successfully.

- [ ] **Step 2: Run frontend unit coverage relevant to shared marketing copy**

Run: `npm run test:unit`
Working directory: `web/`
Expected: PASS

- [ ] **Step 3: Run the focused marketing Playwright spec**

Run: `npx playwright test tests/e2e/marketing-site.spec.ts --workers=1`
Working directory: `web/`
Expected: PASS

- [ ] **Step 4: Hot deploy to the local production container**

Run: `docker cp /root/wanflow/web/.next/. wanflow-web:/app/web/.next/`
Expected: build output copied into the running container

Run: `docker restart wanflow-web`
Expected: container returns to healthy state

- [ ] **Step 5: Verify the live site reflects the new module language**

Run: `curl -sS https://wanflowai.com | rg "五个模块，一套持续进化的交付闭环|数据标注与治理|企业级多智能体|模型运营与持续优化"`
Expected: all updated strings appear in live HTML

- [ ] **Step 6: Commit the implementation**

```bash
git add web/src/lib/marketing.ts docs/superpowers/plans/2026-04-11-wanflow-homepage-capability-modules.md
git commit -m "feat: refresh homepage capability modules"
```

## Self-Review

- Spec coverage: the plan covers homepage module naming, homepage closed-loop framing, and solutions-page naming alignment to avoid contradictory service language.
- Placeholder scan: all file paths, commands, and target copy are explicit.
- Type consistency: all edits remain inside the existing marketing copy object shape, so component interfaces stay unchanged.
