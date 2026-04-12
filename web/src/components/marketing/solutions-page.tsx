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
        industriesTitle: '先看行业问题，再看对应方案组合',
        industriesBody: 'WanFlow 按行业去理解业务链路，再把数据、流程、多智能体和人机协同能力组合成真正能落地的方案。',
        modulesEyebrow: '服务模块',
        modulesTitle: '同一套能力底座，按行业做不同组合',
        modulesBody: '不同项目入口不一样，但真正起作用的，往往还是这五类核心能力如何被组合、接通和长期运行。',
        problems: '典型问题',
        solutionCombo: '方案组合',
        deliverables: '交付物',
        outcomes: '结果',
        contact: '联系我们',
      }
    : {
        industriesAside: 'Industries',
        industriesEyebrow: 'Industry solutions',
        industriesTitle: 'Start from industry problems, then match the right solution combination',
        industriesBody: 'WanFlow reads the business chain by industry first, then combines data, workflow, multi-agent, and human review capabilities into a practical operating solution.',
        modulesEyebrow: 'Service modules',
        modulesTitle: 'One shared capability base, assembled differently by industry',
        modulesBody: 'Projects enter from different business problems, but the real delivery engine usually comes from how these five modules are combined and operated together.',
        problems: 'Typical problems',
        solutionCombo: 'Solution combination',
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
                <div className="space-y-3">
                  {copy.solutions.industries.slice(0, 4).map((item) => (
                    <div key={item.title} className="border-t border-[var(--mk-line-1)] pt-3 first:border-t-0 first:pt-0">
                      <p className="text-sm font-semibold text-[var(--mk-text-0)]">{item.title}</p>
                      <p className="mkt-copy mt-1 text-sm">{item.summary}</p>
                    </div>
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
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.solutions.industries.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-case-card px-6 py-6',
                  index === 0 ? 'mkt-card-highlight lg:col-span-7' : '',
                  index === 1 ? 'lg:col-span-5' : '',
                  index >= 2 ? 'lg:col-span-4' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-chip">{item.title}</span>
                <h3 className="zh-card-title mt-4 text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.summary}</h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.problems}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {item.problems.map((problem) => (
                        <li key={problem} className="mkt-list-item">
                          <span className="mkt-list-dot" />
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.solutionCombo}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {item.solutions.map((solution) => (
                        <li key={solution} className="mkt-list-item">
                          <span className="mkt-list-dot" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
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
