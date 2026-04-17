'use client';

import Link from 'next/link';
import { useCopy } from '@/components/shared/locale-provider';
import { seededArtifact, siteMeta } from '@/lib/benchmarkops';

export function Hero() {
  const text = useCopy();

  const spotlight = [
    { label: text.home.stats[0].label, value: `${(seededArtifact.summary.accuracy * 100).toFixed(1)}%`, detail: text.home.stats[0].detail },
    { label: text.home.stats[1].label, value: seededArtifact.summary.modelName, detail: text.home.stats[1].detail },
    { label: text.home.stats[2].label, value: 'JSON + XLSX', detail: text.home.stats[2].detail },
  ];

  return (
    <section className="hero-haze panel-strong relative overflow-hidden rounded-[36px] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
      <div className="liquid-orb right-[-4rem] top-[-3rem] h-40 w-40 bg-[rgba(184,137,24,0.22)]" />
      <div className="liquid-orb bottom-[-3rem] left-[18%] h-32 w-32 bg-[rgba(95,110,96,0.18)]" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(184,137,24,0.55)] to-transparent" />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="eyebrow">{text.home.heroEyebrow}</p>
            <h1 className="display-face max-w-4xl text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
              {text.home.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--mist)] sm:text-lg">{text.home.heroBody}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dataflow/proofbench" className="btn-primary focus-ring rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em]">
              {text.home.heroPrimary}
            </Link>
            <a href="#system" className="btn-secondary focus-ring rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em]">
              {text.home.heroSecondary}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {spotlight.map((item) => (
              <article key={item.label} className="rounded-[24px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.64)] p-4 shadow-card transition hover:-translate-y-1">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--mist)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel relative overflow-hidden rounded-[30px] p-6 sm:p-7">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(184,137,24,0.45)] to-transparent" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{text.home.spotlightTitle}</p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">QF3 Yang-Mills sample</h2>
            </div>
            <span className="rounded-full border border-[rgba(184,137,24,0.22)] bg-[rgba(184,137,24,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--brass)]">
              {text.home.bridge}
            </span>
          </div>

          <div className="mt-6 rounded-[26px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,251,245,0.78)] p-5">
            <p className="text-sm uppercase tracking-[0.26em] text-[var(--mist)]">{text.home.promptContract}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{seededArtifact.item.question}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.74)] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.home.endpoint}</p>
              <p className="mono-face mt-3 text-sm leading-6 text-ink">{seededArtifact.summary.endpoint}</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.74)] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.home.referenceAnswer}</p>
              <p className="mono-face mt-3 break-words text-sm leading-6 text-ink">{seededArtifact.item.finalAnswer}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
