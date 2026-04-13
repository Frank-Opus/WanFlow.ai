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
        stats: '关键数字',
        deliverables: '交付物',
        outcomes: '结果',
        originalMethod: '原创方法',
        technicalTraits: '技术特点',
        mappedModule: '对应模块',
        aiCapability: 'AI 能力',
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
        stats: 'Key numbers',
        deliverables: 'Deliverables',
        outcomes: 'Outcomes',
        originalMethod: 'Original method',
        technicalTraits: 'Technical traits',
        mappedModule: 'Mapped module',
        aiCapability: 'AI capability',
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

        <MotionReveal as="section" delay={70} intensity="strong" className="space-y-6">
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
                    <div className="mkt-proof-label-grid">
                      <span className="mkt-proof-tag">
                        <strong>{labels.originalMethod}</strong>
                        <span>{item.originalMethod}</span>
                      </span>
                      {item.technicalTraits.map((trait) => (
                        <span key={trait} className="mkt-proof-tag">
                          <strong>{labels.technicalTraits}</strong>
                          <span>{trait}</span>
                        </span>
                      ))}
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
                            <span className="mkt-card-index">0{index + 1}</span>
                            <span className="mkt-chip mkt-chip-subtle !min-h-[2rem] !px-3 !text-[0.66rem] !tracking-[0.12em]">
                              {module.mappedModule}
                            </span>
                          </div>
                          <h4 className="zh-card-title mt-4 text-[1.16rem] font-semibold text-[var(--mk-text-0)]">{module.title}</h4>
                          <p className="mkt-copy mt-3 text-sm">{module.body}</p>
                          <div className="mkt-proof-label-grid mt-4">
                            <span className="mkt-proof-tag">
                              <strong>{labels.mappedModule}</strong>
                              <span>{module.mappedModule}</span>
                            </span>
                            <span className="mkt-proof-tag">
                              <strong>{labels.aiCapability}</strong>
                              <span>{module.aiCapability}</span>
                            </span>
                            <span className="mkt-proof-tag">
                              <strong>{labels.technicalTraits}</strong>
                              <span>{module.technicalTrait}</span>
                            </span>
                            <span className="mkt-proof-tag">
                              <strong>{labels.originalMethod}</strong>
                              <span>{module.originalMethod}</span>
                            </span>
                          </div>
                          <div className="mkt-module-image-slot mt-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.moduleImageSlot}</p>
                            <p className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{module.imageTitle}</p>
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
                          <p className="mkt-module-outcome mt-4">{module.outcome}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={95} intensity="strong" className="space-y-6">
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

        <MotionReveal delay={120} intensity="strong">
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
