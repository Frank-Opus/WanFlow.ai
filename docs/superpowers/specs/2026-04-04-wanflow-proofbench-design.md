# WanFlow.ai + ProofBench Design

**Product:** `WanFlow.ai`
**Primary module:** `ProofBench`
**Audience assumption:** External customers first, shared product workspace second.

## Goal
Build a premium website plus product workspace that visualizes the existing math-evaluation framework. The site needs a branded marketing homepage and a polished evaluation workbench that makes the QF3 sample, multi-run benchmark results, and export flow legible to technical buyers and internal operators.

## Product structure
- `/` marketing homepage for WanFlow.ai
- `/proofbench` product workbench for benchmark configuration and results
- optional drill-down sections inside the same page for item schema, run matrix, validation rules, and export assets

## Experience direction
- Editorial-tech rather than generic SaaS dashboard
- Dark graphite base, controlled green status accents, luminous panels, restrained motion
- Strong typography hierarchy and premium spacing
- Dense information in the workbench, high narrative clarity on the homepage

## Core homepage sections
1. Hero: WanFlow.ai positioning with direct entry into ProofBench
2. Capability rail: structure data -> benchmark models -> inspect outputs -> export artifacts
3. Benchmark story: explain repeated evaluation and correctness scoring
4. Sample showcase: QF3 item preview and result snippets
5. CTA footer: enter workbench

## Core workbench sections
1. Left rail / top controls: dataset item, endpoint, model, run count, concurrency
2. Benchmark summary cards: runs, correct count, accuracy, response latency band
3. Run matrix: eight runs with answer, verdict, parse status, latency
4. Answer inspector: reference answer versus predicted answer
5. Validation rail: dataset-rule checks from the JSON schema
6. Export area: JSON/XLSX assets and workbook shape preview

## Data model
Frontend initially consumes static artifacts already available in workspace:
- `examples/qf3_item.json`
- `qf3_smoke_test.json`
- `demo_2026.4.2(1).xlsx`
- generated workbook/json results later

No backend write flow is required for V1. UI can simulate “run benchmark” by loading prepared data and surfacing configuration state.

## Technical approach
- Build a standalone Next.js app in `web/`
- Use React + TypeScript + Tailwind CSS
- Keep content/data in local `web/src/data/`
- Use lightweight reusable sections/components under `web/src/components/`
- Keep routes minimal: homepage + proofbench page

## Acceptance criteria
- Distinctive premium visual design, clearly non-template
- Homepage and workbench both render and build successfully
- ProofBench clearly represents the existing evaluation framework and output schema
- The UI surfaces 8-run repeated evaluation, accuracy, and export artifacts
- Desktop and mobile both work
