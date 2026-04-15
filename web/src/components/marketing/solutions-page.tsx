'use client';

import Image from 'next/image';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingSolutionsPage() {
  const copy = useMarketingCopy();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const { locale } = useLocale();
  const labels = locale === 'zh'
      ? {
        industryLabel: '行业',
        industriesAside: '案例行业',
        industriesEyebrow: '行业解决方案',
        industriesTitle: '看行业里最难跑顺的那几段，WanFlow 怎么把它真正接起来',
        industriesBody: '每个行业都不是一个抽象标签。我们直接拆最影响结果的业务链，讲清楚什么该自动、什么要人兜底，以及系统最后怎么长期跑下去。',
        modulesEyebrow: '交付底座',
        modulesTitle: '项目做完以后，企业真正会留下来的五类长期能力',
        modulesBody: '不是上线一个页面就结束，而是把数据、流程、多智能体和运营闭环沉成以后还能继续扩的底盘。',
        modulesInIndustry: '常见业务场景',
        railHint: '左右滑动查看更多场景',
        stats: '典型改善区间',
        deliverables: '最终会留下什么',
        outcomes: '常见结果',
        originalMethod: '这一段怎么接顺',
        whatWeDo: '落地方式',
        moduleOutcome: '常见改善',
        contact: '联系我们',
      }
      : {
        industryLabel: 'Industry',
        industriesAside: 'Industries',
        industriesEyebrow: 'Industry solutions',
        industriesTitle: 'See the hardest operating links in each industry and how WanFlow reconnects them',
        industriesBody: 'These are not abstract industry labels. Each section points to the business chain that usually breaks first, what should be automated, where humans should stay in control, and how the system keeps running after launch.',
        modulesEyebrow: 'Delivery base',
        modulesTitle: 'A real project should leave behind five durable operating capabilities',
        modulesBody: 'The goal is not one launch moment. It is a base the team can keep extending across data, workflows, multi-agent execution, and optimization.',
        modulesInIndustry: 'Typical business scenarios',
        railHint: 'Swipe sideways for more scenarios',
        stats: 'Typical impact range',
        deliverables: 'What gets left behind',
        outcomes: 'Typical outcomes',
        originalMethod: 'How WanFlow usually approaches it',
        whatWeDo: 'How WanFlow usually works',
        moduleOutcome: 'Typical improvement',
        contact: 'Contact',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} intensity="hero" initiallyVisible>
          <PageHero
            eyebrow={copy.solutions.problemFrame.eyebrow}
            title={copy.solutions.problemFrame.title}
            body={copy.solutions.problemFrame.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
            aside={
              <div className="space-y-4">
                <p className="mkt-kicker">{labels.industriesAside}</p>
                <div className="grid gap-2">
                  {copy.solutions.industries.slice(0, 4).map((item) => (
                    <span key={item.title} className="mkt-chip w-fit">{item.title}</span>
                  ))}
                </div>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={70} intensity="strong" initiallyVisible className="space-y-6">
          <SectionHeading
            eyebrow={labels.industriesEyebrow}
            title={labels.industriesTitle}
            body={labels.industriesBody}
          />
          <div className="space-y-4">
            {copy.solutions.industries.map((item) => (
              <article
                key={item.title}
                className="mkt-industry-strip mkt-panel px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(22rem,0.92fr)_minmax(0,1.08fr)] xl:items-start">
                  <div className="min-w-0 space-y-5">
                    <div className="min-w-0 space-y-3">
                      <p className="mkt-kicker">{labels.industryLabel}</p>
                      <p className="mkt-industry-sector">{item.title}</p>
                      <h3 className="mkt-industry-title">{item.headline}</h3>
                      <p className="mkt-industry-summary mkt-copy text-[0.98rem] sm:text-[1.02rem]">{item.summary}</p>
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
                          ? `${item.technicalTraits.join('、')} 这些地方一旦不稳，业务就会一直回退。WanFlow 会先把这几段接住，再把 AI 和多智能体真正接进去。`
                          : `We do not start by stacking tools. We start by connecting the key operating links around ${item.technicalTraits.join(', ')} so the team can get the blocked workflow running first and then keep expanding.`}
                      </p>
                    </div>
                    <div className="mkt-industry-visual">
                      {(item as { imageSrc?: string }).imageSrc ? (
                        <div className="mkt-industry-media-frame relative overflow-hidden rounded-[1rem] border border-[rgba(86,125,149,0.18)] bg-white aspect-[16/10]">
                          <Image
                            src={(item as { imageSrc?: string }).imageSrc!}
                            alt={item.imageTitle}
                            fill
                            className="object-cover object-top"
                            sizes="(min-width: 1280px) 40vw, 100vw"
                          />
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-base font-semibold text-[var(--mk-text-0)] sm:text-[1.05rem]">{item.imageTitle}</h4>
                          <p className="mkt-copy text-sm">{item.imageHint}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.outcomes}</p>
                      <ol className="mkt-number-list mt-3">
                        {item.outcomes.map((outcome, index) => (
                          <li key={outcome} className="mkt-number-item">
                            <span className="mkt-number-badge">{index + 1}</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.modulesInIndustry}</p>
                      <p className="text-xs text-[var(--mk-text-2)]">{labels.railHint}</p>
                    </div>
                    <div className="mkt-industry-rail">
                      {item.modules.map((module, index) => (
                        <article key={module.title} className="mkt-industry-module-card">
                          <div className="space-y-3">
                            <span className="mkt-card-index">0{index + 1}</span>
                            <p className="mkt-module-impact">{module.outcome}</p>
                          </div>
                          <h4 className="zh-card-title mt-4 text-[1.16rem] font-semibold text-[var(--mk-text-0)]">{module.title}</h4>
                          <p className="mkt-copy mt-3 text-sm">{module.body}</p>
                          <div className="mkt-proof-callout mkt-proof-callout-compact mt-4">
                            <p className="mkt-proof-callout-label">{labels.whatWeDo}</p>
                            <p className="mkt-proof-callout-title">{module.originalMethod}</p>
                            <p className="mkt-proof-callout-body">
                              {locale === 'zh'
                                ? `${module.aiCapability} 负责把速度提起来，${module.technicalTrait} 负责把边界、稳定性和可追踪性守住。`
                                : `We first fix the operating nodes that most affect speed and quality, then bring in ${module.aiCapability} and use ${module.technicalTrait} to keep boundaries, rhythm, and traceability under control.`}
                            </p>
                          </div>
                          <div className="mkt-module-story mt-4">
                            <p className="mkt-proof-callout-label">{labels.moduleOutcome}</p>
                            <p className="mkt-copy mt-3 text-sm">
                              {locale === 'zh'
                                ? '通常先能看到时效、回退率、人工负荷和跨团队协同成本往下走。'
                                : 'This usually shows up first in cycle time, accuracy, rework rate, manual load, or coordination cost.'}
                            </p>
                          </div>
                          <div className="mkt-module-image-slot mt-4">
                            {(module as { imageSrc?: string }).imageSrc ? (
                              <div className="relative overflow-hidden rounded-[0.9rem] border border-[rgba(86,125,149,0.18)] bg-white aspect-[4/3]">
                                <Image
                                  src={(module as { imageSrc?: string }).imageSrc!}
                                  alt={module.imageTitle}
                                  fill
                                  className="object-cover object-top"
                                  sizes="(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 84vw"
                                />
                              </div>
                            ) : (
                              <p className="text-sm font-semibold text-[var(--mk-text-0)]">{module.imageTitle}</p>
                            )}
                          </div>
                          <div className="mt-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                            <ol className="mkt-number-list mt-3">
                              {module.deliverables.map((deliverable, deliverableIndex) => (
                                <li key={deliverable} className="mkt-number-item">
                                  <span className="mkt-number-badge">{deliverableIndex + 1}</span>
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={95} intensity="strong" initiallyVisible className="space-y-6">
          <SectionHeading eyebrow={labels.modulesEyebrow} title={labels.modulesTitle} body={labels.modulesBody} />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.solutions.modules.map((module, index) => (
              <article
                key={module.title}
                className={[
                  'mkt-module-card px-6 py-6',
                  index === 0 ? 'mkt-card-highlight lg:col-span-7' : '',
                  index === 1 ? 'lg:col-span-5' : '',
                  index >= 2 ? 'lg:col-span-4' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-card-index">0{index + 1}</span>
                <h2 className="zh-card-title mt-4 text-[1.42rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{module.title}</h2>
                <p className="mkt-copy mt-3">{module.body}</p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                    <ol className="mkt-number-list mt-3">
                      {module.deliverables.map((item, index) => (
                        <li key={item} className="mkt-number-item">
                          <span className="mkt-number-badge">{index + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.outcomes}</p>
                    <ol className="mkt-number-list mt-3">
                      {module.outcomes.map((item, index) => (
                        <li key={item} className="mkt-number-item">
                          <span className="mkt-number-badge">{index + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={120} intensity="strong" initiallyVisible>
          <FinalCtaBand
            eyebrow={labels.contact}
            title={copy.solutions.finalCta.title}
            body={copy.solutions.finalCta.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
          />
        </MotionReveal>
      </div>
    </main>
  );
}
