# WanFlow BenchmarkOps DataFlow Restructure Design

Date: 2026-04-09
Status: Approved in conversation, pending written spec review
Scope: `web/src/app/*`, `web/src/components/platform/*`, `web/src/components/proofbench/*`, `web/src/app/api/platform/*`, `web/src/app/api/proofbench/*`, new `DataFlow/proofbench/*`, marketing links into the internal platform

## 1. Goal

Turn the current internal platform into one clear, official product surface.

After this restructure:

- the official product name is `WanFlow BenchmarkOps`,
- the official public path is `/dataflow/proofbench`,
- the old `/proofbench` route is removed with no compatibility layer,
- the official implementation lives under `DataFlow/proofbench`,
- the current split between `platform` and legacy `proofbench` code is removed,
- the codebase reads like one product, not a historical pile of experiments.

This is a structural consolidation, not a visual polish.
The purpose is to make the product easier to understand, easier to maintain, and easier to extend.

## 2. Confirmed Decisions

The following decisions were confirmed during the discussion:

- The internal platform is now the formal product version, not a demo.
- The formal product name is `WanFlow BenchmarkOps`.
- The formal public URL is `/dataflow/proofbench`.
- The old `/proofbench` URL should be deleted, not redirected.
- The formal implementation directory should live under `DataFlow/proofbench`.
- This should be a deep overall refactor, not a superficial rename.
- Structure should be unified even if that requires deleting old paths and consolidating modules.

## 3. Product and Routing Model

### 3.1 Official Product Identity

The product should be described consistently as:

- `WanFlow BenchmarkOps` in titles, labels, and internal references,
- WanFlow's internal benchmark and evaluation platform in supporting copy,
- the operational system behind the marketing site's proof layer.

The product should no longer be framed as a provisional workbench or an isolated experiment.

### 3.2 Official Route

The official product route becomes:

- `/dataflow/proofbench`

This route is the only supported public entry point for the platform.

### 3.3 Route Removal

The old route:

- `/proofbench`

should be removed entirely.

This project does not need a redirect page, compatibility screen, or soft transition.
The goal is to enforce one canonical path immediately.

### 3.4 Marketing Integration

All marketing-site links that currently point to `/proofbench` should be updated to point to `/dataflow/proofbench`.
This includes:

- header and footer shortcuts,
- homepage proof-layer CTA,
- homepage final CTA,
- any legacy homepage preview links,
- any localized labels that still encode the old route assumption.

## 4. Codebase Restructure Direction

### 4.1 Target Implementation Root

The official implementation should live under:

- `DataFlow/proofbench`

This directory becomes the product root for the internal platform's formal UI composition and product-facing module structure.

The Next.js route file in the web app should only mount this formal implementation.

### 4.2 Route Layer Responsibility

`web/src/app/dataflow/proofbench/page.tsx` should be a thin entry shell.
It should not hold platform business logic.
Its job is to mount the formal `WanFlow BenchmarkOps` implementation from `DataFlow/proofbench`.

### 4.3 Legacy Route Removal

The following route should be deleted:

- `web/src/app/proofbench/page.tsx`

No redirect and no compatibility wrapper are needed.

## 5. Architecture Consolidation

### 5.1 Current Structural Problem

The platform currently has two competing lines of implementation:

1. the newer project-based platform centered around `PlatformConsole` and `/api/platform/*`,
2. the older `proofbench` workbench and `/api/proofbench/*` legacy stack.

This split creates confusion in naming, routing, ownership, and maintenance.
It also makes the platform look less finished than it actually is.

### 5.2 Target Structural Outcome

After the refactor, there should be one product line only:

- one formal name,
- one formal route,
- one formal implementation root,
- one formal UI composition model,
- one formal backend API surface.

That means the code should stop presenting `platform` and legacy `proofbench` as peers.
They should become one unified product implementation.

## 6. Frontend Module Boundaries

The large current platform UI should be split into stable product modules.
The goal is not arbitrary decomposition. The goal is clear responsibilities.

### 6.1 Target Module Layout

Suggested structure inside `DataFlow/proofbench`:

- `DataFlow/proofbench/index.ts`
  - public entry for the product implementation
- `DataFlow/proofbench/ui/`
  - product shell, section layout, high-level composition
- `DataFlow/proofbench/modules/projects/`
  - project list, project creation, current project selection
- `DataFlow/proofbench/modules/sources/`
  - source upload, folder import, source status, source artifact links
- `DataFlow/proofbench/modules/items/`
  - problem item list, item creation, selected item detail
- `DataFlow/proofbench/modules/runs/`
  - run config, sync/async execution, diagnostics, run trigger actions
- `DataFlow/proofbench/modules/results/`
  - run results, artifact playback, downloads, result summaries
- `DataFlow/proofbench/modules/governance/`
  - members, roles, governance summaries, delivery readiness indicators
- `DataFlow/proofbench/lib/`
  - constants, localized copy, adapters, request wrappers, selectors
- `DataFlow/proofbench/types/`
  - product-facing type exports and normalized product contracts

### 6.2 Existing Frontend Sources to Consolidate

The following current sources should be consolidated into the new structure:

- `web/src/components/platform/*`
- any reusable pieces from `web/src/components/proofbench/*`

The rule is simple:

- keep what supports the official product,
- migrate what is useful,
- delete what only exists for the legacy proofbench flow.

### 6.3 Large File Reduction

`PlatformConsole` currently carries too many responsibilities in one file.
This refactor should explicitly reduce that concentration.

The resulting product shell should separate:

- view composition,
- local state and selection logic,
- network actions,
- rendering of individual operational domains,
- localized copy and labels.

## 7. API Consolidation

### 7.1 Official API Surface

The official backend API surface should remain:

- `/api/platform/*`

These routes already model the product in terms of projects, source files, problem items, benchmark runs, and artifacts.
That model matches the intended product direction.

### 7.2 Legacy API Removal

The old legacy API surface:

- `/api/proofbench/*`

should be removed.

This project does not need to keep both route families alive.
The formal frontend implementation under `DataFlow/proofbench` should consume only the platform API surface.

### 7.3 Why API Renaming Is Out of Scope

This refactor does not need to rename `/api/platform/*` into `/api/dataflow/proofbench/*`.
That would expand the migration cost without solving the main product confusion.

The current confusion comes from the frontend and product structure, not from the API route prefix.
This refactor should solve the real source of disorder first.

## 8. Brand and Copy Unification

All internal-platform-facing UI copy should be standardized around `WanFlow BenchmarkOps`.

That includes:

- page titles,
- hero and summary labels,
- navigation labels,
- CTA labels,
- footer references,
- platform-related copy in the marketing site,
- any leftover wording that still sounds like a temporary proofbench demo.

The product may still be described as an internal platform, but it should not read like a provisional prototype.

## 9. Deletion Strategy

The following should be deleted as part of the consolidation:

- old `/proofbench` app route,
- old `/api/proofbench/*` routes,
- legacy `web/src/components/proofbench/*` implementation that is not reused,
- any stale marketing links that still target `/proofbench`.

This is deliberate.
The goal is to make the codebase and the runtime surface agree on one official product path.

## 10. Data and Storage Boundary

This refactor is structural. It is not a storage-layer rewrite.

The current local persistence model based on `platform-data/` can remain in place.
This round does not need to switch to a database, add authentication, or introduce multi-tenant infrastructure.

Those changes may come later, but they should not be coupled to this consolidation.

## 11. What This Refactor Will Do

This refactor will:

- establish `WanFlow BenchmarkOps` as the official product identity,
- move the official implementation into `DataFlow/proofbench`,
- expose the product at `/dataflow/proofbench`,
- remove the old `/proofbench` route entirely,
- update all marketing links to the new path,
- consolidate the platform frontend into clear product modules,
- keep `/api/platform/*` as the official backend surface,
- delete the old `/api/proofbench/*` legacy flow,
- reduce architectural ambiguity between the old and new product lines.

## 12. What This Refactor Will Not Do

This refactor will not:

- replace `platform-data/` with a production database,
- add authentication or account systems,
- add multi-tenant organization management,
- rewrite the Python benchmark framework,
- redesign the entire marketing information architecture.

Those are different projects.
This one is about making the current product official, coherent, and maintainable.

## 13. Acceptance Criteria

The refactor is successful when all of the following are true:

- `/dataflow/proofbench` is the only official platform route,
- `/proofbench` no longer exists,
- marketing links no longer reference `/proofbench`,
- the formal product implementation is mounted from `DataFlow/proofbench`,
- the frontend no longer relies on the old legacy `proofbench` module tree as a primary implementation,
- `/api/proofbench/*` is removed,
- `WanFlow BenchmarkOps` is used consistently across the platform-facing UI,
- the web app builds successfully,
- Playwright regression coverage is updated to the new route and passes,
- desktop and mobile access to the formal product route both work.

## 14. Risks to Manage During Implementation

- breaking existing internal links while removing `/proofbench`,
- migrating too much at once inside the large current platform UI,
- leaving hidden references to deleted legacy API routes,
- mixing route migration with unrelated visual redesign work,
- creating a new formal directory without truly removing the old ownership split.

The implementation plan should therefore prioritize incremental migration with repeated verification after each structural cut.
