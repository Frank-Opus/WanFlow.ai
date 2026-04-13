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
        deliverables: '交付物',
        image: '图片建议',
        stats: '量化结果',
        outcome: '最终结果',
        originalMethod: 'WanFlow 原创',
        projectStart: '项目起点',
        projectBuild: 'WanFlow 怎么把它做成',
        whyWorked: '为什么它能长期跑',
        caseGrid: '真实案例',
        caseGridTitle: '按真实业务链路看交付',
        caseGridBody: '每个案例都直接对应一个真实业务问题，重点展示方案怎么落、交付物怎么沉淀、结果怎么被看见。',
        nextStep: '下一步',
      }
    : {
        deliverables: 'Deliverables',
        image: 'Image direction',
        stats: 'Measured impact',
        outcome: 'Outcome',
        originalMethod: 'WanFlow original',
        projectStart: 'Where the project started',
        projectBuild: 'How WanFlow made it work',
        whyWorked: 'Why it could keep running',
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

        <MotionReveal as="section" delay={100} initiallyVisible className="space-y-6">
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
                    <div className="mkt-proof-callout">
                      <p className="mkt-proof-callout-label">{labels.originalMethod}</p>
                      <p className="mkt-proof-callout-title">
                        {locale === 'zh' ? `WanFlow 原创：${item.originalMethod}` : `WanFlow original: ${item.originalMethod}`}
                      </p>
                      <p className="mkt-proof-callout-body">
                        {locale === 'zh'
                          ? `${item.aiCapability}，并通过 ${item.technicalTraits.join('、')} 形成一套能长期复用的交付结构`
                          : `${item.aiCapability}, combined with ${item.technicalTraits.join(', ')}, forms a delivery structure that can be reused over time.`}
                      </p>
                      <div className="mkt-trait-row">
                        {item.technicalTraits.map((trait) => (
                          <span key={trait} className="mkt-trait-chip">{trait}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <section className="mkt-story-block">
                        <p className="mkt-proof-callout-label">{labels.projectStart}</p>
                        <p className="mkt-copy mt-3 text-sm sm:text-[0.98rem]">
                          {locale === 'zh'
                            ? `${item.client} 所处的是 ${item.sector} 场景。${item.challenge}`
                            : `${item.client} operated in ${item.sector}. ${item.challenge}`}
                        </p>
                      </section>
                      <section className="mkt-story-block">
                        <p className="mkt-proof-callout-label">{labels.projectBuild}</p>
                        <p className="mkt-copy mt-3 text-sm sm:text-[0.98rem]">{item.solution}</p>
                        <p className="mkt-copy mt-3 text-sm sm:text-[0.98rem]">{item.delivery}</p>
                      </section>
                      <section className="mkt-story-block">
                        <p className="mkt-proof-callout-label">{labels.whyWorked}</p>
                        <p className="mkt-copy mt-3 text-sm sm:text-[0.98rem]">
                          {locale === 'zh'
                            ? `不是只把 AI 加进流程里，而是把 ${item.aiCapability} 接到 ${item.technicalTraits.join('、')} 这条执行链上，让这套方案既能上线，也能留下之后继续扩展和复盘的空间`
                            : `This was not just AI added into a workflow. WanFlow connected ${item.aiCapability} into an execution chain shaped by ${item.technicalTraits.join(', ')}, so the system could launch, stay governable, and keep improving.`}
                        </p>
                      </section>
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
                    <div className="mkt-outcome-band">
                      <p className="mkt-proof-callout-label">{labels.outcome}</p>
                      <p className="mkt-copy mt-3 text-sm font-semibold text-[var(--mk-text-0)] sm:text-[0.98rem]">{item.outcome}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={130} initiallyVisible>
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
