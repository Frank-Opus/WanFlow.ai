'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingSolutionsPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const labels = locale === 'zh'
    ? {
        problem: '企业问题',
        architectureEyebrow: '系统架构',
        architectureTitle: '先把数据、流程、模型运营放回同一张架构图里。',
        architectureBody: '对 WanFlow 来说，解决方案不是服务堆叠，而是把企业 AI 交付拆回三个互相咬合的层级。',
        modulesEyebrow: '服务模块',
        modulesTitle: '五大模块如何变成可执行交付系统',
        modulesBody: '每个模块都对应清晰的交付物与业务结果，但真正重要的是它们如何拼成统一的运行骨架。',
        deliverables: '交付物',
        outcomes: '结果',
        contact: '联系我们',
        layer: '层级',
      }
    : {
        problem: 'Enterprise problem',
        architectureEyebrow: 'Architecture',
        architectureTitle: 'Put data, process, and model operations back into one operating stack.',
        architectureBody: 'WanFlow does not stack services on top of each other. We rebuild enterprise AI delivery as three connected layers.',
        modulesEyebrow: 'Service modules',
        modulesTitle: 'How the modules become an executable delivery system',
        modulesBody: 'Each module has concrete deliverables and business outcomes, but the real value is how they lock together into one operating spine.',
        deliverables: 'Deliverables',
        outcomes: 'Outcomes',
        contact: 'Contact',
        layer: 'Layer',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0}>
          <PageHero
            eyebrow={copy.solutions.problemFrame.eyebrow}
            title={copy.solutions.problemFrame.title}
            body={copy.solutions.problemFrame.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
            aside={
              <div className="space-y-4">
                <p className="mkt-kicker">{labels.problem}</p>
                <div className="space-y-3">
                  {copy.solutions.triggers.items.slice(0, 3).map((item) => (
                    <div key={item} className="border-t border-[var(--mk-line-1)] pt-3 first:border-t-0 first:pt-0">
                      <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={70} className="space-y-6">
          <SectionHeading
            eyebrow={labels.architectureEyebrow}
            title={labels.architectureTitle}
            body={labels.architectureBody}
          />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.solutions.architecture.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-card px-6 py-6',
                  index === 1 ? 'mkt-card-highlight lg:col-span-5' : '',
                  index === 0 ? 'lg:col-span-3' : '',
                  index === 2 ? 'lg:col-span-4' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-card-index">{labels.layer} 0{index + 1}</span>
                <h3 className="zh-card-title mt-4 text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={95} className="space-y-6">
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

        <MotionReveal as="section" delay={120} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <SectionHeading eyebrow={copy.solutions.triggers.eyebrow} title={copy.solutions.triggers.title} />
            <div className="mkt-stagger-grid grid gap-3 sm:grid-cols-2">
              {copy.solutions.triggers.items.map((item, index) => (
                <article key={item} className={index === 0 ? 'mkt-split-callout px-5 py-5 sm:col-span-2' : 'mkt-rail-card px-5 py-5'}>
                  <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={145} className="space-y-6">
          <SectionHeading
            eyebrow={copy.solutions.delivery.eyebrow}
            title={copy.solutions.delivery.title}
          />
          <div className="mkt-stagger-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.solutions.delivery.steps.map((step, index) => (
              <article key={step.step} className={index === 1 ? 'mkt-card mkt-card-highlight px-5 py-5' : 'mkt-card px-5 py-5'}>
                <div className="mkt-flow-marker">{step.step}</div>
                <h3 className="zh-card-title mt-4 text-[1.15rem] font-semibold text-[var(--mk-text-0)]">{step.title}</h3>
                <p className="mkt-copy mt-3 text-sm">{step.body}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={170}>
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
