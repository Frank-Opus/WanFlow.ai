import Link from 'next/link';
import { qf3Item, workbookPreview } from '@/data/proofbench';

const previewColumns = workbookPreview[0].slice(0, 8);
const previewRow = workbookPreview[1].slice(0, 8);

export function SamplePreview() {
  return (
    <section className="panel space-y-8 rounded-[32px] border border-white/10 bg-slate-950/60 p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Sample preview</p>
          <h2 className="display-face text-3xl text-white">Refined workbook capture</h2>
        </div>
        <Link
          href="/proofbench"
          className="rounded-2xl border border-emerald-400/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-300"
        >
          Visit ProofBench
        </Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-400">Question focus</p>
            <p className="mt-3 text-base text-slate-200">{qf3Item.question}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Key points</p>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {qf3Item.keyPoints.map((point) => (
                <p key={point} className="leading-relaxed">
                  • {point}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Potential pitfalls</p>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {qf3Item.pitfalls.map((pitfall) => (
                <p key={pitfall} className="leading-relaxed">
                  – {pitfall}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Solution steps</p>
            <ol className="mt-4 space-y-2 text-sm text-slate-200">
              {qf3Item.solutionSteps.map((step, index) => (
                <li key={step}>
                  <span className="font-semibold text-white">{index + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Final answer</p>
            <p className="mono-face mt-3 text-2xl font-semibold text-white">{qf3Item.finalAnswer}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Workbook excerpt</p>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {previewColumns.map((header, index) => (
                <div
                  key={`${header}-${index}`}
                  className="flex justify-between border-b border-white/5 pb-2 text-xs uppercase tracking-[0.3em] text-slate-400 last:border-b-0 last:pb-0"
                >
                  <span>{header}</span>
                  <span className="text-sm text-white">{previewRow[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
