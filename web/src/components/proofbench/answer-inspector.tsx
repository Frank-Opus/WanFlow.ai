'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProofBenchItem, ProofBenchRun } from '@/lib/proofbench';

type AnswerInspectorProps = {
  item: ProofBenchItem;
  runs: ProofBenchRun[];
};

export default function AnswerInspector({ item, runs }: AnswerInspectorProps) {
  const text = useCopy();
  const matchedRun = runs.find((run) => run.status === 'correct');
  const missedRun = runs.find((run) => run.status === 'error') ?? runs.find((run) => run.status !== 'correct');

  return (
    <section className="panel rounded-[32px] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{text.workbench.answerInspectorEyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.answerInspectorTitle}</h3>
        </div>
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.normalizationTarget}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="rounded-[26px] border border-[rgba(245,158,11,0.22)] bg-[rgba(245,158,11,0.08)] p-5">
          <p className="eyebrow">{text.workbench.groundTruth}</p>
          <p className="mono-face mt-4 break-words text-lg text-ink">{item.finalAnswer}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{text.workbench.canonicalHint}</p>
        </article>

        <article className="rounded-[26px] border border-[rgba(95,110,96,0.18)] bg-[rgba(95,110,96,0.08)] p-5">
          <p className="eyebrow">{text.workbench.matchedRun}</p>
          <p className="mono-face mt-4 break-words text-lg text-ink">{matchedRun?.answer ?? text.workbench.noMatchedRun}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{matchedRun?.note ?? text.workbench.compareHint}</p>
        </article>

        <article className="rounded-[26px] border border-[rgba(159,77,63,0.18)] bg-[rgba(159,77,63,0.08)] p-5">
          <p className="eyebrow">{text.workbench.nonMatchRun}</p>
          <p className="mono-face mt-4 break-words text-lg text-ink">{missedRun?.answer ?? text.workbench.noMissRun}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{missedRun?.note ?? text.workbench.missHint}</p>
        </article>
      </div>
    </section>
  );
}
