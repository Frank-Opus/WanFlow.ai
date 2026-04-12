'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingCasesPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const labels = locale === 'zh'
    ? {
        client: '客户类型',
        context: '所属行业',
        challenge: '原始问题',
        solution: '方案组合',
        delivery: '交付方式',
        deliverables: '交付物',
        image: '图片建议',
        outcome: '结果',
        caseGrid: '真实案例',
        caseGridTitle: '每个案例都直接展开问题、方案、交付和结果',
        caseGridBody: '不再单列重点案例，所有案例都用同样的颗粒度来展示，方便直接对照你的业务场景。',
        nextStep: '下一步',
      }
    : {
        client: 'Client type',
        context: 'Industry',
        challenge: 'Original problem',
        solution: 'Solution combination',
        delivery: 'Delivery approach',
        deliverables: 'Deliverables',
        image: 'Image direction',
        outcome: 'Outcome',
        caseGrid: 'Real cases',
        caseGridTitle: 'Each case opens up the problem, solution, delivery, and outcome directly',
        caseGridBody: 'There is no separate featured case now. Every case is shown at the same detail level so visitors can compare them against their own workflow.',
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
                <p className="mkt-kicker">{labels.caseGrid}</p>
                <div className="grid gap-2">
                  {copy.cases.cards.slice(0, 4).map((item) => (
                    <span key={item.title} className="mkt-chip w-fit">{item.sector}</span>
                  ))}
                </div>
                <p className="mkt-copy text-sm">{labels.caseGridBody}</p>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={100} className="space-y-6">
          <SectionHeading eyebrow={labels.caseGrid} title={labels.caseGridTitle} body={labels.caseGridBody} />
          <div className="space-y-4">
            {copy.cases.cards.map((item) => (
              <article
                key={item.title}
                className="mkt-case-detail-card mkt-panel px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.94fr)]">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <span className="mkt-chip">{item.sector}</span>
                      <h3 className="zh-card-title text-[1.28rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                    </div>
                    <div className="space-y-4 text-sm leading-7 text-[var(--mk-text-1)] sm:text-[0.98rem]">
                      <p><strong className="text-[var(--mk-text-0)]">{labels.client}:</strong> {item.client}</p>
                      <p><strong className="text-[var(--mk-text-0)]">{labels.context}:</strong> {item.sector}</p>
                      <p><strong className="text-[var(--mk-text-0)]">{labels.challenge}:</strong> {item.challenge}</p>
                      <p><strong className="text-[var(--mk-text-0)]">{labels.solution}:</strong> {item.solution}</p>
                      <p><strong className="text-[var(--mk-text-0)]">{labels.delivery}:</strong> {item.delivery}</p>
                      <p><strong className="text-[var(--mk-text-0)]">{labels.outcome}:</strong> {item.outcome}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                        {item.deliverables.map((deliverable) => (
                          <li key={deliverable} className="mkt-list-item">
                            <span className="mkt-list-dot" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mkt-industry-image-slot">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.image}</p>
                      <p className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{item.imageTitle}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={130}>
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
