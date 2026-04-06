'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProductStat, ProofBenchArtifact } from '@/lib/proofbench';

function averageLatency(values: Array<number | null>): string {
  const usable = values.filter((value): value is number => typeof value === 'number');
  if (!usable.length) return 'n/a';
  return `${(usable.reduce((sum, value) => sum + value, 0) / usable.length).toFixed(2)}s`;
}

type SummaryCardsProps = {
  artifact: ProofBenchArtifact;
  productStats: ProductStat[];
};

export default function SummaryCards({ artifact, productStats }: SummaryCardsProps) {
  const text = useCopy();
  const timeoutCount = artifact.runs.filter((run) => run.status === 'timeout').length;

  const metrics = [
    {
      key: 'accuracy',
      value: `${(artifact.summary.accuracy * 100).toFixed(1)}%`,
      detail: text.workbench.metrics.accuracy.detail,
      label: text.workbench.metrics.accuracy.label,
    },
    {
      key: 'correctRuns',
      value: `${artifact.summary.correctCount}`,
      detail: text.workbench.metrics.correctRuns.detail,
      label: text.workbench.metrics.correctRuns.label,
    },
    {
      key: 'averageLatency',
      value: averageLatency(artifact.runs.map((run) => run.latencySeconds)),
      detail: text.workbench.metrics.averageLatency.detail,
      label: text.workbench.metrics.averageLatency.label,
    },
    {
      key: 'timeouts',
      value: `${timeoutCount}`,
      detail: text.workbench.metrics.timeouts.detail,
      label: text.workbench.metrics.timeouts.label,
    },
  ];

  return (
    <section className="panel rounded-[32px] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">{text.workbench.summaryEyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.summaryTitle}</h3>
        </div>
        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[var(--mist)]">
          {artifact.source === 'live' ? text.workbench.liveBenchmark : text.workbench.seededBenchmark}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <article key={metric.key} className="rounded-[24px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--mist)]">{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {productStats.map((stat) => {
          const meta = text.home.productStatMeta[stat.id];
          return (
            <article
              key={stat.id}
              className="rounded-[24px] border border-[rgba(30,58,138,0.08)] bg-[linear-gradient(180deg,rgba(248,250,252,0.9),rgba(239,246,255,0.7))] p-5"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{meta.label}</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{meta.value}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--mist)]">{meta.note}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
