'use client';

import Link from 'next/link';
import { useCopy } from '@/components/shared/locale-provider';
import { seededArtifact } from '@/lib/proofbench';

export function SamplePreview() {
  const text = useCopy();
  const spotlight = seededArtifact.runs.slice(0, 3);

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="panel rounded-[34px] p-6 sm:p-8">
        <p className="eyebrow">{text.home.sampleEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">{seededArtifact.item.title}</h2>
        <p className="mt-5 text-sm leading-7 text-[var(--mist)]">{seededArtifact.item.question}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {seededArtifact.item.keyPoints.map((point) => (
            <span
              key={point}
              className="rounded-full border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.7)] px-3 py-1 text-xs text-[var(--mist)]"
            >
              {point}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[rgba(184,137,24,0.22)] bg-[rgba(184,137,24,0.08)] p-5">
          <p className="eyebrow">{text.home.groundTruth}</p>
          <p className="mono-face mt-3 break-words text-lg text-ink">{seededArtifact.item.finalAnswer}</p>
        </div>
      </article>

      <article className="panel rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{text.home.resultTeaser}</p>
            <h3 className="mt-3 text-2xl font-semibold text-ink">{text.home.sampleRunsTitle}</h3>
          </div>
          <Link href="/proofbench" className="btn-secondary focus-ring rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
            {text.home.sampleCta}
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {spotlight.map((run) => (
            <article key={run.runIndex} className="rounded-[24px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.74)] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="mono-face text-xs text-[var(--mist)]">
                  {text.workbench.runPrefix} {String(run.runIndex).padStart(2, '0')}
                </p>
                <span className="rounded-full border border-[rgba(23,18,15,0.08)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-ink">
                  {text.home.statusMap[run.status]}
                </span>
              </div>
              <p className="mono-face mt-4 break-words text-sm leading-6 text-ink">{run.answer}</p>
              <p className="mt-3 text-xs leading-6 text-[var(--mist)]">{run.note}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
