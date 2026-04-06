'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProofBenchRun } from '@/lib/proofbench';

const toneMap = {
  correct: {
    badge: 'border-[rgba(95,110,96,0.22)] bg-[rgba(95,110,96,0.12)] text-[var(--sage)]',
    bar: 'bg-[linear-gradient(90deg,#5f6e60,#90a591)]',
  },
  incorrect: {
    badge: 'border-[rgba(159,77,63,0.18)] bg-[rgba(159,77,63,0.08)] text-[var(--clay)]',
    bar: 'bg-[linear-gradient(90deg,#9f4d3f,#c57b6c)]',
  },
  timeout: {
    badge: 'border-[rgba(245,158,11,0.22)] bg-[rgba(245,158,11,0.1)] text-[var(--signal)]',
    bar: 'bg-[linear-gradient(90deg,#f59e0b,#fbbf24)]',
  },
  error: {
    badge: 'border-[rgba(30,64,175,0.2)] bg-[rgba(30,64,175,0.08)] text-[var(--primary)]',
    bar: 'bg-[linear-gradient(90deg,#1d4ed8,#60a5fa)]',
  },
} as const;

type RunMatrixProps = {
  runs: ProofBenchRun[];
};

export default function RunMatrix({ runs }: RunMatrixProps) {
  const text = useCopy();
  const maxLatency = Math.max(...runs.map((run) => run.latencySeconds ?? 0), 0);
  const hitCount = runs.filter((run) => run.status === 'correct').length;

  return (
    <section className="panel rounded-[32px] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">{text.workbench.runMatrixEyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.runMatrixTitle}</h3>
        </div>
        <div className="text-right text-[0.72rem] uppercase tracking-[0.24em] text-[var(--mist)]">
          <p>{hitCount} / {runs.length} {text.workbench.normalizedHits}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {runs.map((run) => {
          const tone = toneMap[run.status];
          const width = maxLatency > 0 && run.latencySeconds ? `${(run.latencySeconds / maxLatency) * 100}%` : '0%';
          return (
            <article key={run.runIndex} className="rounded-[28px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-5 transition hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="mono-face text-xs text-[var(--mist)]">
                  {text.workbench.runPrefix} {String(run.runIndex).padStart(2, '0')}
                </p>
                <span className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>
                  {text.workbench.statusBadges[run.status]}
                </span>
              </div>

              <p className="mono-face mt-5 break-words text-sm leading-7 text-ink">{run.answer}</p>
              <p className="mt-4 text-xs leading-6 text-[var(--mist)]">{run.note}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--mist)]">
                {typeof run.latencySeconds === 'number'
                  ? `${text.workbench.latencyPrefix} ${run.latencySeconds.toFixed(2)}s`
                  : text.workbench.noLatency}
              </p>

              <div className="mt-4 h-1.5 rounded-full bg-[rgba(30,58,138,0.08)]">
                <div className={`h-full rounded-full ${tone.bar}`} style={{ width }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
