import { productStats } from '@/data/proofbench';

const capabilityHighlights = [
  {
    title: 'Contracted fields',
    stat: productStats[0].value,
    badge: productStats[0].label,
    detail: productStats[0].note,
  },
  {
    title: 'Sampling resilience',
    stat: productStats[1].value,
    badge: productStats[1].label,
    detail: productStats[1].note,
  },
  {
    title: 'Ready for review',
    stat: productStats[2].value,
    badge: productStats[2].label,
    detail: productStats[2].note,
  },
  {
    title: 'Accuracy lens',
    stat: productStats[3].value,
    badge: productStats[3].label,
    detail: productStats[3].note,
  },
];

const capabilityStories = [
  {
    title: 'Editorial rigor',
    description:
      'ProofBench keeps a curated question battery, so every benchmark is grounded in clear, shareable reasoning.',
  },
  {
    title: 'Human + machine review',
    description: 'Exports are ready for both XLSX reviewers and JSON pipelines so no insight is trapped in one view.',
  },
  {
    title: 'Outcome-first verification',
    description:
      'The accuracy lens focuses on final answer hits while still surfacing latency, metadata, and reasoning traces.',
  },
];

export function CapabilityGrid() {
  return (
    <section className="panel space-y-10 rounded-[32px] border border-white/10 bg-slate-950/60 p-8">
      <div className="space-y-3">
        <p className="eyebrow">Capabilities</p>
        <h2 className="display-face text-3xl sm:text-4xl text-white">ProofBench keeps evaluation premium, auditable, repeatable.</h2>
        <p className="text-base text-slate-300">
          Each card below surfaces the editorial + technical investments inside ProofBench: schema discipline, stable
          sampling, dual-format exports, and an accuracy-forward lens that resembles a print editorial review rather than a generic
          AI audit.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {capabilityHighlights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-[0_12px_30px_rgba(5,5,10,0.6)]">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">{item.badge}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-3xl font-semibold text-emerald-300">{item.stat}</p>
            <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {capabilityStories.map((story) => (
          <div key={story.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{story.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{story.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
