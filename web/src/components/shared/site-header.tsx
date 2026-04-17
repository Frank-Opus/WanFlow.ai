'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const copy = getMarketingCopy(locale);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activePill, setActivePill] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const mobileMenuLabel = open ? (locale === 'zh' ? '关闭' : 'Close') : locale === 'zh' ? '菜单' : 'Menu';
  const primaryNavLabel = locale === 'zh' ? '主导航' : 'Primary navigation';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    let frame = 0;
    const updateActivePill = () => {
      const activeItem = copy.nav.find((item) => (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)));
      const activeLink = activeItem ? linkRefs.current[activeItem.href] : null;
      const navElement = navRef.current;

      if (!activeLink || !navElement) {
        setActivePill((current) => ({ ...current, opacity: 0 }));
        return;
      }

      const navBounds = navElement.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();
      setActivePill({
        left: linkBounds.left - navBounds.left,
        width: linkBounds.width,
        opacity: 1,
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActivePill);
    };

    scheduleUpdate();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => scheduleUpdate())
      : null;
    const navElement = navRef.current;

    if (navElement) {
      resizeObserver?.observe(navElement);
    }

    copy.nav.forEach((item) => {
      const link = linkRefs.current[item.href];
      if (link) {
        resizeObserver?.observe(link);
      }
    });

    if (typeof document !== 'undefined' && 'fonts' in document) {
      void (document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => {
        scheduleUpdate();
      });
    }

    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [copy.nav, pathname]);

  const isHomePage = pathname === '/';

  return (
    <>
      <a href="#main-content" className="mkt-skip-link mkt-focus-ring sr-only z-50 rounded-full px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {copy.common.skip}
      </a>

      <header id="site-top" className="site-header-shell sticky top-0 z-40">
        <div className="mkt-frame flex items-center justify-between gap-3 pl-2 pr-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3.5 lg:px-8 xl:px-10">
          <div className="flex min-w-0 items-center">
            <Link href="/" className="mkt-focus-ring inline-flex items-center justify-start">
              <Image
                src="/brand/logo-wide.png"
                alt={copy.site.brandFull}
                width={340}
                height={100}
                className="h-auto w-[140px] sm:w-[158px]"
                priority
              />
            </Link>
          </div>

          <nav
            aria-label={primaryNavLabel}
            ref={navRef}
            className="site-nav-shell hidden min-w-0 items-center gap-1.5 rounded-full border border-[var(--mk-line-1)] bg-[rgba(255,255,255,0.7)] px-2 py-1 xl:flex"
          >
            <span
              aria-hidden="true"
              className="site-nav-pill"
              style={{
                width: `${activePill.width}px`,
                transform: `translateX(${activePill.left}px)`,
                opacity: activePill.opacity,
              }}
            />
            {copy.nav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(node) => {
                    linkRefs.current[item.href] = node;
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'site-nav-link mkt-focus-ring relative z-[1] inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full px-3.5 py-2 text-[0.84rem] font-medium leading-none transition 2xl:px-4 2xl:text-[0.9rem]',
                    active ? 'site-nav-link-active' : 'site-nav-link-idle',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {(['zh', 'en'] as const).map((lang) => {
              const active = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  aria-pressed={active}
                  className={active ? 'mkt-lang-button mkt-lang-button-active' : 'mkt-lang-button'}
                >
                  {copy.common[lang]}
                </button>
              );
            })}
            <Link href="/contact" className="mkt-button-primary mkt-button-compact">
              {copy.common.primaryCta}
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-marketing-nav"
            onClick={() => setOpen((current) => !current)}
            className="mkt-menu-button mkt-focus-ring xl:hidden"
          >
            <span>{mobileMenuLabel}</span>
          </button>
        </div>

        {open ? (
          <nav id="mobile-marketing-nav" aria-label={primaryNavLabel} className="border-t border-[var(--mk-line-1)] px-5 py-4 xl:hidden">
            <div className="mkt-frame flex flex-col gap-3">
              <div className="grid gap-2 rounded-[1.35rem] border border-[var(--mk-line-1)] bg-[rgba(255,255,255,0.72)] p-2">
                {copy.nav.map((item) => {
                  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'rounded-[18px] px-4 py-3 text-sm font-medium transition',
                        active ? 'mkt-mobile-link-active' : 'border border-[var(--mk-line-1)] text-[var(--mk-text-1)]',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Link href="/contact" className="mkt-button-primary">
                  {copy.common.primaryCta}
                </Link>
                {(['zh', 'en'] as const).map((lang) => {
                  const active = locale === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLocale(lang)}
                      aria-pressed={active}
                      className={active ? 'mkt-lang-button mkt-lang-button-active' : 'mkt-lang-button'}
                    >
                      {copy.common[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
