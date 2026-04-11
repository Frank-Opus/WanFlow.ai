'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const copy = getMarketingCopy(locale);
  const [open, setOpen] = useState(false);
  const mobileMenuLabel = open ? (locale === 'zh' ? '关闭' : 'Close') : locale === 'zh' ? '菜单' : 'Menu';
  const primaryNavLabel = locale === 'zh' ? '主导航' : 'Primary navigation';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isMarketingRoute = copy.nav.some((item) => (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)));
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
                className="h-auto w-[164px] sm:w-[186px]"
                priority
              />
            </Link>
          </div>

          <nav
            aria-label={primaryNavLabel}
            className="hidden items-center gap-1.5 rounded-full border border-[var(--mk-line-1)] bg-[rgba(255,255,255,0.7)] px-2 py-1 xl:flex"
          >
            {copy.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'site-nav-link mkt-focus-ring whitespace-nowrap rounded-full px-3.5 py-2 text-[0.88rem] font-medium leading-none transition 2xl:px-4 2xl:text-[0.92rem]',
                    active ? 'site-nav-link-active' : 'site-nav-link-idle',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {!isHomePage ? (
              <Link href="/dataflow/proofbench" className={isMarketingRoute ? 'mkt-button-secondary mkt-button-compact' : 'mkt-button-primary mkt-button-compact'}>
                {copy.common.workbenchCta}
              </Link>
            ) : null}
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
                  const active = pathname === item.href;
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
                {!isHomePage ? (
                  <Link href="/dataflow/proofbench" className="mkt-button-secondary">
                    {copy.common.workbenchCta}
                  </Link>
                ) : null}
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
