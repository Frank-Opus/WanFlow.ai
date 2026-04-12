'use client';

import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingHomePage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const labels = locale === 'zh'
    ? {
        caseTag: '案例',
        challenge: '挑战',
        flow: '骨架',
        brief: '核心概览',
        outcome: '结果',
      }
    : {
        caseTag: 'Case',
        challenge: 'Challenge',
        flow: 'Spine',
        brief: 'Key Overview',
        outcome: 'Outcome',
      };
  const casesLabel = copy.nav.find((item) => item.href === '/cases')?.label ?? '/cases';

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} intensity="hero" initiallyVisible>
          <PageHero
            eyebrow={copy.home.hero.eyebrow}
            title={copy.home.hero.title}
            body={copy.home.hero.statement}
            primary={copy.home.hero.primary}
            secondary={copy.home.hero.secondary}
            aside={
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="mkt-kicker">{labels.brief}</p>
                  <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{copy.home.hero.body}</p>
                </div>
                <div className="mkt-stagger-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {copy.home.supportSignals.map((metric, index) => (
                    <article
                      key={metric.label}
                      className={index === copy.home.supportSignals.length - 1 ? 'mkt-card min-w-0 px-5 py-5 sm:col-span-2 xl:col-span-1' : 'mkt-card min-w-0 px-5 py-5'}
                    >
                      <p className="mkt-metric-value">{metric.value}</p>
                      <p className="mkt-metric-label mt-3">{metric.label}</p>
                      <p className="mkt-copy mt-2 text-sm">{metric.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={60} intensity="strong" className="mkt-panel mkt-editorial-band px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.platformView.eyebrow}
              title={copy.home.platformView.title}
              body={copy.home.platformView.body}
            />
            <div className="mkt-stagger-grid grid gap-3 md:grid-cols-2">
              {copy.home.platformView.bullets.map((bullet, index) => (
                <article
                  key={bullet}
                  className={index === 0 ? 'mkt-split-callout px-5 py-5 md:col-span-2' : 'mkt-rail-card px-5 py-5'}
                >
                  <span className="mkt-card-index">{labels.flow} 0{index + 1}</span>
                  <p className="mt-4 text-base font-semibold text-[var(--mk-text-0)]">{bullet}</p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={90} intensity="strong" className="space-y-6">
          <SectionHeading
            eyebrow={copy.home.capabilityModules.eyebrow}
            title={copy.home.capabilityModules.title}
            body={copy.home.capabilityModules.body}
          />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.home.capabilityModules.items.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-module-card px-5 py-5 sm:px-6 sm:py-6',
                  index === 0 ? 'lg:col-span-5 lg:row-span-2' : '',
                  index === 1 ? 'lg:col-span-7' : '',
                  index === 2 ? 'lg:col-span-4' : '',
                  index === 3 ? 'lg:col-span-3' : '',
                  index === 4 ? 'lg:col-span-5' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-card-index">0{index + 1}</span>
                <h3 className="zh-card-title mt-4 text-[1.2rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
                <p className="mt-6 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-1)]">
                  {labels.outcome}: {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={110} intensity="strong" className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.deliveryFramework.eyebrow}
              title={copy.home.deliveryFramework.title}
              body={copy.home.deliveryFramework.body}
            />
            <div className="mkt-stagger-grid space-y-3">
              {copy.home.deliveryFramework.steps.map((step) => (
                <article key={step.step} className="mkt-flow-step">
                  <div className="mkt-flow-marker">{step.step}</div>
                  <div>
                    <h3 className="zh-card-title text-lg font-semibold text-[var(--mk-text-0)]">{step.title}</h3>
                    <p className="mkt-copy mt-2 text-sm">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={130} intensity="strong" className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={copy.home.caseTeaser.eyebrow}
              title={copy.home.caseTeaser.title}
            />
            <Link href="/cases" className="mkt-button-secondary">
              {casesLabel}
            </Link>
          </div>
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.home.caseTeaser.items.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-case-card px-5 py-5 sm:px-6 sm:py-6',
                  index === 0 ? 'lg:col-span-7' : '',
                  index === 1 ? 'lg:col-span-5' : '',
                  index === 2 ? 'lg:col-span-12' : '',
                ].filter(Boolean).join(' ')}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="mkt-chip">{item.sector}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.caseTag}</span>
                </div>
                <h3 className="zh-card-title mt-4 max-w-[22ch] text-[1.22rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm">
                  <strong className="text-[var(--mk-text-0)]">{labels.challenge}:</strong> {item.challenge}
                </p>
                <p className="mt-5 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-1)]">
                  {labels.outcome}: {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={150} intensity="strong">
          <FinalCtaBand
            eyebrow={copy.home.finalCta.eyebrow}
            title={copy.home.finalCta.title}
            body={copy.home.finalCta.body}
            primary={{ href: '/contact', label: copy.common.finalPrimary }}
            secondary={{ href: '/cases', label: copy.common.finalSecondary }}
          />
        </MotionReveal>
      </div>
    </main>
  );
}
