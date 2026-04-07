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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isMarketingRoute = pathname === '/' || pathname.startsWith('/solutions') || pathname.startsWith('/cases') || pathname.startsWith('/about') || pathname.startsWith('/contact');

  return (
    <>
      <a href="#main-content" className="mkt-skip-link mkt-focus-ring sr-only z-50 rounded-full px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {copy.common.skip}
      </a>

      <header id="site-top" className="site-header-shell sticky top-0 z-40">
        <div className="site-topline">
          <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mk-text-2)] lg:px-8 xl:px-10">
            <p className="truncate">{copy.common.metaKicker}</p>
            <span className="site-pill hidden rounded-full px-3 py-1 text-[var(--mk-text-1)] lg:inline-flex">
              {copy.site.location}
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-3.5 lg:px-8 xl:px-10">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="site-brand-frame mkt-focus-ring inline-flex items-center rounded-[20px] px-3.5 py-2.5">
              <Image
                src="/brand/logo-wide.png"
                alt={copy.site.brandFull}
                width={220}
                height={75}
                className="h-auto w-[154px] sm:w-[186px]"
                priority
              />
            </Link>
            <div className="hidden min-w-0 lg:block">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{copy.site.brand}</p>
              <p className="mt-1 text-sm text-[var(--mk-text-1)]">{copy.site.tagline}</p>
            </div>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1.5 rounded-full border border-[var(--mk-line-1)] bg-[rgba(255,255,255,0.7)] px-2 py-1 lg:flex"
          >
            {copy.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'site-nav-link mkt-focus-ring rounded-full px-4 py-2 text-[0.92rem] font-medium transition',
                    active ? 'site-nav-link-active' : 'site-nav-link-idle',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/proofbench" className={isMarketingRoute ? 'mkt-button-secondary mkt-button-compact' : 'mkt-button-primary mkt-button-compact'}>
              {copy.common.workbenchCta}
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
            <Link href="/contact" className="mkt-button-primary mkt-button-compact">
              {copy.common.primaryCta}
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-marketing-nav"
            onClick={() => setOpen((current) => !current)}
            className="mkt-menu-button mkt-focus-ring lg:hidden"
          >
            <span>{mobileMenuLabel}</span>
          </button>
        </div>

        {open ? (
          <div id="mobile-marketing-nav" className="border-t border-[var(--mk-line-1)] px-5 py-4 lg:hidden">
            <div className="mx-auto flex max-w-[88rem] flex-col gap-3">
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
                <Link href="/proofbench" className="mkt-button-secondary">
                  {copy.common.workbenchCta}
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
          </div>
        ) : null}
      </header>
    </>
  );
}
