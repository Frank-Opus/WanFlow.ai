'use client';

import { FinalCtaBand, PageHero, SectionHeading, useMarketingCopy } from '@/components/marketing/primitives';

export default function MarketingCasesPage() {
  const copy = useMarketingCopy();
  const featured = copy.cases.featured;

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <PageHero
          eyebrow={copy.cases.hero.eyebrow}
          title={copy.cases.hero.title}
          body={copy.cases.hero.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/solutions', label: copy.nav[1].label }}
          aside={
            <div className="mkt-proof-panel space-y-4">
              <span className="mkt-chip">{featured.sector}</span>
              <h3 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{featured.title}</h3>
              <p className="mkt-copy text-sm">{featured.outcome}</p>
            </div>
          }
        />

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-5">
              <p className="mkt-kicker">{featured.eyebrow}</p>
              <h2 className="mkt-title">{featured.title}</h2>
              <div className="space-y-4 text-sm leading-7 text-[var(--mk-text-1)] sm:text-[0.98rem]">
                <p><strong className="text-[var(--mk-text-0)]">Challenge:</strong> {featured.challenge}</p>
                <p><strong className="text-[var(--mk-text-0)]">Intervention:</strong> {featured.intervention}</p>
                <p><strong className="text-[var(--mk-text-0)]">Outcome:</strong> {featured.outcome}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {featured.stats.map((stat) => (
                <article key={stat.label} className="mkt-card px-5 py-5">
                  <p className="mkt-metric-value text-[2.2rem]">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{stat.label}</p>
                  <p className="mkt-copy mt-2 text-sm">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Case grid" title={copy.cases.proof.title} body={copy.cases.hero.body} />
          <div className="grid gap-4 lg:grid-cols-3">
            {copy.cases.cards.map((item) => (
              <article key={item.title} className="mkt-case-card px-5 py-5">
                <span className="mkt-chip">{item.sector}</span>
                <h3 className="mt-4 text-[1.22rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">Challenge:</strong> {item.challenge}</p>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">Action:</strong> {item.action}</p>
                <p className="mt-4 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-2)]">{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow={copy.cases.proof.eyebrow} title={copy.cases.proof.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {copy.cases.proof.items.map((item, index) => (
              <article key={item.title} className={index === 1 ? 'mkt-card mkt-card-highlight px-5 py-5' : 'mkt-card px-5 py-5'}>
                <span className="mkt-card-index">Proof</span>
                <h3 className="mt-4 text-[1.18rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <FinalCtaBand
          eyebrow="Next step"
          title={copy.cases.finalCta.title}
          body={copy.cases.finalCta.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/solutions', label: copy.nav[1].label }}
        />
      </div>
    </main>
  );
}
