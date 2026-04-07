'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingAboutPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const finalEyebrow = locale === 'zh' ? '与 WanFlow 沟通' : 'Talk to WanFlow';

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <PageHero
          eyebrow={copy.about.hero.eyebrow}
          title={copy.about.hero.title}
          body={copy.about.hero.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/cases', label: navLabel('/cases') }}
          aside={
            <div className="mkt-proof-panel">
              <p className="mkt-kicker">{copy.about.trust.eyebrow}</p>
              <h3 className="mt-4 text-[1.5rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{copy.about.trust.title}</h3>
            </div>
          }
        />

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading eyebrow={copy.about.story.eyebrow} title={copy.about.story.title} />
            <div className="space-y-4">
              {copy.about.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.02rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow={copy.about.principles.eyebrow} title={copy.about.principles.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {copy.about.principles.items.map((item) => (
              <article key={item.title} className="mkt-card px-5 py-5">
                <h3 className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow={copy.about.model.eyebrow} title={copy.about.model.title} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.about.model.items.map((item) => (
              <article key={item.title} className="mkt-card px-5 py-5">
                <div className="mkt-flow-marker">{item.title.slice(0, 1)}</div>
                <h3 className="mt-4 text-[1.1rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={copy.about.trust.eyebrow} title={copy.about.trust.title} />
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {copy.about.trust.items.map((item) => (
              <article key={item} className="mkt-card px-5 py-5">
                <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <FinalCtaBand
          eyebrow={finalEyebrow}
          title={copy.about.finalCta.title}
          body={copy.about.finalCta.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/cases', label: navLabel('/cases') }}
        />
      </div>
    </main>
  );
}
