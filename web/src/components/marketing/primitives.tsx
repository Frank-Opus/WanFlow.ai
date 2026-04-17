import Link from 'next/link';
import React, { type ReactNode } from 'react';

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
  eyebrowClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  primary: LinkTarget;
  secondary?: LinkTarget;
  aside?: ReactNode;
  eyebrowClassName?: string;
}) {
  const eyebrowClass = eyebrowClassName ? `mkt-kicker ${eyebrowClassName}` : 'mkt-kicker';

  return (
    <section className="mkt-panel mkt-panel-strong mkt-grid-lines overflow-hidden px-6 py-9 sm:px-8 lg:px-12 lg:py-12 xl:px-14 xl:py-14">
      <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.32fr)_minmax(19rem,0.68fr)] lg:items-end lg:gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(22rem,0.6fr)] xl:gap-14">
        <div className="mkt-hero-copy max-w-[58rem] space-y-7">
          <p className={`${eyebrowClass} mkt-hero-stage mkt-hero-stage-1`}>{eyebrow}</p>
          <div className="mkt-hero-stage mkt-hero-stage-2 space-y-5">
            <h1 className="mkt-display max-w-full text-balance sm:max-w-[11.5ch] xl:max-w-[13ch] 2xl:max-w-[13.5ch]">{title}</h1>
            <p className="mkt-copy max-w-full text-base sm:max-w-2xl sm:text-[1.08rem] xl:max-w-[48rem]">{body}</p>
          </div>
          <div className="mkt-hero-actions mkt-hero-stage mkt-hero-stage-3 flex flex-wrap gap-3">
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
        {aside ? (
          <aside className="mkt-pop-surface mkt-rail-card mkt-hero-rail mkt-hero-stage mkt-hero-stage-4 w-full self-end p-5 sm:p-6 xl:max-w-[24rem] xl:p-7">
            <div className="space-y-4">{aside}</div>
          </aside>
        ) : null}
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
  size = 'default',
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
  size?: 'default' | 'large';
}) {
  const eyebrowClass = size === 'large' ? 'mkt-kicker mkt-section-kicker-large' : 'mkt-kicker';
  const titleClass =
    size === 'large'
      ? 'mkt-title mt-3 max-w-full text-balance text-[1.82rem] leading-[1.06] sm:text-[2.18rem] lg:text-[2.7rem]'
      : 'mkt-title mt-5 max-w-full text-balance';

  return (
    <div className={align === 'center' ? 'mx-auto max-w-[52rem] text-center' : 'max-w-[52rem]'}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={titleClass}>{title}</h2>
      {body ? <p className="mkt-copy mt-5 max-w-full text-[0.99rem] sm:max-w-[44rem] sm:text-base">{body}</p> : null}
    </div>
  );
}

export function FinalCtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  size = 'default',
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: LinkTarget;
  secondary?: LinkTarget;
  size?: 'default' | 'large';
}) {
  const eyebrowClass = size === 'large' ? 'mkt-kicker mkt-section-kicker-large' : 'mkt-kicker';
  const titleClass =
    size === 'large'
      ? 'mkt-title mt-3 max-w-full text-balance sm:max-w-[20ch] text-[1.92rem] leading-[1.06] sm:text-[2.32rem] lg:text-[2.95rem]'
      : 'mkt-title max-w-full text-balance sm:max-w-[18ch]';

  return (
    <section className="mkt-pop-surface mkt-editorial-band mkt-grid-lines overflow-hidden px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 xl:gap-12">
        <div className="space-y-5">
          <p className={eyebrowClass}>{eyebrow}</p>
          <h2 className={titleClass}>{title}</h2>
          <p className="mkt-copy max-w-full text-[0.99rem] sm:max-w-[48rem] sm:text-base">{body}</p>
        </div>
        <div className="mkt-cta-actions flex flex-wrap gap-3 lg:justify-end lg:pb-1">
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

export function WorkbenchProofCard({
  proofLabel,
  workbenchNote,
  proofNote,
  workbenchCta,
}: {
  proofLabel: string;
  workbenchNote: string;
  proofNote: string;
  workbenchCta: string;
}) {
  return (
    <div className="mkt-pop-surface mkt-proof-panel mkt-grid-lines p-5 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mkt-chip">WanFlow BenchmarkOps</span>
          <span className="mkt-chip mkt-chip-subtle">{proofLabel}</span>
        </div>
        <h3 className="zh-card-title mkt-card-heading-lg">
          {workbenchNote}
        </h3>
        <p className="mkt-copy text-sm">{proofNote}</p>
        <Link href="/dataflow/proofbench" className="mkt-button-secondary inline-flex w-fit">{workbenchCta}</Link>
      </div>
    </div>
  );
}
