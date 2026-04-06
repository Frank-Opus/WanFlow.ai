'use client';

import Link from 'next/link';
import { useCopy } from '@/components/shared/locale-provider';
import { productStats } from '@/lib/proofbench';

export function CapabilityGrid() {
  const text = useCopy();

  return (
    <section className="panel-strong overflow-hidden rounded-[34px] px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow">{text.home.systemEyebrow}</p>
          <h2 className="display-face mt-3 text-4xl text-ink sm:text-5xl">{text.home.systemTitle}</h2>
        </div>
        <Link href="/proofbench" className="btn-secondary focus-ring inline-flex w-fit rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em]">
          {text.home.systemCta}
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {text.home.pillars.map((pillar, index) => (
            <article key={pillar.title} className="panel rounded-[28px] p-6 transition hover:-translate-y-1">
              <p className="mono-face text-xs text-[var(--brass)]">0{index + 1}</p>
              <h3 className="mt-6 text-2xl font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{pillar.body}</p>
            </article>
          ))}
        </div>

        <aside className="panel rounded-[30px] p-6">
          <p className="eyebrow">{text.home.operationalProfile}</p>
          <div className="mt-6 space-y-4">
            {productStats.map((stat) => {
              const meta = text.home.productStatMeta[stat.id];
              return (
                <article key={stat.id} className="rounded-[24px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.72)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{meta.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-ink">{meta.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--mist)]">{meta.note}</p>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
