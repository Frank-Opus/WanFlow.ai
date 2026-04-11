# Repository Guidelines

## Project Structure & Module Organization
`src/math_eval_framework/` contains the Python evaluation engine and CLI. Keep parsing, scoring, model calls, and export logic here. `tests/` holds backend `pytest` coverage. `web/src/` is the Next.js 15 App Router frontend; place route files under `web/src/app/`, shared UI under `web/src/components/`, and browser/server helpers under `web/src/lib/`. `web/tests/e2e/` contains Playwright flows and visual checks. `DataFlow/proofbench/` stores shared product modules imported through `@dataflow/*`. Treat `platform-data/` as runtime state, not source.

## Build, Test, and Development Commands
From the repo root:

- `python3 -m pip install -e .` installs the Python package in editable mode.
- `python3 -m pytest tests -q` runs backend tests.
- `docker build -t wanflow-web:local .` builds the production image.

From `web/`:

- `npm install` installs frontend dependencies.
- `npm run dev` starts local development.
- `npm run build` creates the production build.
- `npm run test:unit` runs TypeScript unit tests with `tsx --test`.
- `npm run test:e2e -- --workers=1` runs Playwright end-to-end coverage.
- `npm run audit:lighthouse` runs the Lighthouse quality gate.

## Coding Style & Naming Conventions
Follow existing file style because no repo-wide formatter or linter config is checked in. Use 4-space indentation in Python, 2-space indentation in TypeScript/JSON/CSS. Prefer type hints in Python and keep TypeScript compatible with `strict: true`. Use `snake_case` for Python modules and functions, `PascalCase` for React components, and `camelCase` for hooks and helpers. Keep backend execution in Python; do not move engine logic into Next.js handlers.

## Testing Guidelines
Name backend tests `tests/test_*.py`, frontend unit tests `*.test.ts` or `*.test.tsx`, and Playwright specs `web/tests/e2e/*.spec.ts`. Run the smallest relevant test first, then the broader suite. UI, routing, or auth changes should be validated with `npm run build`, `npm run test:unit`, and Playwright.

## Commit & Pull Request Guidelines
Git history uses Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`. Keep subjects short and imperative, for example `fix: isolate e2e and lighthouse servers`. PRs should summarize impacted areas, list commands run, link related issues or docs, and include screenshots for visible frontend changes. Do not commit generated artifacts such as `web/.next/`, `web/node_modules/`, Playwright reports, or runtime data under `platform-data/`.
