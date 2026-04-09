'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingAboutPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const finalEyebrow = locale === 'zh' ? '与 WanFlow 沟通' : 'Talk to WanFlow';
  const labels = locale === 'zh'
    ? {
        trust: '信任理由',
      }
    : {
        trust: 'Trust signals',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0}>
          <PageHero
            eyebrow={copy.about.hero.eyebrow}
            title={copy.about.hero.title}
            body={copy.about.hero.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
            aside={
              <div className="space-y-4">
                <p className="mkt-kicker">{labels.trust}</p>
                <div className="space-y-3">
                  {copy.about.trust.items.slice(0, 2).map((item) => (
                    <div key={item} className="border-t border-[var(--mk-line-1)] pt-3 first:border-t-0 first:pt-0">
                      <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={70} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading eyebrow={copy.about.positioning.eyebrow} title={copy.about.positioning.title} />
            <div className="space-y-4">
              {copy.about.positioning.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.02rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={95} className="space-y-6">
          <SectionHeading eyebrow={copy.about.principles.eyebrow} title={copy.about.principles.title} />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-3">
            {copy.about.principles.items.map((item, index) => (
              <article key={item.title} className={index === 1 ? 'mkt-card mkt-card-highlight px-5 py-5' : 'mkt-card px-5 py-5'}>
                <h3 className="zh-card-title text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={120} className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={copy.about.collaborationModel.eyebrow} title={copy.about.collaborationModel.title} />
          <div className="mkt-stagger-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.about.collaborationModel.items.map((item) => (
              <article key={item.title} className="mkt-card px-5 py-5">
                <div className="mkt-flow-marker">{item.title.slice(0, 1)}</div>
                <h3 className="zh-card-title mt-4 text-[1.1rem] font-semibold text-[var(--mk-text-0)]">{item.title}</h3>
                <p className="mkt-copy mt-3 text-sm">{item.body}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={145} className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={copy.about.trust.eyebrow} title={copy.about.trust.title} />
          <div className="mkt-stagger-grid mt-6 grid gap-3 lg:grid-cols-12">
            {copy.about.trust.items.map((item, index) => (
              <article
                key={item}
                className={[
                  'mkt-card px-5 py-5',
                  index === 0 ? 'lg:col-span-5' : '',
                  index === 1 ? 'lg:col-span-3' : '',
                  index === 2 ? 'lg:col-span-4' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-card-index">{labels.trust}</span>
                <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={170}>
          <FinalCtaBand
            eyebrow={finalEyebrow}
            title={copy.about.finalCta.title}
            body={copy.about.finalCta.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
          />
        </MotionReveal>
      </div>
    </main>
  );
}
