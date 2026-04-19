'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

type CredentialGroupKey = 'papers' | 'patents' | 'softwareCopyright';
type CredentialPreviewItem = {
  title: string;
  venue: string;
  year: string;
  description: string;
  status?: string;
  tag?: string;
  previewCode: string;
  previewStamp: string;
};
type CredentialCardItem = CredentialPreviewItem & {
  categoryLabel: string;
  group: CredentialGroupKey;
};

const credentialGroups: CredentialGroupKey[] = ['papers', 'patents', 'softwareCopyright'];

function buildMixedCredentialItems(credentials: {
  tabs: Record<CredentialGroupKey, string>;
  papers: readonly CredentialPreviewItem[];
  patents: readonly CredentialPreviewItem[];
  softwareCopyright: readonly CredentialPreviewItem[];
}) {
  const groupedItems = credentialGroups.map((group) =>
    credentials[group].map((item) => ({
      ...item,
      group,
      categoryLabel: credentials.tabs[group],
    })),
  );
  const totalRounds = Math.max(...groupedItems.map((items) => items.length));
  const mixedItems: CredentialCardItem[] = [];

  for (let round = 0; round < totalRounds; round += 1) {
    for (const items of groupedItems) {
      const nextItem = items[round];

      if (nextItem) mixedItems.push(nextItem);
    }
  }

  return mixedItems;
}

function getCoverflowClass(index: number, activeIndex: number, total: number) {
  let distance = index - activeIndex;

  if (total > 0) {
    const wrappedDistance = distance > 0 ? distance - total : distance + total;

    if (Math.abs(wrappedDistance) < Math.abs(distance)) {
      distance = wrappedDistance;
    }
  }

  if (distance === 0) return 'mkt-credentials-slide-active';
  if (distance === -1) return 'mkt-credentials-slide-prev';
  if (distance === 1) return 'mkt-credentials-slide-next';
  if (distance < 0) return 'mkt-credentials-slide-far-prev';
  return 'mkt-credentials-slide-far-next';
}

function CredentialPreview({
  item,
  group,
}: {
  item: CredentialPreviewItem;
  group: CredentialGroupKey;
}) {
  const isPaper = group === 'papers';
  const isSoftwareCopyright = group === 'softwareCopyright';

  return (
    <div
      className={
        isPaper
          ? 'mkt-credential-preview mkt-credential-preview-paper'
          : isSoftwareCopyright
            ? 'mkt-credential-preview mkt-credential-preview-copyright'
            : 'mkt-credential-preview mkt-credential-preview-patent'
      }
      aria-hidden="true"
    >
      <div className="mkt-credential-preview-sheet">
        <div className="mkt-credential-preview-header">
          <span className="mkt-credential-preview-chip">{item.previewCode}</span>
          <span className="mkt-credential-preview-chip mkt-credential-preview-chip-muted">{item.year}</span>
        </div>

        <div className="mkt-credential-preview-title-stack">
          {[0, 1, 2].map((index) => (
            <span
              key={`title-${index}`}
              className={index === 0 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-strong' : 'mkt-credential-preview-bar'}
            />
          ))}
        </div>

        <div className="mkt-credential-preview-meta-row">
          <span className="mkt-credential-preview-meta-chip" />
          <span className="mkt-credential-preview-meta-chip mkt-credential-preview-meta-chip-long" />
          <span className="mkt-credential-preview-meta-chip" />
        </div>

        {isPaper ? (
          <>
            <div className="mkt-credential-preview-columns">
              {[0, 1].map((column) => (
                <div key={`column-${column}`} className="mkt-credential-preview-column">
                  {[0, 1, 2, 3].map((line) => (
                    <span
                      key={`paper-${column}-${line}`}
                      className={line === 3 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-short' : 'mkt-credential-preview-bar'}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mkt-credential-preview-figure">
              <span className="mkt-credential-preview-figure-panel" />
              <div className="mkt-credential-preview-figure-lines">
                {[0, 1, 2].map((line) => (
                  <span key={`figure-${line}`} className="mkt-credential-preview-bar mkt-credential-preview-bar-fine" />
                ))}
              </div>
            </div>
          </>
        ) : isSoftwareCopyright ? (
          <>
            <div className="mkt-credential-preview-copyright-top">
              <div className="mkt-credential-preview-copyright-badge">
                <span className="mkt-credential-preview-copyright-badge-core" />
              </div>
              <div className="mkt-credential-preview-copyright-stack">
                {[0, 1, 2].map((line) => (
                  <span
                    key={`copyright-top-${line}`}
                    className={line === 0 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-strong' : 'mkt-credential-preview-bar'}
                  />
                ))}
              </div>
            </div>
            <div className="mkt-credential-preview-copyright-grid">
              <div className="mkt-credential-preview-pane">
                {[0, 1, 2, 3].map((line) => (
                  <span
                    key={`copyright-left-${line}`}
                    className={line === 3 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-short' : 'mkt-credential-preview-bar'}
                  />
                ))}
              </div>
              <div className="mkt-credential-preview-copyright-ledger">
                {[0, 1, 2].map((row) => (
                  <div key={`copyright-ledger-${row}`} className="mkt-credential-preview-copyright-ledger-row">
                    <span className="mkt-credential-preview-meta-chip" />
                    <span className="mkt-credential-preview-meta-chip mkt-credential-preview-meta-chip-long" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mkt-credential-preview-patent-top">
              <div className="mkt-credential-preview-patent-box">
                {[0, 1, 2].map((line) => (
                  <span
                    key={`patent-left-${line}`}
                    className={line === 2 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-short' : 'mkt-credential-preview-bar'}
                  />
                ))}
              </div>
              <div className="mkt-credential-preview-patent-box">
                {[0, 1, 2, 3].map((line) => (
                  <span
                    key={`patent-right-${line}`}
                    className={line === 0 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-strong' : 'mkt-credential-preview-bar'}
                  />
                ))}
              </div>
            </div>
            <div className="mkt-credential-preview-patent-grid">
              {[0, 1].map((panel) => (
                <div key={`panel-${panel}`} className="mkt-credential-preview-pane">
                  {[0, 1, 2, 3].map((line) => (
                    <span
                      key={`claim-${panel}-${line}`}
                      className={line === 3 ? 'mkt-credential-preview-bar mkt-credential-preview-bar-fine' : 'mkt-credential-preview-bar'}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mkt-credential-preview-footer">
          <span className="mkt-credential-preview-footer-label">{item.venue}</span>
          <span className="mkt-credential-preview-stamp">{item.previewStamp}</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketingAboutPage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const [isCompactCarousel, setIsCompactCarousel] = useState(false);
  const [isViewportReady, setIsViewportReady] = useState(false);
  const autoplayResumeTimer = useRef<number | null>(null);
  const autoplay = useRef(
    Autoplay({
      delay: 2600,
      playOnInit: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      stopOnInteraction: true,
    }),
  );
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: isCompactCarousel ? 'start' : 'center',
    loop: true,
    containScroll: isCompactCarousel ? 'trimSnaps' : false,
  }, [autoplay.current]);
  const credentials = copy.about.credentials;
  const credentialItems = buildMixedCredentialItems(credentials);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const navLabel = (href: string) => copy.nav.find((item) => item.href === href)?.label ?? href;
  const finalEyebrow = locale === 'zh' ? '与 WanFlow 沟通' : 'Talk to WanFlow';
  const labels = locale === 'zh'
    ? {
        summary: '公司概览',
      }
    : {
        summary: 'Company snapshot',
      };
  const credentialLabels = locale === 'zh'
    ? {
        position: (current: number, total: number) => `资质 ${current + 1} / ${total}`,
        mobileHint: '移动端以单卡展示，支持左右滑动或底部分页点跳转，自动轮播已暂停以便阅读。',
        desktopHint: '可使用箭头或底部分页点切换；手动操作后，自动轮播会明显延后再恢复。',
        dot: (index: number, title: string) => `查看第 ${index + 1} 项：${title}`,
      }
    : {
        position: (current: number, total: number) => `Credential ${current + 1} / ${total}`,
        mobileHint: 'Mobile uses a single-card view. Swipe horizontally or use the pagination dots below. Autoplay is paused for easier reading.',
        desktopHint: 'Use the arrows or pagination dots to browse. After manual navigation, autoplay waits noticeably longer before resuming.',
        dot: (index: number, title: string) => `View item ${index + 1}: ${title}`,
      };
  const currentSnap = selectedSnap;
  const shouldAutoplay = () => {
    if (typeof window === 'undefined') return false;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isAutomatedBrowser = navigator.webdriver;

    return isViewportReady && !reducedMotion && !isAutomatedBrowser && !isCompactCarousel;
  };
  const resumeAutoplay = () => {
    if (!shouldAutoplay()) return;

    autoplay.current.play();
  };
  const clearAutoplayResumeTimer = () => {
    if (autoplayResumeTimer.current === null) return;

    window.clearTimeout(autoplayResumeTimer.current);
    autoplayResumeTimer.current = null;
  };
  const restartAutoplay = () => {
    if (!shouldAutoplay()) return;

    autoplay.current.stop();
    autoplay.current.reset();
    autoplay.current.play();
  };
  const pauseAutoplayAfterInteraction = (delayMs = 7200) => {
    autoplay.current.stop();
    clearAutoplayResumeTimer();

    if (!shouldAutoplay()) return;

    autoplayResumeTimer.current = window.setTimeout(() => {
      autoplay.current.reset();
      autoplay.current.play();
      autoplayResumeTimer.current = null;
    }, delayMs);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncCompactMode = (event?: MediaQueryListEvent) => {
      setIsCompactCarousel(event ? event.matches : mediaQuery.matches);
      setIsViewportReady(true);
    };

    syncCompactMode();
    mediaQuery.addEventListener('change', syncCompactMode);

    return () => {
      mediaQuery.removeEventListener('change', syncCompactMode);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    if (!shouldAutoplay()) {
      clearAutoplayResumeTimer();
      autoplay.current.stop();
    } else {
      requestAnimationFrame(() => {
        resumeAutoplay();
      });
    }

    const syncCarousel = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedSnap(emblaApi.selectedScrollSnap());
    };

    syncCarousel();
    emblaApi.on('select', syncCarousel);
    emblaApi.on('reInit', syncCarousel);

    return () => {
      clearAutoplayResumeTimer();
      autoplay.current.stop();
      emblaApi.off('select', syncCarousel);
      emblaApi.off('reInit', syncCarousel);
    };
  }, [emblaApi, isCompactCarousel]);

  useEffect(() => {
    if (!emblaApi) return;

    clearAutoplayResumeTimer();
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);

    requestAnimationFrame(() => {
      restartAutoplay();
    });
  }, [emblaApi, credentialItems.length, isCompactCarousel]);

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} intensity="hero" initiallyVisible>
          <section
            className="mkt-about-hero mkt-panel overflow-hidden"
            style={{
              backgroundImage: "url('/about/office-hero.png')",
            }}
          >
            <div className="mkt-about-hero-inner">
              <div className="mkt-about-copy mkt-about-copy-panel mkt-hero-stage mkt-hero-stage-1">
                <p className="mkt-kicker mkt-section-kicker-large mkt-about-kicker">{copy.about.hero.eyebrow}</p>
                <h1 className="mkt-display mkt-about-title">{copy.about.hero.title}</h1>
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
              <aside className="mkt-about-aside mkt-hero-stage mkt-hero-stage-2">
                <p className="mkt-kicker mkt-section-kicker-large mkt-about-side-kicker">{copy.about.summary.eyebrow ?? labels.summary}</p>
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
            <SectionHeading eyebrow={copy.about.identity.eyebrow} title={copy.about.identity.title} size="large" />
            <div className="space-y-5">
              {copy.about.identity.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.03rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={90} className="mkt-panel mkt-editorial-band px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading eyebrow={copy.about.positioning.eyebrow} title={copy.about.positioning.title} size="large" />
            <div className="space-y-4">
              {copy.about.positioning.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mkt-copy text-base sm:text-[1.02rem]">{paragraph}</p>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={120} className="space-y-6">
          <SectionHeading eyebrow={copy.about.team.eyebrow} title={copy.about.team.title} body={copy.about.team.body} size="large" />
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
                <h3 className="zh-card-title mkt-card-heading mt-4">{member.name}</h3>
                <p className="mkt-copy mt-3">{member.summary}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={140} className="mkt-panel mkt-editorial-band mkt-credentials-section px-6 py-7 sm:px-8 lg:px-10">
          <div className="mkt-credentials-head">
            <SectionHeading eyebrow={credentials.eyebrow} title={credentials.title} body={credentials.body} size="large" />
          </div>

          <div className="mkt-credentials-stage">
            <button
              type="button"
              className="mkt-credentials-arrow mkt-credentials-arrow-left"
              onClick={() => {
                pauseAutoplayAfterInteraction();
                emblaApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              aria-label={credentials.controls.previous}
            >
              <span aria-hidden="true">←</span>
            </button>
            <div
              className="mkt-credentials-viewport"
              ref={viewportRef}
              style={isCompactCarousel ? { paddingBlock: '0', paddingInline: '0.15rem' } : undefined}
            >
              <div
                className="mkt-credentials-track"
                style={isCompactCarousel ? { marginInline: '0' } : undefined}
              >
                {credentialItems.map((item, index) => {
                  const slideStyle: CSSProperties | undefined = isCompactCarousel
                    ? {
                        flex: '0 0 100%',
                        minHeight: 'auto',
                        paddingInline: '0',
                      }
                    : undefined;
                  const cardStyle: CSSProperties | undefined = isCompactCarousel
                    ? {
                        transform: 'none',
                        opacity: 1,
                        filter: 'none',
                      }
                    : undefined;

                  return (
                    <article
                      key={`${item.group}-${item.title}`}
                      className={`mkt-credentials-slide ${isCompactCarousel ? '' : getCoverflowClass(index, currentSnap, credentialItems.length)}`}
                      style={slideStyle}
                    >
                      <div
                        className="mkt-card mkt-credentials-card px-5 py-5 sm:px-6 sm:py-6"
                        style={cardStyle}
                      >
                        <CredentialPreview item={item} group={item.group} />
                        <div className="mkt-credentials-card-top">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="mkt-trait-chip">{item.categoryLabel}</span>
                              <p className="mkt-proof-callout-label">{item.venue}</p>
                            </div>
                            <h3 className="mkt-credentials-card-title">{item.title}</h3>
                          </div>
                          <div className="mkt-credentials-year">{item.year}</div>
                        </div>
                        <p className="mkt-copy mkt-credentials-card-body mt-4 text-sm sm:text-[0.98rem]">{item.description}</p>
                        <div className="mkt-credentials-card-footer">
                          {item.tag ? <span className="mkt-trait-chip">{item.tag}</span> : <span />}
                          {item.status ? <span className="mkt-credentials-status">{item.status}</span> : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="mkt-credentials-arrow mkt-credentials-arrow-right"
              onClick={() => {
                pauseAutoplayAfterInteraction();
                emblaApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              aria-label={credentials.controls.next}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="mkt-kicker text-[0.72rem] tracking-[0.16em] text-[var(--mk-text-1)]">
                {credentialLabels.position(currentSnap, credentialItems.length)}
              </p>
              <p className="mkt-copy text-xs text-[var(--mk-text-1)] sm:text-sm">
                {credentialItems[currentSnap]?.categoryLabel}
                {' · '}
                {credentialItems[currentSnap]?.title}
              </p>
              <p className="mkt-copy text-xs text-[var(--mk-text-1)] sm:text-sm">
                {isCompactCarousel ? credentialLabels.mobileHint : credentialLabels.desktopHint}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label={credentials.title}>
              {credentialItems.map((item, index) => {
                const isActive = index === currentSnap;

                return (
                  <button
                    key={`${item.group}-${item.title}-dot`}
                    type="button"
                    onClick={() => {
                      pauseAutoplayAfterInteraction(isCompactCarousel ? 14000 : 7200);
                      emblaApi?.scrollTo(index);
                    }}
                    aria-label={credentialLabels.dot(index, item.title)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`h-2.5 w-2.5 rounded-full border transition-all duration-200 ${
                      isActive
                        ? 'border-[rgba(45,86,112,0.28)] bg-[var(--mk-brand-4)] shadow-[0_0_0_4px_rgba(45,86,112,0.10)]'
                        : 'border-[rgba(45,86,112,0.16)] bg-[rgba(45,86,112,0.18)] hover:bg-[rgba(45,86,112,0.3)]'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={180}>
          <FinalCtaBand
            eyebrow={finalEyebrow}
            title={copy.about.finalCta.title}
            body={copy.about.finalCta.body}
            primary={{ href: '/contact', label: copy.common.primaryCta }}
            secondary={{ href: '/cases', label: navLabel('/cases') }}
            size="large"
          />
        </MotionReveal>
      </div>
    </main>
  );
}
