'use client';

import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading, WorkbenchProofCard } from '@/components/marketing/primitives';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingHomePage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const labels = locale === 'zh'
    ? { caseTag: '案例', challenge: '挑战', flow: '流程' }
    : { caseTag: 'Case', challenge: 'Challenge', flow: 'Flow' };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <PageHero
          eyebrow={copy.home.hero.eyebrow}
          title={copy.home.hero.title}
          body={copy.home.hero.body}
          primary={copy.home.hero.primary}
          secondary={copy.home.hero.secondary}
          aside={
            <div className="grid gap-4">
              <WorkbenchProofCard
                proofLabel={copy.common.proofLabel}
                workbenchNote={copy.common.workbenchNote}
                proofNote={copy.common.proofNote}
                workbenchCta={copy.common.workbenchCta}
              />
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {copy.home.metrics.map((metric) => (
                  <article key={metric.label} className="mkt-panel px-5 py-5">
                    <p className="mkt-metric-value">{metric.value}</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{metric.label}</p>
                    <p className="mkt-copy mt-2 text-sm">{metric.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          }
        />

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.spotlight.label}
              title={copy.home.spotlight.title}
              body={copy.home.spotlight.body}
            />
            <div className="grid gap-3 md:grid-cols-2">
              {copy.home.spotlight.bullets.map((bullet) => (
                <article key={bullet} className="mkt-card px-5 py-5">
                  <span className="mkt-card-index">{labels.flow}</span>
                  <p className="mt-4 text-base font-semibold text-[var(--mk-text-0)]">{bullet}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow={copy.home.services.eyebrow}
            title={copy.home.services.title}
            body={copy.home.services.body}
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {copy.home.services.items.map((item, index) => (
              <article key={item.title} className={index === 1 || index === 4 ? 'mkt-card mkt-card-highlight px-5 py-5' : 'mkt-card px-5 py-5'}>
                <span className="mkt-card-index">0{index + 1}</span>
                <h3 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
                <p className="mt-4 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-2)]">{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.process.eyebrow}
              title={copy.home.process.title}
              body={copy.home.process.body}
            />
            <div className="space-y-3">
              {copy.home.process.steps.map((step) => (
                <article key={step.step} className="mkt-flow-step">
                  <div className="mkt-flow-marker">{step.step}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--mk-text-0)]">{step.title}</h3>
                    <p className="mkt-copy mt-2 text-sm">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow={copy.home.differentiators.eyebrow} title={copy.home.differentiators.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {copy.home.differentiators.items.map((item) => (
              <article key={item.title} className="mkt-card px-5 py-5">
                <h3 className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow={copy.home.casesTeaser.eyebrow}
            title={copy.home.casesTeaser.title}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {copy.home.casesTeaser.items.map((item) => (
              <article key={item.title} className="mkt-case-card px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="mkt-chip">{item.sector}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.caseTag}</span>
                </div>
                <h3 className="mt-4 text-[1.22rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">{labels.challenge}:</strong> {item.challenge}</p>
                <p className="mt-4 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-2)]">{item.outcome}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-end">
            <Link href="/cases" className="mkt-button-secondary">
              {copy.common.secondaryCta}
            </Link>
          </div>
        </section>

        <FinalCtaBand
          eyebrow={copy.home.finalCta.eyebrow}
          title={copy.home.finalCta.title}
          body={copy.home.finalCta.body}
          primary={{ href: '/contact', label: copy.common.finalPrimary }}
          secondary={{ href: '/proofbench', label: copy.common.finalSecondary }}
        />
      </div>
    </main>
  );
}
