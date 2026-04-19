'use client';

import Image from 'next/image';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingCasesPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const featuredCases = copy.cases.cards.slice(0, 3);
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const labels = locale === 'zh'
      ? {
        deliverables: '交付物',
        image: '项目界面',
        screenSource: '项目上下文',
        stats: '量化结果',
        outcome: '最终结果',
        originalMethod: '核心设计',
        projectStart: '业务背景',
        projectBuild: '交付内容',
        whyWorked: '系统形态',
        caseGrid: '真实案例',
        caseGridTitle: '来自真实交付项目的案例',
        caseGridBody: '重点看业务问题、交付内容和最终结果。',
        nextStep: '下一步',
      }
    : {
        deliverables: 'Deliverables',
        image: 'Project view',
        screenSource: 'Project context',
        stats: 'Measured impact',
        outcome: 'Outcome',
        originalMethod: 'Core design',
        projectStart: 'Business context',
        projectBuild: 'Delivery scope',
        whyWorked: 'How the system runs',
        caseGrid: 'Real cases',
        caseGridTitle: 'Cases from real delivery work',
        caseGridBody: 'Focus on the business problem, delivery scope, and outcome.',
        nextStep: 'Next step',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} initiallyVisible>
          <PageHero
            eyebrow={copy.cases.intro.eyebrow}
            eyebrowClassName="mkt-section-kicker-large"
            title={copy.cases.intro.title}
            titleClassName="mkt-display-subpage"
            body={copy.cases.intro.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/solutions', label: navLabel('/solutions') }}
            aside={
              <div className="space-y-4">
                <p className="mkt-kicker mkt-section-kicker-large">{labels.caseGrid}</p>
                <div className="grid gap-2">
                  {featuredCases.map((item) => (
                    <span key={item.title} className="mkt-chip w-fit">{item.sector}</span>
                  ))}
                </div>
                <p className="mkt-copy text-sm">{labels.caseGridBody}</p>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={100} initiallyVisible className="space-y-6">
          <SectionHeading eyebrow={labels.caseGrid} title={labels.caseGridTitle} body={labels.caseGridBody} size="large" />
          <div className="space-y-4">
            {featuredCases.map((item) => {
              const caseImageSrc = 'imageSrc' in item ? item.imageSrc : undefined;

              return (
                <article
                  key={item.title}
                  className="mkt-case-detail-card mkt-panel px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7"
                >
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.94fr)]">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <p className="mkt-kicker mkt-section-kicker-large">{item.sector}</p>
                        <h3 className="zh-card-title mkt-card-heading-lg">{item.title}</h3>
                      </div>
                      <div className="space-y-3">
                        <p className="mkt-meta-label">{labels.stats}</p>
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
                            ? `方案以 ${item.aiCapability} 为核心，配合 ${item.technicalTraits.join('、')}，直接落在日常业务处理链路里。`
                            : `The system is built around ${item.aiCapability}, with ${item.technicalTraits.join(', ')} embedded into day-to-day execution.`}
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
                              ? `系统最终把 ${item.technicalTraits.join('、')} 接到同一套业务链里，业务团队可以直接看状态、接任务、做复核，管理层也能持续看到结果变化。`
                              : `The final system connected ${item.technicalTraits.join(', ')} into one operating chain so teams could track status, take action, review work, and keep seeing results.`}
                          </p>
                        </section>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <figure className="mkt-case-image-slot">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="mkt-meta-label">{labels.image}</p>
                            <span className="rounded-full border border-[rgba(86,125,149,0.18)] bg-white/72 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">
                              {item.sector}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--mk-text-2)]">
                            <span className="font-medium text-[var(--mk-text-1)]">{labels.screenSource}</span>
                            <span aria-hidden="true">•</span>
                            <span>{item.client}</span>
                          </div>
                        </div>
                        {caseImageSrc ? (
                          <>
                            <div className="mkt-case-image-frame mt-3 overflow-hidden rounded-[1rem] border border-[rgba(86,125,149,0.18)] bg-white/95 shadow-[0_18px_38px_rgba(17,38,51,0.08)]">
                              <div
                                aria-hidden="true"
                                className="flex items-center gap-2 border-b border-[rgba(86,125,149,0.12)] bg-[linear-gradient(180deg,rgba(248,251,253,0.96),rgba(239,246,249,0.92))] px-4 py-3"
                              >
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ef8a83]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#f2c36b]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#84c68c]" />
                                <span className="ml-2 truncate text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--mk-text-2)]">
                                  {item.imageTitle}
                                </span>
                              </div>
                              <div className="relative aspect-[16/10] bg-[linear-gradient(180deg,rgba(252,253,255,0.98),rgba(242,248,251,0.94))] p-3 sm:p-4">
                                <Image
                                  src={caseImageSrc}
                                  alt={item.imageTitle}
                                  fill
                                  className="mkt-case-image mkt-case-image-main object-contain object-top p-1 sm:p-2"
                                  sizes="(min-width: 1280px) 36vw, (min-width: 768px) 42vw, 100vw"
                                />
                              </div>
                            </div>
                            <figcaption className="mt-3 space-y-1">
                              <p className="mkt-card-heading-sm">{item.imageTitle}</p>
                              <p className="mkt-copy text-xs text-[var(--mk-text-2)] sm:text-sm">{item.client}</p>
                            </figcaption>
                          </>
                        ) : (
                          <p className="mkt-card-heading-sm mt-3">{item.imageTitle}</p>
                        )}
                      </figure>
                      <div>
                        <p className="mkt-meta-label">{labels.deliverables}</p>
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
              );
            })}
          </div>
        </MotionReveal>

        <MotionReveal delay={130} initiallyVisible>
          <FinalCtaBand
            eyebrow={labels.nextStep}
            title={copy.cases.finalCta.title}
            body={copy.cases.finalCta.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/solutions', label: navLabel('/solutions') }}
            size="large"
          />
        </MotionReveal>
      </div>
    </main>
  );
}
