'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProofBenchItem, ProofBenchValidation } from '@/lib/proofbench';

const toneMap = {
  PASS: 'border-[rgba(95,110,96,0.18)] bg-[rgba(95,110,96,0.08)] text-[var(--sage)]',
  FAIL: 'border-[rgba(159,77,63,0.18)] bg-[rgba(159,77,63,0.08)] text-[var(--clay)]',
  NEEDS_REVIEW: 'border-[rgba(245,158,11,0.22)] bg-[rgba(245,158,11,0.1)] text-[var(--signal)]',
} as const;

type ValidationRailProps = {
  validationResults: ProofBenchValidation[];
  item: ProofBenchItem;
};

export default function ValidationRail({ validationResults, item }: ValidationRailProps) {
  const text = useCopy();

  return (
    <section className="panel rounded-[32px] p-6 sm:p-8">
      <p className="eyebrow">{text.workbench.validationEyebrow}</p>
      <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.validationTitle}</h3>

      <div className="mt-6 space-y-4">
        {validationResults.map((result) => (
          <article key={result.rule} className="rounded-[24px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="mono-face text-xs text-[var(--mist)]">{result.rule}</p>
              <span className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${toneMap[result.status]}`}>
                {text.workbench.validationStatus[result.status]}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--mist)]">{result.detail}</p>
          </article>
        ))}
      </div>

      {item.validationNotes.length ? (
        <div className="mt-6 rounded-[24px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-5">
          <p className="eyebrow">{text.workbench.businessNotes}</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--mist)]">
            {item.validationNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
