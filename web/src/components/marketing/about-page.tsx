'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingAboutPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const finalEyebrow = locale === 'zh' ? '与 WanFlow 沟通' : 'Talk to WanFlow';
  const labels = locale === 'zh'
    ? {
        summary: '公司概览',
      }
    : {
        summary: 'Company snapshot',
      };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} initiallyVisible>
          <section
            className="mkt-about-hero mkt-panel overflow-hidden"
            style={{
              backgroundImage: "url('/about/office-hero.png')",
            }}
          >
            <div className="mkt-about-hero-inner">
              <div className="mkt-about-copy mkt-about-copy-panel">
                <p className="mkt-kicker mkt-about-kicker">{copy.about.hero.eyebrow}</p>
                <h1 className="mkt-display mkt-about-title max-w-[11.5ch] xl:max-w-[12.5ch]">{copy.about.hero.title}</h1>
                <p className="mkt-copy mkt-about-body max-w-[42rem] text-base sm:text-[1.05rem]">{copy.about.hero.body}</p>
                <div className="mkt-hero-actions flex flex-wrap gap-3">
                  <Link href="/contact" className="mkt-button-primary">
                    {copy.common.primaryCta}
                  </Link>
                  <Link href="/cases" className="mkt-button-secondary mkt-button-on-image">
                    {navLabel('/cases')}
                  </Link>
                </div>
              </div>
              <aside className="mkt-about-aside">
                <p className="mkt-kicker mkt-about-side-kicker">{copy.about.summary.eyebrow ?? labels.summary}</p>
                <div className="space-y-3">
                  {copy.about.summary.items.map((item) => (
                    <div key={item} className="border-t border-[rgba(31,63,82,0.14)] pt-3 first:border-t-0 first:pt-0">
                      <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </MotionReveal>

        <MotionReveal as="section" delay={70} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <SectionHeading eyebrow={copy.about.identity.eyebrow} title={copy.about.identity.title} />
            <div className="space-y-5">
              {copy.about.identity.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.03rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={90} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading eyebrow={copy.about.positioning.eyebrow} title={copy.about.positioning.title} />
            <div className="space-y-4">
              {copy.about.positioning.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.02rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={120} className="space-y-6">
          <SectionHeading eyebrow={copy.about.team.eyebrow} title={copy.about.team.title} body={copy.about.team.body} />
          <div className="mkt-stagger-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.about.team.members.map((member, index) => (
              <article key={member.name} className={index === 0 ? 'mkt-card mkt-card-highlight mkt-team-card px-5 py-5' : 'mkt-card mkt-team-card px-5 py-5'}>
                <div className="mkt-team-avatar-shell">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="mkt-team-avatar"
                  />
                </div>
                <span className="mkt-card-index">{member.role}</span>
                <h3 className="zh-card-title mt-4 text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{member.name}</h3>
                <p className="mkt-copy mt-3">{member.summary}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={160}>
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
