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
          <p className="mkt-kicker">{copy.site.tagline}</p>
          <Link href="/" className="site-brand-frame mkt-focus-ring inline-flex items-center rounded-[20px] px-3 py-2">
            <Image
              src="/brand/logo-wide.png"
              alt={copy.site.brandFull}
              width={220}
              height={75}
              className="h-auto w-[170px] sm:w-[204px]"
            />
          </Link>
          <p className="mkt-copy max-w-2xl">{copy.footer.description}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/contact" className="mkt-button-primary mkt-button-compact">
              {copy.common.primaryCta}
            </Link>
            <Link href="/dataflow/proofbench" className="mkt-button-secondary mkt-button-compact">
              {copy.common.workbenchCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {copy.footer.columns.map((column) => (
            <section key={column.title} className="mkt-rail-card space-y-3 p-4">
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--mk-text-2)]">{column.title}</h2>
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
        <div className="mkt-frame flex flex-col gap-2 px-5 py-4 text-sm text-[var(--mk-text-2)] sm:flex-row sm:items-center sm:justify-between lg:px-8 xl:px-10">
          <p>{copy.footer.copyright}</p>
          <p>{copy.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
