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
        originalMethod: 'WanFlow 的做法',
        projectStart: '项目起点',
        projectBuild: 'WanFlow 做了什么',
        whyWorked: '为什么最后能跑顺',
        caseGrid: '真实案例',
        caseGridTitle: '按真实业务问题看 WanFlow 怎么交付',
        caseGridBody: '不讲概念包装，直接看客户原来卡在哪里、WanFlow 做了什么，以及最后业务侧看到了什么结果。',
        nextStep: '下一步',
      }
    : {
        deliverables: 'Deliverables',
        image: 'Image direction',
        stats: 'Measured impact',
        outcome: 'Outcome',
        originalMethod: 'How WanFlow approached it',
        projectStart: 'Where the project started',
        projectBuild: 'What WanFlow changed',
        whyWorked: 'Why it started to run better',
        caseGrid: 'Real cases',
        caseGridTitle: 'See how WanFlow delivers against real business problems',
        caseGridBody: 'Skip the buzzwords and look directly at the client problem, what changed, and the result the business actually saw.',
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
                      <p className="mkt-proof-callout-title">{item.originalMethod}</p>
                      <p className="mkt-proof-callout-body">
                        {locale === 'zh'
                          ? `不是上来先讲模型，而是先把最影响业务结果的几个节点理顺，再把 ${item.aiCapability} 接进去，这样团队更容易真正用起来。`
                          : `We do not lead with the model. We first fix the operating nodes that most affect business results, then bring in ${item.aiCapability} so the team can actually use it.`}
                      </p>
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
                            ? `因为这套方案不是停在一个演示上，而是把 ${item.technicalTraits.join('、')} 这些关键部分一起接进了日常业务里，所以团队能持续用、持续复盘，也更容易看到结果。`
                            : `The system worked because it moved beyond demo behavior and connected ${item.technicalTraits.join(', ')} into day-to-day work, so teams could keep using it, reviewing it, and seeing the result.`}
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
