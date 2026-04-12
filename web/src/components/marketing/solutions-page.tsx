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
        industriesAside: '适用行业',
        industriesEyebrow: '行业解决方案',
        industriesTitle: '每个行业一条业务带，里面放具体模块和对应交付',
        industriesBody: '每个行业都不是一个抽象标签，而是一条可展开的业务带。左侧讲行业问题和结果，右侧用可横向扩展的模块卡片去承载具体场景。',
        modulesEyebrow: '服务模块',
        modulesTitle: '同一套能力底座，按行业做不同组合',
        modulesBody: '不同项目入口不一样，但真正起作用的，往往还是这五类核心能力如何被组合、接通和长期运行。',
        railHint: '左右拖动查看行业模块',
        modulesInIndustry: '行业内模块',
        imageSlot: '图片建议',
        deliverables: '交付物',
        outcomes: '结果',
        contact: '联系我们',
      }
    : {
        industriesAside: 'Industries',
        industriesEyebrow: 'Industry solutions',
        industriesTitle: 'Each industry gets its own business strip with expandable module cards',
        industriesBody: 'Each industry should read like a concrete operating lane, not an abstract label. The left side frames the problem and results, while the right side holds horizontally expandable module cards.',
        modulesEyebrow: 'Service modules',
        modulesTitle: 'One shared capability base, assembled differently by industry',
        modulesBody: 'Projects enter from different business problems, but the real delivery engine usually comes from how these five modules are combined and operated together.',
        railHint: 'Drag sideways to view more modules',
        modulesInIndustry: 'Modules in this industry',
        imageSlot: 'Image direction',
        deliverables: 'Deliverables',
        outcomes: 'Outcomes',
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
                <p className="mkt-copy text-sm">{labels.railHint}</p>
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
                <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] xl:items-start">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <span className="mkt-chip">{item.title}</span>
                      <h3 className="zh-card-title text-[1.4rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.summary}</h3>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.outcomes}</p>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                        {item.outcomes.map((outcome) => (
                          <li key={outcome} className="mkt-list-item">
                            <span className="mkt-list-dot" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mkt-industry-image-slot">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.imageSlot}</p>
                      <h4 className="mt-3 text-sm font-semibold text-[var(--mk-text-0)]">{item.imageTitle}</h4>
                      <p className="mkt-copy mt-2 text-sm">{item.imageHint}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.modulesInIndustry}</p>
                      <p className="text-xs text-[var(--mk-text-2)]">{labels.railHint}</p>
                    </div>
                    <div className="mkt-industry-rail">
                      {item.modules.map((module) => (
                        <article key={module.title} className="mkt-industry-module-card">
                          <h4 className="zh-card-title text-[1.12rem] font-semibold text-[var(--mk-text-0)]">{module.title}</h4>
                          <p className="mkt-copy mt-3 text-sm">{module.body}</p>
                          <div className="mt-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                            <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                              {module.deliverables.map((deliverable) => (
                                <li key={deliverable} className="mkt-list-item">
                                  <span className="mkt-list-dot" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="mt-4 border-t border-[var(--mk-line-1)] pt-3 text-sm text-[var(--mk-brand-1)]">{module.outcome}</p>
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
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {module.deliverables.map((item) => (
                        <li key={item} className="mkt-list-item">
                          <span className="mkt-list-dot" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.outcomes}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {module.outcomes.map((item) => (
                        <li key={item} className="mkt-list-item">
                          <span className="mkt-list-dot" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
