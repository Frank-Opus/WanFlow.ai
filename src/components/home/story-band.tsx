import { benchmarkRuns, benchmarkSummary } from '@/data/proofbench';

const statusDetails = {
  correct: { label: 'Correct hits', color: 'bg-emerald-400' },
  incorrect: { label: 'Near misses', color: 'bg-amber-400' },
  timeout: { label: 'Timeouts', color: 'bg-rose-400' },
} as const;

const statusCounts = benchmarkRuns.reduce(
  (acc, run) => {
    acc[run.status] += 1;
    return acc;
  },
  { correct: 0, incorrect: 0, timeout: 0 },
);

const totalRuns = benchmarkRuns.length;

export function StoryBand() {
  return (
    <section className="panel rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/80 p-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="eyebrow">Benchmark narrative</p>
          <h2 className="display-face text-3xl sm:text-4xl text-white">
            ProofBench follows qwen3.5-plus through the rigorous QF3 Yang-Mills gauntlet.
          </h2>
          <p className="text-base text-slate-300">
            The dataset demands physics-grade precision, and the benchmark stresses both symbolic accuracy and latency.
            ProofBench surfaces the final-answer hit, the nonlinear terms that failed, and the latency bands so engineers can
            reconstruct each discrepancy when the model goes off-script.
          </p>
          <div className="rounded-3xl border border-white/5 bg-slate-950/70 p-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Story datapoints</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>
                <span className="font-semibold text-white">Dataset:</span> {benchmarkSummary.datasetName} – curated non-Abelian
                derivations built for editors.
              </li>
              <li>
                <span className="font-semibold text-white">Model:</span> {benchmarkSummary.modelName} at {benchmarkSummary.latencyBand}.
              </li>
              <li>
                <span className="font-semibold text-white">Endpoint:</span>{' '}
                <span className="font-mono text-emerald-300">{benchmarkSummary.endpoint}</span> – logs feed directly into
                ProofBench review queues.
              </li>
              <li>
                <span className="font-semibold text-white">Verdict:</span> {benchmarkSummary.correctCount} hits /{' '}
                {benchmarkSummary.totalRuns} runs with a {Math.round(benchmarkSummary.accuracy * 1000) / 10}% accuracy pulse.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Run statuses</p>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const detail = statusDetails[status as keyof typeof statusDetails];
              const width = totalRuns ? `${Math.round((count / totalRuns) * 100)}%` : '0%';
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{detail.label}</span>
                    <span className="text-white">{count} / {totalRuns}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`${detail.color} h-full rounded-full`} style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Each run is logged, exported, and reviewed.</p>
        </div>
      </div>
    </section>
  );
}
