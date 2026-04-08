import Link from 'next/link';
import type { ReactNode } from 'react';

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
    <section className="mkt-panel mkt-panel-strong mkt-grid-lines overflow-hidden px-6 py-9 sm:px-8 lg:px-12 lg:py-12 xl:px-14 xl:py-14">
      <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.32fr)_minmax(19rem,0.68fr)] lg:items-end lg:gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(22rem,0.6fr)] xl:gap-14">
        <div className="mkt-hero-copy max-w-[58rem] space-y-7">
          <p className="mkt-kicker mkt-hero-stage mkt-hero-stage-1">{eyebrow}</p>
          <div className="mkt-hero-stage mkt-hero-stage-2 space-y-5">
            <h1 className="mkt-display max-w-[11.5ch] text-balance xl:max-w-[13ch] 2xl:max-w-[13.5ch]">{title}</h1>
            <p className="mkt-copy max-w-2xl text-base sm:text-[1.08rem] xl:max-w-[48rem]">{body}</p>
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
          <aside className="mkt-rail-card mkt-hero-rail mkt-hero-stage mkt-hero-stage-4 w-full self-end p-5 sm:p-6 xl:max-w-[24rem] xl:p-7">
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
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[52rem] text-center' : 'max-w-[52rem]'}>
      <p className="mkt-kicker">{eyebrow}</p>
      <h2 className="mkt-title mt-5 text-balance">{title}</h2>
      {body ? <p className="mkt-copy mt-5 max-w-[44rem] text-[0.99rem] sm:text-base">{body}</p> : null}
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
    <section className="mkt-editorial-band mkt-grid-lines overflow-hidden px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 xl:gap-12">
        <div className="space-y-5">
          <p className="mkt-kicker">{eyebrow}</p>
          <h2 className="mkt-title max-w-[18ch] text-balance">{title}</h2>
          <p className="mkt-copy max-w-[48rem] text-[0.99rem] sm:text-base">{body}</p>
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
    <div className="mkt-proof-panel mkt-grid-lines p-5 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mkt-chip">BenchmarkOps</span>
          <span className="mkt-chip mkt-chip-subtle">{proofLabel}</span>
        </div>
        <h3 className="text-[1.32rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)] sm:text-[1.52rem]">
          {workbenchNote}
        </h3>
        <p className="mkt-copy text-sm">{proofNote}</p>
        <Link href="/proofbench" className="mkt-button-secondary inline-flex w-fit">{workbenchCta}</Link>
      </div>
    </div>
  );
}
