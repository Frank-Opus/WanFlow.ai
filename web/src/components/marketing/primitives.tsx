'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

export function useMarketingCopy() {
  const { locale } = useLocale();
  return getMarketingCopy(locale);
}

type LinkTarget = {
  href: string;
  label: string;
};

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  aside,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: LinkTarget;
  secondary?: LinkTarget;
  aside?: ReactNode;
}) {
  return (
    <section className="mkt-panel mkt-panel-strong mkt-grid-lines overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="relative z-[1] space-y-6">
          <p className="mkt-kicker">{eyebrow}</p>
          <div className="space-y-4">
            <h1 className="mkt-display max-w-5xl">{title}</h1>
            <p className="mkt-copy max-w-3xl text-base sm:text-lg">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={primary.href} className="mkt-button-primary">
              {primary.label}
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="mkt-button-secondary">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
        {aside ? <div className="relative z-[1]">{aside}</div> : null}
      </div>
      <div className="mkt-orb mkt-orb-cyan" />
      <div className="mkt-orb mkt-orb-teal" />
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mkt-kicker">{eyebrow}</p>
      <h2 className="mkt-title mt-4">{title}</h2>
      {body ? <p className="mkt-copy mt-4">{body}</p> : null}
    </div>
  );
}

export function FinalCtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: LinkTarget;
  secondary?: LinkTarget;
}) {
  return (
    <section className="mkt-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-4">
          <p className="mkt-kicker">{eyebrow}</p>
          <h2 className="mkt-title max-w-4xl">{title}</h2>
          <p className="mkt-copy max-w-3xl">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href={primary.href} className="mkt-button-primary">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="mkt-button-secondary">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function WorkbenchProofCard() {
  const copy = useMarketingCopy();
  return (
    <div className="mkt-proof-panel">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mkt-chip">BenchmarkOps</span>
          <span className="mkt-chip mkt-chip-subtle">{copy.common.proofLabel}</span>
        </div>
        <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)] sm:text-[1.6rem]">
          {copy.common.workbenchNote}
        </h3>
        <p className="mkt-copy text-sm">{copy.common.proofNote}</p>
        <Link href="/proofbench" className="mkt-button-secondary inline-flex w-fit">
          {copy.common.workbenchCta}
        </Link>
      </div>
    </div>
  );
}
