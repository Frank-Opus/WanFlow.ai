'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProofBenchArtifact } from '@/lib/proofbench';

type ExportPanelProps = {
  artifact: ProofBenchArtifact;
};

function getLocalizedFileLabel(label: string, fileName: string, text: ReturnType<typeof useCopy>['workbench']) {
  if (fileName.endsWith('.json')) return text.exportLabelMap.jsonArtifact;
  if (fileName.endsWith('.xlsx')) return text.exportLabelMap.workbookArtifact;
  if (fileName.includes('item')) return text.exportLabelMap.sourceItem;
  return label;
}

export default function ExportPanel({ artifact }: ExportPanelProps) {
  const text = useCopy();

  return (
    <section className="panel rounded-[32px] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{text.workbench.exportsEyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.exportsTitle}</h3>
        </div>
        <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--mist)]">runs/{artifact.runId ?? 'preview'}</div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {artifact.exportFiles.map((file) => {
            const localizedLabel = getLocalizedFileLabel(file.label, file.fileName, text.workbench);
            const content = (
              <>
                <div>
                  <p className="text-sm font-semibold text-ink">{localizedLabel}</p>
                  <p className="mono-face mt-2 text-xs leading-6 text-[var(--mist)]">{file.relativePath}</p>
                </div>
                <span className="rounded-full border border-[rgba(30,58,138,0.08)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--mist)]">
                  {file.downloadPath ? text.workbench.download : text.workbench.preview}
                </span>
              </>
            );

            return file.downloadPath ? (
              <a
                key={file.relativePath}
                href={file.downloadPath}
                className="focus-ring flex items-center justify-between gap-4 rounded-[22px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] px-4 py-4 transition hover:-translate-y-1"
              >
                {content}
              </a>
            ) : (
              <div
                key={file.relativePath}
                className="flex items-center justify-between gap-4 rounded-[22px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] px-4 py-4"
              >
                {content}
              </div>
            );
          })}
        </div>

        <div className="rounded-[26px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-5">
          <p className="eyebrow">{text.workbench.requestContract}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.itemPath}</p>
              <p className="mono-face mt-2 text-sm leading-6 text-ink">{artifact.requestConfig.itemJsonPath}</p>
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.endpoint}</p>
              <p className="mono-face mt-2 text-sm leading-6 text-ink">{artifact.requestConfig.baseUrl}</p>
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.runsParallelism}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{artifact.requestConfig.runs} / {artifact.requestConfig.parallelism}</p>
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.temperatureTokens}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{artifact.requestConfig.temperature} / {artifact.requestConfig.maxTokens}</p>
            </div>
          </div>

          <div className="soft-rule mt-5 pt-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.sourceFiles}</p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--mist)]">
              {artifact.item.sourceFiles.length ? artifact.item.sourceFiles.map((file) => <p key={file}>{file}</p>) : <p>{text.workbench.noSourceFiles}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
