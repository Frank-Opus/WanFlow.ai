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
        stats: '关键数字',
        outcome: '结果',
        originalMethod: '原创方法',
        aiCapability: 'AI 能力',
        technicalTraits: '技术特点',
        caseGrid: '真实案例',
        caseGridTitle: '按真实业务链路看交付',
        caseGridBody: '每个案例都直接对应一个真实业务问题，重点展示方案怎么落、交付物怎么沉淀、结果怎么被看见。',
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
        stats: 'Key numbers',
        outcome: 'Outcome',
        originalMethod: 'Original method',
        aiCapability: 'AI capability',
        technicalTraits: 'Technical traits',
        caseGrid: 'Real cases',
        caseGridTitle: 'Read delivery through real business chains',
        caseGridBody: 'Each case maps to a real business problem and shows how the solution landed, what was delivered, and how the outcome became visible.',
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
                      <p className="mkt-kicker">{item.sector}</p>
                      <h3 className="zh-card-title text-[1.28rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.stats}</p>
                      <div className="mkt-stat-row">
                        {item.stats.map((stat) => (
                          <span key={stat} className="mkt-stat-chip">{stat}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mkt-proof-label-grid">
                      <span className="mkt-proof-tag">
                        <strong>{labels.originalMethod}</strong>
                        <span>{item.originalMethod}</span>
                      </span>
                      <span className="mkt-proof-tag">
                        <strong>{labels.aiCapability}</strong>
                        <span>{item.aiCapability}</span>
                      </span>
                      {item.technicalTraits.map((trait) => (
                        <span key={trait} className="mkt-proof-tag">
                          <strong>{labels.technicalTraits}</strong>
                          <span>{trait}</span>
                        </span>
                      ))}
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
                    <div className="mkt-case-image-slot">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.image}</p>
                      <p className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{item.imageTitle}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                      <ol className="mkt-number-list mt-3">
                        {item.deliverables.map((deliverable, index) => (
                          <li key={deliverable} className="mkt-number-item">
                            <span className="mkt-number-badge">{index + 1}</span>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <p className="mkt-module-outcome">{item.outcome}</p>
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
