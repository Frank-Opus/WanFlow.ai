'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingCasesPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const featured = copy.cases.featured;
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const labels = locale === 'zh'
    ? {
        featured: '重点案例',
        context: '场景',
        challenge: '挑战',
        intervention: '执行方式',
        outcome: '结果',
        caseGrid: '匿名化交付切片',
        caseGridTitle: '更多案例，不讲品牌故事，直接看执行骨架。',
        action: '动作',
        proof: '证明层',
        nextStep: '下一步',
      }
    : {
        featured: 'Featured case',
        context: 'Context',
        challenge: 'Challenge',
        intervention: 'Intervention',
        outcome: 'Outcome',
        caseGrid: 'Delivery slices',
        caseGridTitle: 'More cases, focused on execution structure instead of brand theatre.',
        action: 'Action',
        proof: 'Proof',
        nextStep: 'Next step',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} initiallyVisible>
          <PageHero
            eyebrow={copy.cases.intro.eyebrow}
            title={copy.cases.intro.title}
            body={copy.cases.intro.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/solutions', label: navLabel('/solutions') }}
            aside={
              <div className="space-y-4">
                <p className="mkt-kicker">{labels.featured}</p>
                <span className="mkt-chip">{featured.sector}</span>
                <h3 className="zh-card-title text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{featured.title}</h3>
                <p className="mkt-copy text-sm">{featured.outcome}</p>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={70} className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:items-start xl:gap-10">
            <div className="max-w-[46rem] space-y-5">
              <p className="mkt-kicker">{featured.eyebrow}</p>
              <h2 className="mkt-title max-w-[12ch]">{featured.title}</h2>
              <div className="space-y-4 text-sm leading-7 text-[var(--mk-text-1)] sm:text-[0.98rem]">
                <p><strong className="text-[var(--mk-text-0)]">{labels.context}:</strong> {featured.sector}</p>
                <p><strong className="text-[var(--mk-text-0)]">{labels.challenge}:</strong> {featured.challenge}</p>
                <p><strong className="text-[var(--mk-text-0)]">{labels.intervention}:</strong> {featured.intervention}</p>
                <p><strong className="text-[var(--mk-text-0)]">{labels.outcome}:</strong> {featured.outcome}</p>
              </div>
            </div>
            <div className="mkt-stagger-grid grid gap-3 sm:grid-cols-3 xl:grid-cols-2 xl:self-start">
              {featured.stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className={index === 0 ? 'mkt-card px-5 py-5 xl:col-span-2' : 'mkt-card px-5 py-5'}
                >
                  <p className="mkt-metric-value text-[2.2rem]">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{stat.label}</p>
                  <p className="mkt-copy mt-2 text-sm">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={100} className="space-y-6">
          <SectionHeading eyebrow={labels.caseGrid} title={labels.caseGridTitle} body={copy.cases.intro.body} />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.cases.cards.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-case-card px-5 py-5 sm:px-6 sm:py-6',
                  index === 0 ? 'lg:col-span-7 xl:col-span-8' : '',
                  index === 1 ? 'lg:col-span-5 xl:col-span-4' : '',
                  index === 2 ? 'lg:col-span-12' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-chip">{item.sector}</span>
                <h3 className="zh-card-title mt-4 text-[1.22rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">{labels.context}:</strong> {item.sector}</p>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">{labels.challenge}:</strong> {item.challenge}</p>
                <p className="mkt-copy mt-3 text-sm"><strong className="text-[var(--mk-text-0)]">{labels.action}:</strong> {item.action}</p>
                <p className="mt-5 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-1)]">{item.outcome}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={130} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={copy.cases.proof.eyebrow} title={copy.cases.proof.title} />
          <div className="mkt-stagger-grid mt-6 grid gap-4 lg:grid-cols-3">
            {copy.cases.proof.items.map((item, index) => (
              <article key={item.title} className={index === 1 ? 'mkt-card mkt-card-highlight px-5 py-5' : 'mkt-card px-5 py-5'}>
                <span className="mkt-card-index">{labels.proof}</span>
                <h3 className="zh-card-title mt-4 text-[1.18rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={165}>
          <FinalCtaBand
            eyebrow={labels.nextStep}
            title={copy.cases.finalCta.title}
            body={copy.cases.finalCta.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/solutions', label: navLabel('/solutions') }}
          />
        </MotionReveal>
      </div>
    </main>
  );
}
