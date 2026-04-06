'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCopy, useLocale } from '@/components/shared/locale-provider';
import { siteMeta } from '@/lib/proofbench';

const navItems = [
  { href: '/', key: 'navHome' },
  { href: '/proofbench', key: 'navWorkbench' },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const text = useCopy();
  const badge = pathname === '/proofbench' ? text.header.workbenchBadge : text.header.homeBadge;

  return (
    <>
      <a
        href="#main-content"
        className="focus-ring sr-only z-50 rounded-full bg-[rgba(255,255,255,0.98)] px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {text.header.skip}
      </a>

      <header
        id="site-top"
        className="site-header-shell sticky top-0 z-40"
      >
        <div className="site-topline">
          <div className="flex w-full items-center justify-between gap-3 px-5 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--mist)] lg:px-8 xl:px-10">
            <p className="truncate">{text.header.tagline}</p>
            <span className="site-pill hidden rounded-[14px] px-3 py-1 text-[var(--ink-soft)] lg:inline-flex">
              {badge}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8 xl:px-10">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="site-brand-frame focus-ring inline-flex items-center rounded-[18px] px-3 py-2">
              <Image
                src="/brand/logo-wide.png"
                alt={`${siteMeta.brand} ${siteMeta.moduleName}`}
                width={220}
                height={75}
                className="h-auto w-[156px] sm:w-[188px]"
                priority
              />
            </Link>

            <div className="hidden min-w-0 lg:block">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mist)]">{siteMeta.brand}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{badge}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-2 sm:items-end lg:w-auto lg:items-end">
            <div className="flex w-full flex-wrap items-center gap-2 sm:justify-end lg:w-auto">
              <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'site-nav-link focus-ring rounded-[16px] px-3.5 py-2 text-[0.9rem] font-semibold transition',
                        isActive
                          ? 'site-nav-link-active'
                          : 'site-nav-link-idle',
                      ].join(' ')}
                    >
                      {text.header[item.key]}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-wrap items-center gap-2">
                <div className="site-pill hidden items-center gap-2 rounded-[14px] px-2.5 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--mist)] sm:inline-flex">
                  <span>{text.header.language}</span>
                </div>
                {(['zh', 'en'] as const).map((lang) => {
                  const active = locale === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLocale(lang)}
                      aria-pressed={active}
                      aria-label={`${text.header.language}: ${text.header[lang]}`}
                      className={[
                        'focus-ring min-h-[44px] rounded-[16px] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] transition',
                        active
                          ? 'bg-[rgba(21,70,199,0.96)] text-[var(--paper-strong)]'
                          : 'border border-[rgba(25,40,72,0.1)] bg-[rgba(255,255,255,0.96)] text-[var(--mist)] hover:text-ink',
                      ].join(' ')}
                    >
                      {text.header[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="site-pill rounded-[14px] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)] lg:hidden">
              {badge}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
