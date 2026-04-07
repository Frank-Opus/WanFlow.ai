# WanFlow ClickHouse-Style Marketing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing WanFlow marketing website so it follows the approved ClickHouse-inspired structure and pacing, ships the new fog-blue visual system, and keeps bilingual support with Chinese as the primary experience.

**Architecture:** Keep the existing Next.js App Router structure and page entry points, but replace the marketing presentation layer. Centralize the new visual system in `globals.css`, reshape shared marketing primitives and navigation, then rebuild each marketing page around the approved narrative sequence. Keep the content source in `marketing.ts`, but rewrite the copy structure where needed so each page can render the new layout without hard-coded text.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind utility classes, custom global CSS tokens

---

## File Map

### Modify

- `web/src/app/globals.css`
  - Replace the current dark marketing token block with the approved fog-blue system, new section shells, new hero/layout utilities, and responsive behavior.
- `web/src/components/marketing/primitives.tsx`
  - Rework reusable marketing primitives so the new homepage and subpages share the same visual grammar.
- `web/src/components/shared/site-header.tsx`
  - Align header layout, top bar, nav links, and mobile menu with the brighter non-black redesign.
- `web/src/components/shared/site-footer.tsx`
  - Rebuild footer to match the new section rhythm and lighter surface system.
- `web/src/components/marketing/home-page.tsx`
  - Replace the current card-grid homepage with the approved brand-led narrative.
- `web/src/components/marketing/solutions-page.tsx`
  - Reframe the page around system architecture and module storytelling.
- `web/src/components/marketing/cases-page.tsx`
  - Rebuild the page into an evidence-oriented case narrative.
- `web/src/components/marketing/about-page.tsx`
  - Reposition the company around system-building and execution.
- `web/src/components/marketing/contact-page.tsx`
  - Keep the form, but redesign the surrounding layout and supporting content.
- `web/src/lib/marketing.ts`
  - Rewrite or expand the locale copy model so each page can render the new structure in Chinese and English.

### Review While Editing

- `web/src/components/marketing/contact-form.tsx`
  - Confirm the existing form still fits the new layout and token system.
- `web/src/app/page.tsx`
- `web/src/app/solutions/page.tsx`
- `web/src/app/cases/page.tsx`
- `web/src/app/about/page.tsx`
- `web/src/app/contact/page.tsx`
  - Entry points should not need structural changes, but verify imports still point to the updated components.

### Verification

- `web/package.json`
  - Use existing `build` script for production verification.

## Task 1: Rebuild the global marketing visual system

**Files:**
- Modify: `web/src/app/globals.css`
- Review: `web/src/components/shared/site-header.tsx`
- Review: `web/src/components/marketing/primitives.tsx`

- [ ] **Step 1: Snapshot the current marketing token and component class block**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
sed -n '430,820p' src/app/globals.css
```

Expected: the current block shows dark navy / cyan marketing classes such as `.mkt-panel`, `.mkt-button-primary`, `.site-header-shell`, and `.mkt-proof-panel`.

- [ ] **Step 2: Replace the dark marketing tokens with the fog-blue token set**

Update the marketing token block near the existing `--mk-*` variables in `web/src/app/globals.css` to follow this direction:

```css
:root {
  --mk-bg: #edf3f5;
  --mk-bg-alt: #e2ebef;
  --mk-surface-0: rgba(255, 255, 255, 0.92);
  --mk-surface-1: rgba(247, 250, 251, 0.96);
  --mk-surface-2: rgba(222, 232, 237, 0.9);
  --mk-surface-strong: #20394c;
  --mk-line-1: rgba(59, 88, 109, 0.14);
  --mk-line-2: rgba(44, 95, 128, 0.22);
  --mk-text-0: #12202b;
  --mk-text-1: #566b79;
  --mk-text-2: #738795;
  --mk-brand-1: #2f8fb8;
  --mk-brand-2: #44c4d9;
  --mk-brand-3: #2f9195;
  --mk-proof: #b78b45;
  --mk-shadow: 0 24px 70px rgba(18, 32, 43, 0.08);
}
```

Use the same naming convention already present in the file. Do not introduce a second competing token system.

- [ ] **Step 3: Replace the core marketing surface classes so they match the approved lighter layout**

Rewrite the marketing shell classes in `web/src/app/globals.css` so the base look is bright, structured, and non-black:

```css
.site-header-shell {
  border-bottom: 1px solid var(--mk-line-1);
  background: rgba(237, 243, 245, 0.88);
  backdrop-filter: blur(18px);
}

.marketing-main {
  position: relative;
  padding: 1.25rem 1rem 4rem;
}

.mkt-panel,
.mkt-card,
.mkt-case-card,
.mkt-proof-panel,
.mkt-form-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--mk-line-1);
  background: linear-gradient(180deg, var(--mk-surface-0), var(--mk-surface-1));
  box-shadow: var(--mk-shadow);
}

.mkt-panel-strong {
  background: linear-gradient(180deg, #dfe8ec, #edf3f5);
}
```

Keep the existing class names so the page components do not need a complete rewrite just to pick up the new surfaces.

- [ ] **Step 4: Add the new section-structure helpers required by the redesign**

Append reusable layout helpers to `web/src/app/globals.css`:

```css
.mkt-editorial-band {
  border-top: 1px solid var(--mk-line-1);
  border-bottom: 1px solid var(--mk-line-1);
  background: linear-gradient(180deg, rgba(223, 232, 236, 0.7), rgba(237, 243, 245, 0.35));
}

.mkt-split-callout {
  display: grid;
  gap: 1.25rem;
}

.mkt-rail-card {
  border-left: 2px solid rgba(44, 95, 128, 0.24);
  padding-left: 1rem;
}

.mkt-module-card {
  border-top: 2px solid rgba(44, 95, 128, 0.24);
}
```

These classes are the shared foundation for the homepage, solutions page, and proof sections.

- [ ] **Step 5: Update the button, chip, and focus styles to match the lighter palette**

Rewrite the existing action classes in `web/src/app/globals.css`:

```css
.mkt-button-primary {
  border: 1px solid rgba(47, 143, 184, 0.18);
  background: linear-gradient(135deg, #1e5b79 0%, #2f8fb8 52%, #44c4d9 100%);
  color: #f4fbff;
  box-shadow: 0 18px 32px rgba(47, 143, 184, 0.18);
}

.mkt-button-secondary,
.mkt-menu-button,
.mkt-lang-button {
  border: 1px solid var(--mk-line-1);
  background: rgba(255, 255, 255, 0.8);
  color: var(--mk-text-0);
}

.mkt-chip {
  border: 1px solid rgba(47, 143, 184, 0.16);
  background: rgba(47, 143, 184, 0.08);
  color: var(--mk-brand-1);
}
```

- [ ] **Step 6: Run a production build to catch CSS and JSX regressions early**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Expected: `next build` completes successfully.

- [ ] **Step 7: Commit the visual system baseline**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/app/globals.css
git commit -m "feat(marketing): add fog-blue visual system"
```

## Task 2: Rewrite shared marketing primitives and navigation chrome

**Files:**
- Modify: `web/src/components/marketing/primitives.tsx`
- Modify: `web/src/components/shared/site-header.tsx`
- Modify: `web/src/components/shared/site-footer.tsx`
- Test: `web/src/app/globals.css`

- [ ] **Step 1: Rework `PageHero` so it supports the new brand-statement composition**

Update `web/src/components/marketing/primitives.tsx` so `PageHero` can render a more editorial, less card-like layout. The component should keep the same props, but the internal structure should shift toward this shape:

```tsx
<section className="mkt-panel mkt-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
  <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
    <div className="space-y-6">
      <p className="mkt-kicker">{eyebrow}</p>
      <h1 className="mkt-display max-w-[10ch]">{title}</h1>
      <p className="mkt-copy max-w-2xl text-base sm:text-lg">{body}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Link href={primary.href} className="mkt-button-primary">{primary.label}</Link>
        {secondary ? <Link href={secondary.href} className="mkt-button-secondary">{secondary.label}</Link> : null}
      </div>
    </div>
    {aside ? <div className="grid gap-4 lg:justify-self-end">{aside}</div> : null}
  </div>
</section>
```

- [ ] **Step 2: Tighten `SectionHeading` and `FinalCtaBand` around the new typography rhythm**

Update `web/src/components/marketing/primitives.tsx` so section headings feel more editorial and less generic:

```tsx
export function SectionHeading({ eyebrow, title, body, align = 'left' }: ...) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}>
      <p className="mkt-kicker">{eyebrow}</p>
      <h2 className="mkt-title mt-4 max-w-[14ch]">{title}</h2>
      {body ? <p className="mkt-copy mt-4 max-w-3xl">{body}</p> : null}
    </div>
  );
}
```

Keep `WorkbenchProofCard`, but lighten its styling by relying on the updated shared classes instead of dark-only assumptions.

- [ ] **Step 3: Rebuild the header for the brighter fog-blue shell**

Update `web/src/components/shared/site-header.tsx` so the header reads like a premium brand shell instead of a dark SaaS nav. Keep the same links and locale switch, but bias toward a cleaner frame:

```tsx
<header id="site-top" className="site-header-shell sticky top-0 z-40">
  <div className="site-topline">
    ...
  </div>
  <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-3 lg:px-8 xl:px-10">
    <div className="flex min-w-0 items-center gap-4">
      ...
    </div>
    <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
      ...
    </nav>
    <div className="hidden items-center gap-2 lg:flex">
      ...
    </div>
  </div>
</header>
```

Do not change route behavior or locale behavior.

- [ ] **Step 4: Rebuild the footer as a lighter editorial closing section**

Update `web/src/components/shared/site-footer.tsx` so the footer uses light bands, stronger dividers, and less dark-panel styling:

```tsx
<footer className="mt-16 border-t border-[var(--mk-line-1)] bg-[rgba(232,239,242,0.88)]">
  <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 xl:px-10 xl:py-12">
    ...
  </div>
</footer>
```

- [ ] **Step 5: Run a build after the shared-layer changes**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Expected: production build still passes after updating shared components.

- [ ] **Step 6: Commit the shared marketing layer**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/components/marketing/primitives.tsx web/src/components/shared/site-header.tsx web/src/components/shared/site-footer.tsx web/src/app/globals.css
git commit -m "feat(marketing): rebuild shared marketing chrome"
```

## Task 3: Reshape the marketing content model for the new structure

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Review: `web/src/components/marketing/home-page.tsx`
- Review: `web/src/components/marketing/solutions-page.tsx`
- Review: `web/src/components/marketing/cases-page.tsx`
- Review: `web/src/components/marketing/about-page.tsx`
- Review: `web/src/components/marketing/contact-page.tsx`

- [ ] **Step 1: Expand the homepage copy structure so it matches the approved narrative**

In `web/src/lib/marketing.ts`, reshape the homepage copy so it supports:

- hero statement,
- platform/system view,
- five modules,
- delivery framework,
- proof layer,
- case teaser,
- final CTA.

Use this object shape for both locales:

```ts
home: {
  hero: { eyebrow: '', title: '', body: '', primary: { ... }, secondary: { ... } },
  supportSignals: [{ value: '', label: '', detail: '' }],
  platformView: { eyebrow: '', title: '', body: '', bullets: [''] },
  capabilityModules: [{ title: '', body: '', outcome: '' }],
  deliveryFramework: { eyebrow: '', title: '', body: '', steps: [{ step: '', title: '', body: '' }] },
  proofLayer: { eyebrow: '', title: '', body: '', items: [{ title: '', body: '' }] },
  caseTeaser: { eyebrow: '', title: '', items: [{ title: '', sector: '', challenge: '', outcome: '' }] },
  finalCta: { eyebrow: '', title: '', body: '' },
}
```

Prefer renaming old keys instead of forcing the page component to mix old and new structures.

- [ ] **Step 2: Expand subpage content for the new layouts**

Also update `web/src/lib/marketing.ts` so these sections exist cleanly for both locales:

```ts
solutions: {
  hero: ...,
  problemFrame: ...,
  architecture: ...,
  modules: ...,
  triggers: ...,
  delivery: ...,
  finalCta: ...,
}

cases: {
  hero: ...,
  intro: ...,
  featured: ...,
  cards: ...,
  proof: ...,
  finalCta: ...,
}

about: {
  hero: ...,
  positioning: ...,
  principles: ...,
  collaborationModel: ...,
  trust: ...,
  finalCta: ...,
}
```

Keep `contact.form` and `contact.side`, but adjust the wording to suit the brighter, more premium brand tone.

- [ ] **Step 3: Preserve locale parity**

Before touching the page components, skim the file and make sure the Chinese and English objects still expose the same property names.

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
rg -n "platformView|capabilityModules|deliveryFramework|proofLayer|problemFrame|positioning|collaborationModel" web/src/lib/marketing.ts
```

Expected: the new keys appear in both the `zh` and `en` locale branches.

- [ ] **Step 4: Run a build to catch missing-property type errors**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Expected: TypeScript and Next.js compilation succeed with the reshaped copy object.

- [ ] **Step 5: Commit the copy-model rewrite**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/lib/marketing.ts
git commit -m "feat(marketing): rewrite bilingual marketing content model"
```

## Task 4: Rebuild the homepage around the approved narrative

**Files:**
- Modify: `web/src/components/marketing/home-page.tsx`
- Test: `web/src/lib/marketing.ts`
- Test: `web/src/app/globals.css`

- [ ] **Step 1: Replace the old homepage section order with the approved sequence**

Rewrite `web/src/components/marketing/home-page.tsx` so the page flows in this order:

1. Hero
2. Platform view
3. Five capability modules
4. Delivery framework
5. Proof layer
6. Case teaser
7. Final CTA

Use this skeleton:

```tsx
<main id="main-content" className="marketing-main">
  <div className="mkt-shell">
    <PageHero ... aside={...support signals...} />

    <section className="mkt-panel mkt-editorial-band px-6 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading ... />
        <div className="grid gap-3 md:grid-cols-2">...</div>
      </div>
    </section>

    <section className="space-y-6">...</section>
    <section className="mkt-panel px-6 py-8 sm:px-8 lg:px-10">...</section>
    <section className="space-y-6">...</section>
    <section className="space-y-6">...</section>
    <FinalCtaBand ... />
  </div>
</main>
```

- [ ] **Step 2: Make the hero read like a brand statement, not a service grid**

Inside `web/src/components/marketing/home-page.tsx`, keep the supporting metrics minimal and frame them as support signals:

```tsx
<div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
  {copy.home.supportSignals.map((metric) => (
    <article key={metric.label} className="mkt-card px-5 py-5">
      <p className="mkt-metric-value">{metric.value}</p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{metric.label}</p>
      <p className="mkt-copy mt-2 text-sm">{metric.detail}</p>
    </article>
  ))}
</div>
```

Do not put the five service modules in the hero.

- [ ] **Step 3: Rebuild the proof layer so BenchmarkOps appears mid-page, not first**

Use a dedicated section, not a hero-side emphasis:

```tsx
<section className="space-y-6">
  <SectionHeading
    eyebrow={copy.home.proofLayer.eyebrow}
    title={copy.home.proofLayer.title}
    body={copy.home.proofLayer.body}
  />
  <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
    <WorkbenchProofCard />
    <div className="grid gap-4 md:grid-cols-2">
      {copy.home.proofLayer.items.map((item) => (
        <article key={item.title} className="mkt-card px-5 py-5">
          <h3 className="text-[1.18rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
          <p className="mkt-copy mt-3">{item.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Build and manually inspect the homepage**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Then run:

```bash
npm run dev
```

Manual checks on `http://localhost:3000/`:

- hero headline is dominant and not overcrowded,
- background is fog-blue rather than near-black,
- BenchmarkOps appears after the delivery or proof sections,
- section rhythm feels closer to an editorial brand page than a card dashboard.

- [ ] **Step 5: Commit the homepage redesign**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/components/marketing/home-page.tsx web/src/lib/marketing.ts web/src/app/globals.css
git commit -m "feat(marketing): redesign homepage narrative"
```

## Task 5: Rebuild the solutions page around system architecture

**Files:**
- Modify: `web/src/components/marketing/solutions-page.tsx`
- Test: `web/src/lib/marketing.ts`
- Test: `web/src/app/globals.css`

- [ ] **Step 1: Replace the current module-first layout with a problem -> architecture -> modules flow**

Rewrite `web/src/components/marketing/solutions-page.tsx` around this skeleton:

```tsx
<main id="main-content" className="marketing-main">
  <div className="mkt-shell">
    <PageHero ... />

    <section className="mkt-panel mkt-editorial-band px-6 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionHeading
          eyebrow={copy.solutions.problemFrame.eyebrow}
          title={copy.solutions.problemFrame.title}
          body={copy.solutions.problemFrame.body}
        />
        <div className="grid gap-3">...</div>
      </div>
    </section>

    <section className="space-y-6">...three-layer architecture...</section>
    <section className="space-y-6">...five modules...</section>
    <section className="mkt-panel px-6 py-8 sm:px-8 lg:px-10">...triggers...</section>
    <section className="space-y-6">...delivery...</section>
    <FinalCtaBand ... />
  </div>
</main>
```

- [ ] **Step 2: Present architecture as a real operating stack**

Render the architecture cards with a more structural look:

```tsx
{copy.solutions.architecture.map((item, index) => (
  <article key={item.title} className={index === 1 ? 'mkt-card mkt-card-highlight px-6 py-6' : 'mkt-card px-6 py-6'}>
    <span className="mkt-card-index">Layer 0{index + 1}</span>
    <h3 className="mt-4 text-[1.35rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
    <p className="mkt-copy mt-3">{item.body}</p>
  </article>
)}
```

- [ ] **Step 3: Build and review the page**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Manual checks on `http://localhost:3000/solutions`:

- page opens with the enterprise problem, not a service brochure,
- architecture reads as three layers,
- modules read as system parts, not pricing cards,
- final CTA still points cleanly to contact.

- [ ] **Step 4: Commit the solutions page**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/components/marketing/solutions-page.tsx web/src/lib/marketing.ts web/src/app/globals.css
git commit -m "feat(marketing): redesign solutions page"
```

## Task 6: Rebuild the cases and about pages around proof and positioning

**Files:**
- Modify: `web/src/components/marketing/cases-page.tsx`
- Modify: `web/src/components/marketing/about-page.tsx`
- Test: `web/src/lib/marketing.ts`
- Test: `web/src/app/globals.css`

- [ ] **Step 1: Rewrite the cases page so it leads with evidence, not a grid**

Restructure `web/src/components/marketing/cases-page.tsx` to:

- open with the case worldview,
- highlight one featured case in a split section,
- render case cards using context/problem/action/result,
- close with proof-layer blocks and CTA.

Use this featured-case pattern:

```tsx
<section className="mkt-panel px-6 py-8 sm:px-8 lg:px-10">
  <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
    <div className="space-y-5">
      <p className="mkt-kicker">{featured.eyebrow}</p>
      <h2 className="mkt-title max-w-[12ch]">{featured.title}</h2>
      <p className="mkt-copy text-base">{copy.cases.intro.body}</p>
      ...
    </div>
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">...</div>
  </div>
</section>
```

- [ ] **Step 2: Rewrite the about page so it answers “what kind of company is WanFlow?” first**

Rework `web/src/components/marketing/about-page.tsx` so the sequence becomes:

1. hero positioning,
2. positioning/body section,
3. principles,
4. collaboration or operating model,
5. trust reasons,
6. CTA.

Use the renamed content groups from `marketing.ts` so the component does not keep old story-model terminology if the copy has changed.

- [ ] **Step 3: Build and review both pages**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Manual checks:

- `http://localhost:3000/cases`
  - featured case appears before the grid,
  - each case feels like a delivery slice rather than ad copy.
- `http://localhost:3000/about`
  - the company is framed as a system-building AI partner,
  - the page does not read like a generic corporate bio.

- [ ] **Step 4: Commit the cases/about redesign**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/components/marketing/cases-page.tsx web/src/components/marketing/about-page.tsx web/src/lib/marketing.ts web/src/app/globals.css
git commit -m "feat(marketing): redesign proof and about pages"
```

## Task 7: Rebuild the contact page and finish responsive polish

**Files:**
- Modify: `web/src/components/marketing/contact-page.tsx`
- Review: `web/src/components/marketing/contact-form.tsx`
- Modify: `web/src/app/globals.css`
- Test: `web/src/lib/marketing.ts`

- [ ] **Step 1: Reframe the contact page as a branded conversion page**

Update `web/src/components/marketing/contact-page.tsx` so the page opens with a concise brand statement and keeps the form as the utility block, not the entire identity of the page:

```tsx
<main id="main-content" className="marketing-main">
  <div className="mkt-shell">
    <PageHero ... aside={...response summary...} />
    <section className="grid gap-5 xl:grid-cols-[1.04fr_0.96fr]">
      <div className="grid gap-5">
        <section className="mkt-card px-6 py-6">...why contact now...</section>
        <section className="mkt-card px-6 py-6">...response model...</section>
        <section className="mkt-card px-6 py-6">...faq...</section>
      </div>
      <ContactForm />
    </section>
  </div>
</main>
```

If the current `ContactForm` column order feels better reversed for desktop, update the grid order with utility classes instead of rewriting the form internals.

- [ ] **Step 2: Polish mobile behavior for the new hero and section rhythm**

Update `web/src/app/globals.css` media queries to guarantee:

```css
@media (max-width: 767px) {
  .mkt-display {
    font-size: clamp(2.4rem, 14vw, 4rem);
  }

  .mkt-title {
    font-size: clamp(1.75rem, 10vw, 2.6rem);
  }

  .mkt-flow-step {
    grid-template-columns: 1fr;
  }
}
```

Also check that any new editorial bands or split layouts collapse cleanly on tablet and mobile.

- [ ] **Step 3: Run the final production build**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Expected: `next build` passes with no route or type errors.

- [ ] **Step 4: Run a full manual route review in dev mode**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run dev
```

Manual checks:

- `/`
- `/solutions`
- `/cases`
- `/about`
- `/contact`

For each route, verify:

- the background is fog-blue or layered light blue rather than near-black,
- Chinese copy reads as the primary design voice,
- header/footer feel consistent,
- mobile layout does not break when narrowed,
- CTAs remain visible and readable.

- [ ] **Step 5: Commit the contact/responsive pass**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/components/marketing/contact-page.tsx web/src/app/globals.css web/src/lib/marketing.ts
git commit -m "feat(marketing): finalize contact page and responsive polish"
```

## Task 8: Final verification and delivery notes

**Files:**
- Review: `web/src/components/marketing/*.tsx`
- Review: `web/src/components/shared/*.tsx`
- Review: `web/src/lib/marketing.ts`
- Review: `web/src/app/globals.css`

- [ ] **Step 1: Check the full diff before shipping**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git status --short
git diff --stat
```

Expected: only the intended marketing files have changed.

- [ ] **Step 2: Re-run the final build from a clean state**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric/web
npm run build
```

Expected: successful build.

- [ ] **Step 3: Capture a concise verification summary**

Record these results in the handoff message:

- routes reviewed,
- build result,
- whether Chinese and English both render,
- any remaining risks, especially around long English wrapping and mobile headline breaks.

- [ ] **Step 4: Create the final implementation commit**

Run:

```bash
cd /home/wanguancheng/AProj/WanFlow/Data-Centric
git add web/src/app/globals.css web/src/components/marketing web/src/components/shared web/src/lib/marketing.ts
git commit -m "feat(marketing): launch clickhouse-inspired wanflow redesign"
```

## Self-Review

### Spec coverage

- Homepage brand-statement hero: covered in Task 4.
- Fog-blue non-black visual system: covered in Task 1.
- Shared chrome and lighter header/footer: covered in Task 2.
- Bilingual copy model with Chinese-first layout support: covered in Task 3.
- Solutions page as system architecture: covered in Task 5.
- Cases page as proof narrative: covered in Task 6.
- About page as positioning/system-builder story: covered in Task 6.
- Contact page as branded conversion page: covered in Task 7.
- Responsive behavior: covered in Task 7.
- Final verification: covered in Task 8.

### Placeholder scan

- No unfinished placeholder markers remain.
- Every task lists exact files and commands.
- Verification commands are explicit and repeatable.

### Type consistency

- Shared content keys are normalized in Task 3 before page rewrites begin.
- Shared primitives are updated before page components consume the new visual grammar.
- Final build checks appear after each major structural change.
