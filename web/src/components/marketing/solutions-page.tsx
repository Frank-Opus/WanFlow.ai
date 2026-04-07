'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingSolutionsPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const labels = locale === 'zh'
    ? {
        modulesEyebrow: '服务模块',
        modulesTitle: '五大模块如何落到可执行交付',
        deliverables: '交付物',
        outcomes: '结果',
        contact: '联系我们',
        layer: '层级',
      }
    : {
        modulesEyebrow: 'Service modules',
        modulesTitle: 'How the modules turn into executable delivery',
        deliverables: 'Deliverables',
        outcomes: 'Outcomes',
        contact: 'Contact',
        layer: 'Layer',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <PageHero
          eyebrow={copy.solutions.hero.eyebrow}
          title={copy.solutions.hero.title}
          body={copy.solutions.hero.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/cases', label: navLabel('/cases') }}
          aside={
            <div className="grid gap-3">
              {copy.solutions.architecture.map((item) => (
                <article key={item.title} className="mkt-card px-5 py-5">
                  <span className="mkt-card-index">{labels.layer}</span>
                  <h3 className="mt-4 text-[1.15rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
                  <p className="mkt-copy mt-3 text-sm">{item.body}</p>
                </article>
              ))}
            </div>
          }
        />

        <section className="space-y-6">
          <SectionHeading eyebrow={labels.modulesEyebrow} title={labels.modulesTitle} body={copy.common.proofNote} />
          <div className="grid gap-4 lg:grid-cols-2">
            {copy.solutions.modules.map((module, index) => (
              <article key={module.title} className={index % 2 === 0 ? 'mkt-card mkt-card-highlight px-6 py-6' : 'mkt-card px-6 py-6'}>
                <span className="mkt-card-index">0{index + 1}</span>
                <h2 className="mt-4 text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{module.title}</h2>
                <p className="mkt-copy mt-3">{module.body}</p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.deliverables}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {module.deliverables.map((item) => (
                        <li key={item} className="mkt-list-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{labels.outcomes}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--mk-text-1)]">
                      {module.outcomes.map((item) => (
                        <li key={item} className="mkt-list-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <SectionHeading eyebrow={copy.solutions.triggers.eyebrow} title={copy.solutions.triggers.title} />
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.solutions.triggers.items.map((item) => (
                <article key={item} className="mkt-card px-5 py-5">
                  <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow={copy.solutions.delivery.eyebrow} title={copy.solutions.delivery.title} />
          <div className="grid gap-4 lg:grid-cols-4">
            {copy.solutions.delivery.steps.map((step) => (
              <article key={step.step} className="mkt-card px-5 py-5">
                <div className="mkt-flow-marker">{step.step}</div>
                <h3 className="mt-4 text-[1.15rem] font-semibold text-[var(--mk-text-0)]">{step.title}</h3>
                <p className="mkt-copy mt-3 text-sm">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <FinalCtaBand
          eyebrow={labels.contact}
          title={copy.solutions.finalCta.title}
          body={copy.solutions.finalCta.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/cases', label: navLabel('/cases') }}
        />
      </div>
    </main>
  );
}
