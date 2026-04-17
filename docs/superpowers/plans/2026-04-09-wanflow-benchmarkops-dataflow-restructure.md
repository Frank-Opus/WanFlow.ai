# WanFlow BenchmarkOps DataFlow Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the official internal platform to `/dataflow/proofbench`, make `WanFlow BenchmarkOps` the single formal product identity, and remove the legacy `/proofbench` route and legacy proofbench implementation line.

**Architecture:** Introduce a formal product root at `DataFlow/proofbench`, mount it from a thin Next.js route at `web/src/app/dataflow/proofbench/page.tsx`, and migrate the current project-based platform UI into that root in smaller modules. Keep `/api/platform/*` as the sole backend surface, remove `/api/proofbench/*`, and update every marketing and product link to the new canonical path.

**Tech Stack:** Next.js 15 app router, React 19, TypeScript, Playwright, local `platform-data/` storage, existing Python benchmark runner integration.

---

### Task 1: Enable the new external product root and route shell

**Files:**
- Create: `DataFlow/proofbench/index.ts`
- Create: `DataFlow/proofbench/ui/benchmarkops-app.tsx`
- Create: `web/src/app/dataflow/proofbench/page.tsx`
- Modify: `web/next.config.ts`
- Modify: `web/tsconfig.json`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Write the failing route test for the new canonical path**

```ts
// web/tests/e2e/marketing-site.spec.ts
const desktopPages = [
  { name: 'home', path: '/' },
  { name: 'solutions', path: '/solutions' },
  { name: 'cases', path: '/cases' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'benchmarkops', path: '/dataflow/proofbench' },
] as const;
```

- [ ] **Step 2: Run the Playwright suite to verify the new route fails before implementation**

Run: `cd web && npm run test:e2e`
Expected: FAIL because `/dataflow/proofbench` does not exist yet.

- [ ] **Step 3: Allow the web app to import from the new external `DataFlow` root**

```ts
// web/next.config.ts
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default function nextConfig(phase: string): NextConfig {
  return {
    reactStrictMode: true,
    experimental: {
      externalDir: true,
    },
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
```

```json
// web/tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@dataflow/*": ["../DataFlow/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "../DataFlow/**/*.ts",
    "../DataFlow/**/*.tsx",
    ".next/types/**/*.ts",
    ".next-dev/types/**/*.ts"
  ]
}
```

- [ ] **Step 4: Create the formal product entry point and route shell**

```ts
// DataFlow/proofbench/index.ts
export { default as WanFlowBenchmarkOpsApp } from './ui/benchmarkops-app';
```

```tsx
// DataFlow/proofbench/ui/benchmarkops-app.tsx
'use client';

import PlatformConsole from '@/components/platform/platform-console';

export default function WanFlowBenchmarkOpsApp() {
  return <PlatformConsole />;
}
```

```tsx
// web/src/app/dataflow/proofbench/page.tsx
import { WanFlowBenchmarkOpsApp } from '@dataflow/proofbench';

export default function DataFlowProofbenchPage() {
  return (
    <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <WanFlowBenchmarkOpsApp />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Run build and verify the new route passes**

Run: `cd web && npm run build && npm run test:e2e`
Expected: PASS for `/dataflow/proofbench`, while `/proofbench` still exists for now.

- [ ] **Step 6: Commit the route-foundation change**

```bash
git add web/next.config.ts web/tsconfig.json web/src/app/dataflow/proofbench/page.tsx DataFlow/proofbench/index.ts DataFlow/proofbench/ui/benchmarkops-app.tsx web/tests/e2e/marketing-site.spec.ts
git commit -m "refactor: add dataflow benchmarkops route shell"
```

### Task 2: Move the formal product shell into `DataFlow/proofbench`

**Files:**
- Create: `DataFlow/proofbench/ui/benchmarkops-shell.tsx`
- Create: `DataFlow/proofbench/lib/copy.ts`
- Create: `DataFlow/proofbench/lib/constants.ts`
- Modify: `DataFlow/proofbench/ui/benchmarkops-app.tsx`
- Modify: `web/src/components/platform/platform-console.tsx`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Write a focused smoke assertion for the formal product brand**

```ts
// web/tests/e2e/marketing-site.spec.ts
test('benchmarkops route shows the formal product title', async ({ page }) => {
  await page.goto('/dataflow/proofbench');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(/WanFlow BenchmarkOps/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the focused test and verify it fails before the brand shell exists**

Run: `cd web && npx playwright test -g "formal product title"`
Expected: FAIL because the current UI still renders the old title structure.

- [ ] **Step 3: Extract product constants and copy ownership out of the giant console file**

```ts
// DataFlow/proofbench/lib/constants.ts
export const BENCHMARKOPS_PRODUCT_NAME = 'WanFlow BenchmarkOps';
export const BENCHMARKOPS_CANONICAL_PATH = '/dataflow/proofbench';
```

```ts
// DataFlow/proofbench/lib/copy.ts
import { useLocale } from '@/components/shared/locale-provider';
import { BENCHMARKOPS_PRODUCT_NAME } from './constants';

export function useBenchmarkOpsProductCopy() {
  const { locale } = useLocale();
  return locale === 'zh'
    ? {
        productName: BENCHMARKOPS_PRODUCT_NAME,
        heroEyebrow: 'WanFlow.ai 正式内部平台',
      }
    : {
        productName: BENCHMARKOPS_PRODUCT_NAME,
        heroEyebrow: 'WanFlow.ai formal internal platform',
      };
}
```

- [ ] **Step 4: Introduce a formal shell wrapper above the migrated console**

```tsx
// DataFlow/proofbench/ui/benchmarkops-shell.tsx
'use client';

import PlatformConsole from '@/components/platform/platform-console';
import { useBenchmarkOpsProductCopy } from '../lib/copy';

export default function BenchmarkOpsShell() {
  const copy = useBenchmarkOpsProductCopy();

  return (
    <section data-product="wanflow-benchmarkops" className="space-y-4">
      <div className="sr-only">
        <h1>{copy.productName}</h1>
        <p>{copy.heroEyebrow}</p>
      </div>
      <PlatformConsole />
    </section>
  );
}
```

```tsx
// DataFlow/proofbench/ui/benchmarkops-app.tsx
'use client';

import BenchmarkOpsShell from './benchmarkops-shell';

export default function WanFlowBenchmarkOpsApp() {
  return <BenchmarkOpsShell />;
}
```

- [ ] **Step 5: Reduce direct product naming inside `PlatformConsole` and delegate to shared product constants**

```tsx
// web/src/components/platform/platform-console.tsx
import { BENCHMARKOPS_PRODUCT_NAME } from '@dataflow/proofbench/lib/constants';

const COPY = {
  zh: {
    heroTitle: `${BENCHMARKOPS_PRODUCT_NAME} 企业评测中台`,
  },
  en: {
    heroTitle: `${BENCHMARKOPS_PRODUCT_NAME} enterprise evaluation hub`,
  },
};
```

- [ ] **Step 6: Run build and the focused Playwright assertion**

Run: `cd web && npm run build && npx playwright test -g "formal product title"`
Expected: PASS.

- [ ] **Step 7: Commit the shell extraction**

```bash
git add DataFlow/proofbench/ui/benchmarkops-shell.tsx DataFlow/proofbench/ui/benchmarkops-app.tsx DataFlow/proofbench/lib/copy.ts DataFlow/proofbench/lib/constants.ts web/src/components/platform/platform-console.tsx web/tests/e2e/marketing-site.spec.ts
git commit -m "refactor: introduce formal benchmarkops shell"
```

### Task 3: Split `PlatformConsole` into product modules under `DataFlow/proofbench`

**Files:**
- Create: `DataFlow/proofbench/modules/projects/projects-panel.tsx`
- Create: `DataFlow/proofbench/modules/sources/sources-panel.tsx`
- Create: `DataFlow/proofbench/modules/items/items-panel.tsx`
- Create: `DataFlow/proofbench/modules/runs/runs-panel.tsx`
- Create: `DataFlow/proofbench/modules/results/results-panel.tsx`
- Create: `DataFlow/proofbench/modules/governance/governance-panel.tsx`
- Create: `DataFlow/proofbench/lib/view-model.ts`
- Modify: `DataFlow/proofbench/ui/benchmarkops-shell.tsx`
- Modify: `web/src/components/platform/platform-console.tsx`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Write a regression test that checks the new route still exposes the key operational sections**

```ts
// web/tests/e2e/marketing-site.spec.ts
test('benchmarkops route exposes project, run, results, and governance sections', async ({ page }) => {
  await page.goto('/dataflow/proofbench');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(/项目工作台|Project workspace/)).toBeVisible();
  await expect(page.getByText(/运行中心|Run center/)).toBeVisible();
  await expect(page.getByText(/结果中心|Results center/)).toBeVisible();
  await expect(page.getByText(/治理视角|Governance lane/)).toBeVisible();
});
```

- [ ] **Step 2: Run the focused test to establish a baseline before module extraction**

Run: `cd web && npx playwright test -g "operational sections"`
Expected: PASS before refactor, so later failures indicate extraction regressions.

- [ ] **Step 3: Extract section-level panels and a shared view model contract**

```ts
// DataFlow/proofbench/lib/view-model.ts
export type BenchmarkOpsViewModel = {
  selectedProjectId: string | null;
  selectedItemId: string | null;
  activeAdminView: 'projects' | 'results' | 'governance';
};
```

```tsx
// DataFlow/proofbench/modules/projects/projects-panel.tsx
'use client';

export default function ProjectsPanel() {
  return <section data-section="projects" />;
}
```

```tsx
// DataFlow/proofbench/modules/runs/runs-panel.tsx
'use client';

export default function RunsPanel() {
  return <section data-section="runs" />;
}
```

- [ ] **Step 4: Move the corresponding JSX blocks out of `PlatformConsole` one domain at a time**

```tsx
// DataFlow/proofbench/ui/benchmarkops-shell.tsx
import ProjectsPanel from '../modules/projects/projects-panel';
import SourcesPanel from '../modules/sources/sources-panel';
import ItemsPanel from '../modules/items/items-panel';
import RunsPanel from '../modules/runs/runs-panel';
import ResultsPanel from '../modules/results/results-panel';
import GovernancePanel from '../modules/governance/governance-panel';

export default function BenchmarkOpsShell() {
  return (
    <div className="space-y-6">
      <ProjectsPanel />
      <SourcesPanel />
      <ItemsPanel />
      <RunsPanel />
      <ResultsPanel />
      <GovernancePanel />
    </div>
  );
}
```

- [ ] **Step 5: Shrink `PlatformConsole` into either a temporary adapter or remove it once the shell owns composition**

```tsx
// web/src/components/platform/platform-console.tsx
export { default } from '@dataflow/proofbench/ui/benchmarkops-shell';
```

- [ ] **Step 6: Run build and the focused route regression test after each extraction wave**

Run: `cd web && npm run build && npx playwright test -g "operational sections"`
Expected: PASS throughout the extraction.

- [ ] **Step 7: Commit the module split**

```bash
git add DataFlow/proofbench/modules DataFlow/proofbench/lib/view-model.ts DataFlow/proofbench/ui/benchmarkops-shell.tsx web/src/components/platform/platform-console.tsx web/tests/e2e/marketing-site.spec.ts
git commit -m "refactor: split benchmarkops console into modules"
```

### Task 4: Update all platform links and brand references to `/dataflow/proofbench`

**Files:**
- Modify: `web/src/components/shared/site-header.tsx`
- Modify: `web/src/components/shared/site-footer.tsx`
- Modify: `web/src/components/marketing/primitives.tsx`
- Modify: `web/src/components/marketing/home-page.tsx`
- Modify: `web/src/components/home/hero.tsx`
- Modify: `web/src/components/home/sample-preview.tsx`
- Modify: `web/src/components/home/capability-grid.tsx`
- Modify: `web/src/lib/marketing.ts`
- Modify: `web/src/lib/i18n.ts`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Update the route constant in tests so all canonical-link assertions point to the new path**

```ts
// web/tests/e2e/marketing-site.spec.ts
await expect(page.locator('a[href="/dataflow/proofbench"]').first()).toBeVisible();
```

- [ ] **Step 2: Run the targeted test to verify the current links still point to the old route**

Run: `cd web && npx playwright test -g "motion hooks"`
Expected: FAIL or require updates because links still reference `/proofbench`.

- [ ] **Step 3: Replace all hard-coded `/proofbench` links with the new canonical path**

```tsx
// web/src/components/shared/site-header.tsx
<Link href="/dataflow/proofbench" className={isMarketingRoute ? 'mkt-button-secondary mkt-button-compact' : 'mkt-button-primary mkt-button-compact'}>
  {copy.common.workbenchCta}
</Link>
```

```tsx
// web/src/components/shared/site-footer.tsx
<Link href="/dataflow/proofbench" className="mkt-button-secondary mkt-button-compact">
  {copy.common.workbenchCta}
</Link>
```

```tsx
// web/src/components/marketing/primitives.tsx
<Link href="/dataflow/proofbench" className="mkt-button-secondary inline-flex w-fit">{workbenchCta}</Link>
```

- [ ] **Step 4: Update brand-facing copy so the platform is named consistently as `WanFlow BenchmarkOps`**

```ts
// web/src/lib/marketing.ts
workbenchCta: '进入 WanFlow BenchmarkOps',
finalSecondary: '查看 WanFlow BenchmarkOps',
workbenchNote: 'WanFlow BenchmarkOps 作为内部平台持续提供执行证明层。',
```

```ts
// web/src/lib/i18n.ts
navWorkbench: 'WanFlow BenchmarkOps',
workbenchBadge: 'WanFlow BenchmarkOps 企业工作台',
systemCta: '进入 WanFlow BenchmarkOps',
```

- [ ] **Step 5: Run build and the Playwright suite to verify every visible entry points to the canonical route**

Run: `cd web && npm run build && npm run test:e2e`
Expected: PASS, with screenshots now showing `/dataflow/proofbench` links.

- [ ] **Step 6: Commit the canonical-link migration**

```bash
git add web/src/components/shared/site-header.tsx web/src/components/shared/site-footer.tsx web/src/components/marketing/primitives.tsx web/src/components/marketing/home-page.tsx web/src/components/home/hero.tsx web/src/components/home/sample-preview.tsx web/src/components/home/capability-grid.tsx web/src/lib/marketing.ts web/src/lib/i18n.ts web/tests/e2e/marketing-site.spec.ts
git commit -m "refactor: point benchmarkops links to dataflow route"
```

### Task 5: Remove the legacy `/proofbench` route and legacy proofbench API line

**Files:**
- Delete: `web/src/app/proofbench/page.tsx`
- Delete: `web/src/app/api/proofbench/run/route.ts`
- Delete: `web/src/app/api/proofbench/download/route.ts`
- Delete: `web/src/components/proofbench/proofbench-workbench.tsx`
- Delete: `web/src/components/proofbench/config-panel.tsx`
- Delete: `web/src/components/proofbench/summary-cards.tsx`
- Delete: `web/src/components/proofbench/run-matrix.tsx`
- Delete: `web/src/components/proofbench/answer-inspector.tsx`
- Delete: `web/src/components/proofbench/validation-rail.tsx`
- Delete: `web/src/components/proofbench/export-panel.tsx`
- Modify: `web/src/lib/proofbench.ts`
- Modify: `web/src/lib/proofbench.test.ts`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Add a negative route assertion so the old path is guaranteed to disappear**

```ts
// web/tests/e2e/marketing-site.spec.ts
test('legacy proofbench route is removed', async ({ page }) => {
  const response = await page.goto('/proofbench');
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 2: Run the focused legacy-route test and verify it fails before deletion**

Run: `cd web && npx playwright test -g "legacy proofbench route is removed"`
Expected: FAIL because `/proofbench` still exists.

- [ ] **Step 3: Delete the old route and legacy API endpoints**

```bash
rm web/src/app/proofbench/page.tsx
rm web/src/app/api/proofbench/run/route.ts
rm web/src/app/api/proofbench/download/route.ts
```

- [ ] **Step 4: Delete the unused legacy component tree after migrating any reusable presentation code**

```bash
rm web/src/components/proofbench/proofbench-workbench.tsx
rm web/src/components/proofbench/config-panel.tsx
rm web/src/components/proofbench/summary-cards.tsx
rm web/src/components/proofbench/run-matrix.tsx
rm web/src/components/proofbench/answer-inspector.tsx
rm web/src/components/proofbench/validation-rail.tsx
rm web/src/components/proofbench/export-panel.tsx
```

- [ ] **Step 5: Clean the old proofbench library so it only exports shared artifact helpers still used by the formal platform**

```ts
// web/src/lib/proofbench.ts
// Keep only framework artifact conversion helpers that are still consumed by
// the formal platform and delete helpers that existed only for the old route.
export { buildArtifactFromFrameworkJson, deriveRunNote, deriveRunStatus };
```

- [ ] **Step 6: Run build and the focused legacy-route test**

Run: `cd web && npm run build && npx playwright test -g "legacy proofbench route is removed"`
Expected: PASS with `/proofbench` returning 404.

- [ ] **Step 7: Commit the legacy-removal cut**

```bash
git add web/src/app/api/proofbench web/src/app/proofbench web/src/components/proofbench web/src/lib/proofbench.ts web/src/lib/proofbench.test.ts web/tests/e2e/marketing-site.spec.ts
git commit -m "refactor: remove legacy proofbench route and api"
```

### Task 6: Tighten the product-specific Playwright coverage around the new formal route

**Files:**
- Modify: `web/tests/e2e/marketing-site.spec.ts`
- Create: `web/tests/e2e/benchmarkops-route.spec.ts`
- Test: `web/playwright.config.ts`

- [ ] **Step 1: Create a dedicated e2e spec for the formal platform route instead of overloading the marketing smoke test**

```ts
// web/tests/e2e/benchmarkops-route.spec.ts
import { expect, test } from '@playwright/test';

test('dataflow benchmarkops route renders without overflow on desktop', async ({ page }) => {
  await page.goto('/dataflow/proofbench');
  await page.waitForLoadState('networkidle');
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
  expect(overflow).toBeLessThanOrEqual(1);
});
```

- [ ] **Step 2: Add a mobile smoke for the formal route**

```ts
// web/tests/e2e/benchmarkops-route.spec.ts
test('dataflow benchmarkops route renders on mobile', async ({ page }) => {
  await page.goto('/dataflow/proofbench');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('[data-product="wanflow-benchmarkops"]')).toBeVisible();
});
```

- [ ] **Step 3: Keep the marketing spec focused on the marketing surface only**

```ts
// web/tests/e2e/marketing-site.spec.ts
const desktopPages = [
  { name: 'home', path: '/' },
  { name: 'solutions', path: '/solutions' },
  { name: 'cases', path: '/cases' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
] as const;
```

- [ ] **Step 4: Run the full Playwright suite and inspect the HTML report**

Run: `cd web && npm run test:e2e && npm run test:e2e:report`
Expected: PASS, with separate reporting for marketing and formal platform coverage.

- [ ] **Step 5: Commit the updated regression coverage**

```bash
git add web/tests/e2e/marketing-site.spec.ts web/tests/e2e/benchmarkops-route.spec.ts web/playwright.config.ts
git commit -m "test: add benchmarkops route regression coverage"
```

### Task 7: Final verification and cleanup

**Files:**
- Modify: `README.md`
- Modify: `docs/project-status-and-roadmap.md`
- Test: `web/package.json`

- [ ] **Step 1: Update the repo-level docs so the canonical internal-platform route is visible to future maintainers**

```md
<!-- README.md -->
- Official internal platform: `/dataflow/proofbench`
- Official product name: `WanFlow BenchmarkOps`
- Legacy `/proofbench` route removed on 2026-04-09
```

- [ ] **Step 2: Update project-status documentation to reflect the consolidation**

```md
<!-- docs/project-status-and-roadmap.md -->
- Internal platform canonicalized under `DataFlow/proofbench`
- Legacy `proofbench` frontend and API removed
- Marketing site now links to `/dataflow/proofbench`
```

- [ ] **Step 3: Run the complete verification set**

Run: `cd web && npm run build && npm run test:e2e`
Expected: PASS.

Run: `cd web && PORT=3410 npm run start`
Expected: app boots successfully on port 3410.

Run: `curl -I http://127.0.0.1:3410/dataflow/proofbench`
Expected: `HTTP/1.1 200 OK`

Run: `curl -I http://127.0.0.1:3410/proofbench`
Expected: `HTTP/1.1 404 Not Found`

- [ ] **Step 4: Commit the documentation and verification pass**

```bash
git add README.md docs/project-status-and-roadmap.md
git commit -m "docs: record benchmarkops canonical route"
```
