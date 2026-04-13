'use client';

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
        industriesAside: '适用行业',
        industriesEyebrow: '行业解决方案',
        industriesTitle: '覆盖核心行业，直达高频业务链路',
        industriesBody: '围绕审核、异常工单、经营复盘、知识治理与共享服务等关键场景，形成可落地、可扩展、可持续优化的解决方案。',
        modulesEyebrow: '服务模块',
        modulesTitle: '五个核心模块，组成企业级交付底座',
        modulesBody: '不同项目的入口不同，但真正决定交付质量的，往往是这五类能力如何被组合、接通并持续运营。',
        railHint: '横向查看具体场景模块',
        modulesInIndustry: '行业内模块',
        imageSlot: '行业主视觉建议',
        moduleImageSlot: '模块配图建议',
        stats: '典型改善区间',
        deliverables: '交付物',
        outcomes: '结果',
        originalMethod: 'WanFlow 原创',
        moduleMethod: '这条链怎么落地',
        moduleSupport: '最终会沉淀什么',
        contact: '联系我们',
      }
    : {
        industryLabel: 'Industry',
        industriesAside: 'Industries',
        industriesEyebrow: 'Industry solutions',
        industriesTitle: 'Coverage across core industries and high-frequency business chains',
        industriesBody: 'From review workflows and exception handling to reporting, knowledge governance, and shared services, each lane is built for live business execution.',
        modulesEyebrow: 'Service modules',
        modulesTitle: 'Five core modules forming one enterprise delivery base',
        modulesBody: 'Projects start from different business problems, but delivery quality depends on how these five capabilities are connected and operated over time.',
        railHint: 'Scroll sideways for module details',
        modulesInIndustry: 'Modules in this industry',
        imageSlot: 'Industry visual direction',
        moduleImageSlot: 'Module visual direction',
        stats: 'Typical impact range',
        deliverables: 'Deliverables',
        outcomes: 'Outcomes',
        originalMethod: 'WanFlow original',
        moduleMethod: 'How this chain lands',
        moduleSupport: 'What gets left behind',
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
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <p className="mkt-kicker">{labels.industryLabel}</p>
                      <p className="mkt-industry-sector">{item.title}</p>
                      <h3 className="mkt-industry-title">{item.headline}</h3>
                      <p className="mkt-copy text-[0.98rem] sm:text-[1.02rem]">{item.summary}</p>
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
                          ? `不是把流程拆给不同人硬接，而是把 ${item.technicalTraits.join('、')} 这些能力先接成一条能长期运行的业务链`
                          : `Instead of stitching the work together manually, WanFlow turns ${item.technicalTraits.join(', ')} into one operating chain that can keep running.`}
                      </p>
                      <div className="mkt-trait-row">
                        {item.technicalTraits.map((trait) => (
                          <span key={trait} className="mkt-trait-chip">{trait}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mkt-industry-visual">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.imageSlot}</p>
                      <div className="mt-4 space-y-3">
                        <h4 className="text-base font-semibold text-[var(--mk-text-0)] sm:text-[1.05rem]">{item.imageTitle}</h4>
                        <p className="mkt-copy text-sm">{item.imageHint}</p>
                      </div>
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.modulesInIndustry}</p>
                      <p className="text-xs text-[var(--mk-text-2)]">{labels.railHint}</p>
                    </div>
                    <div className="mkt-industry-rail">
                      {item.modules.map((module, index) => (
                        <article key={module.title} className="mkt-industry-module-card">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-3">
                              <span className="mkt-card-index">0{index + 1}</span>
                              <p className="mkt-module-impact">{module.outcome}</p>
                            </div>
                            <span className="mkt-chip mkt-chip-subtle !min-h-[2rem] !px-3 !text-[0.66rem] !tracking-[0.12em]">
                              {module.mappedModule}
                            </span>
                          </div>
                          <h4 className="zh-card-title mt-4 text-[1.16rem] font-semibold text-[var(--mk-text-0)]">{module.title}</h4>
                          <p className="mkt-copy mt-3 text-sm">{module.body}</p>
                          <div className="mkt-proof-callout mkt-proof-callout-compact mt-4">
                            <p className="mkt-proof-callout-label">{labels.originalMethod}</p>
                            <p className="mkt-proof-callout-title">
                              {locale === 'zh' ? `WanFlow 原创：${module.originalMethod}` : `WanFlow original: ${module.originalMethod}`}
                            </p>
                            <p className="mkt-proof-callout-body">
                              {locale === 'zh'
                                ? `WanFlow 会把 ${module.aiCapability} 接进真实任务，再用 ${module.technicalTrait} 把稳定性、边界和执行节奏控住，让 ${module.mappedModule} 不只是一个模块名，而是一条能持续复用的交付链`
                                : `WanFlow connects ${module.aiCapability} into live work, then uses ${module.technicalTrait} to keep pace, boundaries, and stability under control so ${module.mappedModule} becomes a reusable delivery chain instead of a label.`}
                            </p>
                            <div className="mkt-trait-row mt-3">
                              <span className="mkt-trait-chip">{module.aiCapability}</span>
                              <span className="mkt-trait-chip">{module.technicalTrait}</span>
                            </div>
                          </div>
                          <div className="mkt-module-story mt-4">
                            <p className="mkt-proof-callout-label">{labels.moduleMethod}</p>
                            <ol className="mkt-number-list mt-3">
                              <li className="mkt-number-item">
                                <span className="mkt-number-badge">1</span>
                                <span>
                                  {locale === 'zh'
                                    ? `先把 ${module.aiCapability} 接进高频业务动作里`
                                    : `Start by placing ${module.aiCapability} inside the highest-frequency business actions.`}
                                </span>
                              </li>
                              <li className="mkt-number-item">
                                <span className="mkt-number-badge">2</span>
                                <span>
                                  {locale === 'zh'
                                    ? `再用 ${module.technicalTrait} 守住边界、时效和可追踪性`
                                    : `Use ${module.technicalTrait} to hold the line on boundaries, cycle time, and traceability.`}
                                </span>
                              </li>
                              <li className="mkt-number-item">
                                <span className="mkt-number-badge">3</span>
                                <span>
                                  {locale === 'zh'
                                    ? `最后沉淀成可重复调用的 ${module.mappedModule} 交付骨架`
                                    : `Leave behind a reusable ${module.mappedModule} delivery backbone.`}
                                </span>
                              </li>
                            </ol>
                          </div>
                          <div className="mkt-module-image-slot mt-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.moduleImageSlot}</p>
                            <p className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{module.imageTitle}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.moduleSupport}</p>
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
