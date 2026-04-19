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
        flow: '骨架',
        brief: '核心概览',
        outcome: '结果',
        openSolutions: '进入行业解决方案页',
        openCases: '进入真实案例页',
      }
    : {
        flow: 'Spine',
        brief: 'Key Overview',
        outcome: 'Outcome',
        openSolutions: 'Open the solutions page',
        openCases: 'Open the cases page',
      };
  const solutionsLabel = copy.nav.find((item) => item.href === '/solutions')?.label ?? '/solutions';
  const casesLabel = copy.nav.find((item) => item.href === '/cases')?.label ?? '/cases';
  const getMetricValueClass = (value: string) => {
    if (value.length > 8) return 'mkt-metric-value mkt-metric-value-tight';
    if (value.length > 3) return 'mkt-metric-value mkt-metric-value-compact';
    return 'mkt-metric-value';
  };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} intensity="hero" initiallyVisible>
          <PageHero
            eyebrow={copy.home.hero.eyebrow}
            eyebrowClassName="mkt-section-kicker-large"
            title={locale === 'zh'
              ? (
                  <span className="mkt-home-title">
                    让数据、流程和 <span className="mkt-home-title-accent">AI</span> 在业务里真正
                    <span className="mkt-home-title-glow"> 汇流</span>
                  </span>
                )
              : (
                  <span className="mkt-home-title">
                    Bring data, workflows, and <span className="mkt-home-title-accent">AI</span> into real business
                    <span className="mkt-home-title-glow"> execution</span>
                  </span>
                )}
            body={copy.home.hero.statement}
            primary={copy.home.hero.primary}
            secondary={copy.home.hero.secondary}
            aside={
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="mkt-kicker mkt-section-kicker-large">{labels.brief}</p>
                  <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{copy.home.hero.body}</p>
                </div>
                <div className="mkt-stagger-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                  {copy.home.supportSignals.map((metric, index) => (
                    <article
                      key={metric.label}
                      className={index === copy.home.supportSignals.length - 1 ? 'mkt-card min-w-0 px-5 py-5 sm:col-span-2 xl:col-span-1' : 'mkt-card min-w-0 px-5 py-5'}
                    >
                      <p className={getMetricValueClass(metric.value)}>
                        {metric.value}
                      </p>
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
              size="large"
            />
            <div className="mkt-stagger-grid grid gap-3 md:grid-cols-2">
              {copy.home.platformView.bullets.map((bullet, index) => (
                <article
                  key={bullet}
                  className={index === 0 ? 'mkt-split-callout px-5 py-5 md:col-span-2' : 'mkt-rail-card px-5 py-5'}
                >
                  <span className="mkt-card-index">{labels.flow} 0{index + 1}</span>
                  <p className="mkt-card-heading-sm mt-4">{bullet}</p>
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
            size="large"
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
                <h3 className="zh-card-title mkt-card-heading mt-4">{item.title}</h3>
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
              size="large"
            />
            <div className="mkt-stagger-grid space-y-3">
              {copy.home.deliveryFramework.steps.map((step) => (
                <article key={step.step} className="mkt-flow-step">
                  <div className="mkt-flow-marker">{step.step}</div>
                  <div>
                    <h3 className="zh-card-title mkt-card-heading-sm">{step.title}</h3>
                    <p className="mkt-copy mt-2 text-sm">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={130} intensity="strong" className="mkt-panel px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
          <div className="mkt-home-entry-grid">
            <Link
              href="/solutions"
              aria-label={labels.openSolutions}
              className="group mkt-home-entry-card mkt-home-entry-card-primary touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,244,255,0.9)] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgba(22,58,75,0.3)] active:translate-y-px active:scale-[0.992]"
            >
              <span className="mkt-home-entry-card-surface flex w-full items-center justify-center">
                <span className="mkt-home-entry-card-body flex min-w-0 flex-col items-center gap-1.5">
                  <span className="mkt-home-entry-card-label transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-active:translate-y-0">
                    {solutionsLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mkt-home-entry-card-feedback h-1.5 w-10 rounded-full bg-white/0 transition-all duration-200 group-hover:bg-white/18 group-focus-visible:bg-white/30 group-active:w-8"
                  />
                </span>
              </span>
            </Link>
            <Link
              href="/cases"
              aria-label={labels.openCases}
              className="group mkt-home-entry-card touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,143,184,0.42)] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgba(242,248,251,0.92)] active:translate-y-px active:scale-[0.992]"
            >
              <span className="mkt-home-entry-card-surface flex w-full items-center justify-center">
                <span className="mkt-home-entry-card-body flex min-w-0 flex-col items-center gap-1.5">
                  <span className="mkt-home-entry-card-label transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-active:translate-y-0">
                    {casesLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mkt-home-entry-card-feedback h-1.5 w-10 rounded-full bg-[var(--mk-brand-1)]/0 transition-all duration-200 group-hover:bg-[var(--mk-brand-1)]/12 group-focus-visible:bg-[var(--mk-brand-1)]/18 group-active:w-8"
                  />
                </span>
              </span>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={150} intensity="strong">
          <FinalCtaBand
            eyebrow={copy.home.finalCta.eyebrow}
            title={copy.home.finalCta.title}
            body={copy.home.finalCta.body}
            primary={{ href: '/contact', label: copy.common.finalPrimary }}
            secondary={{ href: '/cases', label: copy.common.finalSecondary }}
            size="large"
          />
        </MotionReveal>
      </div>
    </main>
  );
}
