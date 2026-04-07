# WanFlow Marketing Website Redesign

Date: 2026-04-07
Status: Approved in conversation, pending final spec review
Scope: `web/src/app/*`, `web/src/components/marketing/*`, `web/src/components/shared/*`, `web/src/lib/marketing.ts`, global marketing styles

## 1. Goal

Redesign the current WanFlow marketing website so it more closely follows the ClickHouse reference template in structure, rhythm, and brand intensity, while keeping WanFlow's own identity, business positioning, and bilingual support.

This redesign is not a light polish. It is a structural reset of the marketing site.

The new site should:

- feel closer to a modern technology brand than a generic service website,
- keep WanFlow's enterprise-service warmth,
- present WanFlow as a data-driven AI company with system-level delivery capability,
- default to Chinese, with English still available,
- replace the current dark-near-black direction with a brighter fog-blue visual system.

## 2. Approved Direction

The following decisions were confirmed during the discussion:

- Template fidelity: stay as close as possible to the ClickHouse design's layout skeleton, pacing, and editorial tone.
- Brand temperament: blend infrastructure-grade credibility with service-company warmth.
- Homepage hero density: use a brand-statement hero with minimal copy.
- BenchmarkOps visibility: show it in the middle or later sections as a proof layer, not as the homepage lead.
- Language balance: Chinese-first. English remains secondary and supportive.
- Background direction: do not use a black background.
- Color direction: use the fog-blue option, which is brighter, cleaner, and more brand-like than the current dark scheme.

## 3. Brand Positioning to Express

The site must clearly communicate that WanFlow is:

- a data-driven AI company,
- an execution partner for enterprise AI delivery,
- strong in AI data labeling, automated data processing, workflow automation, Process as a Service, and model operations,
- focused on turning fragmented AI work into stable, repeatable, operational systems.

The site should not read like a pure software product landing page.
It should also not read like a generic consulting firm site.
It should sit between the two: a system-minded AI delivery brand.

## 4. Reference Translation Strategy

The ClickHouse reference is not being copied color-for-color or word-for-word.
Instead, the redesign should borrow these qualities:

- large, assertive typographic hierarchy,
- strong section segmentation,
- editorial pacing with clear narrative build-up,
- infrastructure-brand confidence,
- fewer soft SaaS cards and more deliberate structural blocks,
- a homepage that starts with a brand claim before expanding into systems, modules, proof, and conversion.

WanFlow-specific adaptation:

- use Chinese as the primary reading experience,
- frame services as system modules rather than isolated offerings,
- keep enterprise communication warm and concrete,
- replace heavy black with light fog-blue surfaces and deep blue-gray accents.

## 5. Visual System

### 5.1 Core Palette

Primary visual direction: fog-blue, not black.

Suggested token intent:

- page base: fog blue / mist blue,
- secondary surface: soft blue-gray,
- strong contrast surface: desaturated deep blue,
- primary accent: data cyan,
- secondary accent: mineral teal,
- limited proof accent: restrained evidence gold only where needed.

The new palette should feel:

- bright but not airy,
- premium but not luxury-fashion,
- technological but not crypto-like,
- structured and calm.

### 5.2 Background Philosophy

The site should move away from a near-black UI shell.
Instead, it should rely on:

- pale fog-blue large backgrounds,
- alternating light and mid-tone bands,
- occasional deep blue-gray sections for emphasis,
- crisp borders, separators, and panel edges instead of glow-heavy effects.

### 5.3 Typography

Typography should carry much of the site's authority.

- Chinese headlines should be oversized, tight, and poster-like.
- Body copy should remain concise and highly readable.
- English should appear only as small helper labels or technical tags.
- Avoid dual-language headline stacking.

### 5.4 Component Feel

Components should feel firmer and more architectural than the current design.

- fewer rounded, soft SaaS cards,
- stronger borders and dividers,
- clearer sectional edges,
- more contrast between dense blocks and breathing room.

## 6. Homepage Design

The homepage should follow this narrative sequence.

### 6.1 Hero

Purpose:

- establish WanFlow as a serious AI delivery brand immediately,
- avoid explaining everything in the first screen,
- create a brand statement rather than a sales checklist.

Structure:

- oversized Chinese headline,
- short supporting paragraph,
- two CTAs,
- a small set of supporting signals on the side or below.

The hero must not become a crowded service summary.

### 6.2 Platform View Section

This section should explain that WanFlow does not sell isolated tasks.
It organizes data, process, and model operations into one execution chain.

This is the conceptual bridge between the hero and the services.

### 6.3 Five Capability Modules

The five service areas should be reframed as system modules:

- AI data labeling,
- automated data processing,
- workflow automation,
- Process as a Service,
- model operations.

These modules should not look like a standard pricing/features grid.
They should feel like parts of an operating structure.

### 6.4 Delivery Framework

The existing delivery logic should be kept, but redesigned as a stronger architecture-like sequence:

- diagnose bottlenecks,
- define the execution skeleton,
- run the delivery chain,
- continue operations and improvement.

### 6.5 Proof Layer

BenchmarkOps and related internal-platform credibility should appear here.

This section should:

- support trust,
- show operational maturity,
- avoid competing with the WanFlow brand itself.

### 6.6 Cases and Final CTA

The final stretch of the homepage should include:

- anonymized case previews,
- clear outcomes,
- a clean final CTA to contact or explore solutions.

## 7. Solutions Page

The solutions page should shift from listing services to explaining a system.

Target structure:

1. Open with the problem: enterprise AI delivery becomes fragile when data, process, and model operations are disconnected.
2. Present a three-layer architecture:
   - Data Foundation
   - Process Layer
   - Model Operations
3. Expand the five modules using:
   - when it applies,
   - what WanFlow delivers,
   - what business result it creates.
4. Close with trigger scenarios and the delivery model.

The visual style should read more like a system architecture narrative than a conventional service brochure.

## 8. Cases Page

The cases page should become more evidence-oriented.

Each case should follow a common structure:

- context,
- problem,
- execution method,
- result.

The tone should avoid marketing fluff.
It should feel like anonymized delivery slices from real operational work.

## 9. About Page

The about page should answer what kind of company WanFlow is before it tells a generic company story.

It should frame WanFlow as:

- a data-driven AI company,
- an operational execution partner,
- a team that builds delivery systems, not only strategies.

Instead of conventional company-profile padding, the page should center on:

- positioning,
- working philosophy,
- execution mindset,
- system-building capability.

## 10. Contact Page

The contact page should remain simple, but not generic.

Recommended structure:

- left side: a concise brand statement explaining what kind of conversations WanFlow is best suited for,
- right side: contact card and form,
- consistent visual system with the rest of the site.

It should feel like the last step of the brand journey, not a detached utility page.

## 11. Localization

Localization strategy remains bilingual, with Chinese as default.

Rules:

- Chinese pages carry the primary design voice.
- English should stay available through the existing language switch.
- Visual hierarchy should be designed for Chinese first, then adapted to English.
- Avoid layouts that only work because English is short.

## 12. Responsive Behavior

The redesign must work on desktop and mobile.

Responsive intent:

- preserve large-brand headline impact on mobile without causing awkward wraps,
- simplify sidecar proof content on smaller screens,
- keep section hierarchy obvious even when grids collapse,
- maintain strong CTA visibility without crowding the hero.

## 13. Content Style

Copy should be:

- concrete,
- operational,
- business-aware,
- free of inflated AI clichés.

Avoid language that sounds like:

- vague innovation branding,
- generic digital transformation consulting,
- overblown AI futurism.

Prefer language that points to:

- execution,
- delivery,
- systems,
- process control,
- measurable operational outcomes.

## 14. Non-Goals

This redesign does not aim to:

- turn the site into a product dashboard,
- foreground BenchmarkOps above WanFlow,
- imitate ClickHouse color choices,
- keep the current page structures unchanged,
- add unnecessary motion or decorative visual effects.

## 15. Implementation Implications

Expected implementation impact:

- homepage structure will be substantially rewritten,
- all five marketing pages will be visually and structurally realigned,
- shared header, footer, primitives, and copy organization will likely need changes,
- global marketing tokens and section styles will need consolidation.

This work should be treated as a redesign pass, not a small refactor.

## 16. Acceptance Criteria

The redesign is successful when:

- the site feels visibly closer to the ClickHouse reference in structure and pacing,
- the brand still reads as WanFlow rather than ClickHouse,
- the background is no longer near-black,
- the homepage reads as a strong brand narrative rather than a service list,
- the five pages feel like one coherent system,
- Chinese is the strongest version of the experience,
- BenchmarkOps supports trust without dominating the brand story.
