'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

export default function SiteFooter() {
  const { locale } = useLocale();
  const copy = getMarketingCopy(locale);

  return (
    <footer className="mt-16 border-t border-[var(--mk-line-1)] bg-[linear-gradient(180deg,rgba(244,249,251,0.95),rgba(229,239,244,0.92))]">
      <div className="mkt-frame grid gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 xl:px-10 xl:py-12">
        <div className="space-y-5">
          <p className="mkt-kicker mkt-section-kicker-large">{copy.site.tagline}</p>
          <Link href="/" className="site-brand-frame mkt-focus-ring inline-flex items-center rounded-[20px] px-3 py-2">
            <Image
              src="/brand/logo-wide.png"
              alt={copy.site.brandFull}
              width={340}
              height={100}
              className="h-auto w-[170px] sm:w-[204px]"
            />
          </Link>
          <p className="mkt-copy max-w-2xl">{copy.footer.description}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/contact" className="mkt-button-primary mkt-button-compact">
              {copy.common.primaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {copy.footer.columns.map((column) => (
            <section key={column.title} className="mkt-rail-card space-y-3 p-4">
              <h2 className="mkt-meta-label">{column.title}</h2>
              <div className="space-y-2 text-sm text-[var(--mk-text-1)]">
                {column.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--mk-line-1)] bg-[rgba(255,255,255,0.6)]">
        <div className="mkt-frame flex flex-col gap-3 px-5 py-4 text-sm text-[var(--mk-text-2)] lg:px-8 xl:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>{copy.footer.companyName}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {copy.footer.legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="mkt-focus-ring underline-offset-4 transition hover:text-[var(--mk-text-0)] hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>{copy.footer.copyright}</p>
            <p>{copy.footer.legal}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
