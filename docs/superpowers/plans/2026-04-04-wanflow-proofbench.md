# WanFlow.ai + ProofBench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium WanFlow.ai marketing site plus a ProofBench evaluation workbench that visualizes the existing math evaluation framework and its 8-run benchmark outputs.

**Architecture:** A standalone Next.js app in `web/` serves two routes: a branded homepage and a data-rich ProofBench workspace. Static local data files mirror the current Python framework outputs, and reusable UI components separate narrative sections, benchmark metrics, run inspection, and export assets.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, local JSON data, npm

---

### Task 1: Scaffold the web app and baseline styling

**Files:**
- Create: `web/package.json`
- Create: `web/tsconfig.json`
- Create: `web/next.config.ts`
- Create: `web/postcss.config.js`
- Create: `web/tailwind.config.ts`
- Create: `web/src/app/layout.tsx`
- Create: `web/src/app/globals.css`
- Create: `web/src/app/page.tsx`
- Create: `web/src/app/proofbench/page.tsx`
- Test: `web` build command

- [ ] **Step 1: Write the failing build expectation**

Document target command: `cd web && npm run build`
Expected: FAIL because `web/` app does not exist yet.

- [ ] **Step 2: Run the missing-app check**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric && test -d web`
Expected: exit code `1` / directory missing.

- [ ] **Step 3: Create the Next.js baseline**

Create a minimal App Router setup with Tailwind configured, route files present, and global theme tokens for graphite background, green status accent, glass panels, and editorial typography.

- [ ] **Step 4: Run install and build**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm install && npm run build`
Expected: PASS.

### Task 2: Add structured static data and transformation helpers

**Files:**
- Create: `web/src/data/proofbench.ts`
- Create: `web/src/lib/format.ts`
- Test: `web/src/lib/format.ts` via project build

- [ ] **Step 1: Write the failing module expectation**

Target imports from `web/src/app/proofbench/page.tsx` should fail before helper files exist.

- [ ] **Step 2: Create normalized static data**

Read and encode the current workspace artifacts into typed frontend data for:
- product stats
- item schema
- validation results
- 8-run matrix
- export files

- [ ] **Step 3: Add formatting helpers**

Create compact helpers for percentages, latency strings, verdict badges, and JSON preview snippets.

- [ ] **Step 4: Re-run build**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run build`
Expected: PASS.

### Task 3: Build the WanFlow.ai homepage

**Files:**
- Create: `web/src/components/home/hero.tsx`
- Create: `web/src/components/home/capability-grid.tsx`
- Create: `web/src/components/home/story-band.tsx`
- Create: `web/src/components/home/sample-preview.tsx`
- Modify: `web/src/app/page.tsx`
- Test: homepage build

- [ ] **Step 1: Write the failing import expectation**

Target `web/src/app/page.tsx` should fail if homepage components are imported before they exist.

- [ ] **Step 2: Implement homepage sections**

Build a premium homepage with:
- strong hero copy for WanFlow.ai
- product narrative for structured evaluation
- visible ProofBench entry point
- sample result teaser using QF3 benchmark data

- [ ] **Step 3: Verify homepage compiles**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run build`
Expected: PASS.

### Task 4: Build the ProofBench workbench UI

**Files:**
- Create: `web/src/components/proofbench/config-panel.tsx`
- Create: `web/src/components/proofbench/summary-cards.tsx`
- Create: `web/src/components/proofbench/run-matrix.tsx`
- Create: `web/src/components/proofbench/answer-inspector.tsx`
- Create: `web/src/components/proofbench/validation-rail.tsx`
- Create: `web/src/components/proofbench/export-panel.tsx`
- Modify: `web/src/app/proofbench/page.tsx`
- Test: workbench build

- [ ] **Step 1: Write the failing import expectation**

Target `web/src/app/proofbench/page.tsx` should fail if workbench components are imported before creation.

- [ ] **Step 2: Implement the workbench**

Build a dense, polished workspace that shows:
- benchmark controls
- 8-run evaluation matrix
- answer comparison
- validation checks
- export assets

- [ ] **Step 3: Verify build passes**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run build`
Expected: PASS.

### Task 5: Final QA and deliverable checks

**Files:**
- Modify: `web/src/app/globals.css`
- Modify: `web/src/app/page.tsx`
- Modify: `web/src/app/proofbench/page.tsx`
- Test: full production build

- [ ] **Step 1: Run full production verification**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run build`
Expected: PASS with no route errors.

- [ ] **Step 2: Run local smoke preview**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web && npm run dev`
Expected: local app starts and routes `/` and `/proofbench` render.

- [ ] **Step 3: Tighten visual polish**

Adjust spacing, contrast, motion, and responsive behavior until homepage and workbench look intentional on desktop and mobile.
