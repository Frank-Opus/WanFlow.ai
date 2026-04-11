# WanFlow Homepage Capability Modules Design

## Goal
Refresh the homepage capability section so enterprise buyers can understand WanFlow's offer quickly, while still reflecting the company's real delivery stack and differentiated AI execution model.

## Approved Direction
Use a balanced enterprise style:
- module titles stay business-readable for traditional B-end decision makers
- supporting copy carries the deeper technical and operational meaning
- `智能体` appears explicitly, but framed as enterprise execution capability rather than AI hype

## Module Set
Section eyebrow remains capability-oriented.

Section title:
`五个模块，一套持续进化的交付闭环`

Section body:
Explain that the five modules are not isolated services, but connected parts of one delivery system that can keep running, improving, and proving results over time.

Homepage modules:
1. `数据标注与治理`
2. `流程编排与自动化`
3. `企业级智能体`
4. `人机协同交付`
5. `模型运营与持续优化`

## Positioning Logic
`数据标注与治理` keeps WanFlow's data foundation visible without splitting data into two separate homepage modules.

`流程编排与自动化` covers workflow design, orchestration, system actions, and execution stability.

`企业级智能体` makes AI agent capability explicit, but should emphasize safety, stability, controllability, and task execution in the supporting text rather than overloading the title.

`人机协同交付` captures WanFlow's real delivery model: AI handles repeatable execution, while people provide judgment, review, exception handling, and delivery assurance.

`模型运营与持续优化` closes the loop and carries the ideas of feedback, iteration, evolution, and long-term business operation.

## Copy Guidance
Avoid abstract consulting language and avoid sounding like a generic AI tools vendor.

Prefer:
- clear verbs
- delivery language
- process and operational clarity
- enterprise trust signals such as stability, safety, review, and repeatability

Avoid:
- stacked buzzwords
- long noun-heavy titles
- repeating the same idea across adjacent modules

## Implementation Scope
Update the Chinese homepage capability module section in `web/src/lib/marketing.ts`.

If needed, align the same module naming in related solution-page summary copy, but do not reintroduce BenchmarkOps onto the homepage.
