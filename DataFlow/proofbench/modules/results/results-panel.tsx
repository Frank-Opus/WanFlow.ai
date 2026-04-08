'use client';

import type { PlatformArtifact, PlatformBenchmarkRun } from '@/lib/platform-types';
import type { ProofBenchArtifact } from '@/lib/benchmarkops';
import type { BenchmarkOpsConsoleCopy, BenchmarkOpsSectionIntro } from '@dataflow/proofbench/lib/view-model';

type ResultsPanelProps = {
  locale: 'zh' | 'en';
  recentRuns: PlatformBenchmarkRun[];
  artifactMap: Map<string, PlatformArtifact[]>;
  liveArtifact: ProofBenchArtifact | null;
  liveRunId: string | null;
  busyKey: string | null;
  resultsIntro: BenchmarkOpsSectionIntro;
  previewIntro: BenchmarkOpsSectionIntro;
  copy: Pick<
    BenchmarkOpsConsoleCopy,
    | 'refresh'
    | 'emptyRuns'
    | 'download'
    | 'preview'
    | 'runIdentifierLabel'
    | 'accuracy'
    | 'runCountLabel'
    | 'latencyLabel'
    | 'emptyPreview'
    | 'answerValidationTitle'
  >;
  onRefresh: () => void;
  onPreview: (run: PlatformBenchmarkRun) => void;
};

function SectionIntro({ intro }: { intro: BenchmarkOpsSectionIntro }) {
  return (
    <div className={intro.align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">{intro.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{intro.body}</p>
    </div>
  );
}

function statusLabel(locale: 'zh' | 'en', status: PlatformBenchmarkRun['status']) {
  const map = {
    zh: {
      queued: '排队中',
      running: '运行中',
      completed: '已完成',
      failed: '失败',
      cancelled: '已取消',
    },
    en: {
      queued: 'Queued',
      running: 'Running',
      completed: 'Completed',
      failed: 'Failed',
      cancelled: 'Cancelled',
    },
  };

  return map[locale][status];
}

function statusClass(status: PlatformBenchmarkRun['status']) {
  if (status === 'completed') return 'status-chip-success';
  if (status === 'failed') return 'status-chip-danger';
  if (status === 'running') return 'status-chip-info';
  return 'status-chip-warning';
}

function previewRunStatusLabel(locale: 'zh' | 'en', status: ProofBenchArtifact['runs'][number]['status']) {
  const map = {
    zh: {
      correct: '命中',
      incorrect: '未命中',
      timeout: '超时',
      error: '错误',
    },
    en: {
      correct: 'Correct',
      incorrect: 'Incorrect',
      timeout: 'Timeout',
      error: 'Error',
    },
  };

  return map[locale][status];
}

function formatDate(locale: 'zh' | 'en', value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return `${(value * 100).toFixed(1)}%`;
}

export default function ResultsPanel({
  locale,
  recentRuns,
  artifactMap,
  liveArtifact,
  liveRunId,
  busyKey,
  resultsIntro,
  previewIntro,
  copy,
  onRefresh,
  onPreview,
}: ResultsPanelProps) {
  return (
    <>
      <section className="panel rounded-[26px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <SectionIntro intro={resultsIntro} />
          <button type="button" onClick={onRefresh} className="btn-secondary rounded-[14px] px-4 py-2 text-sm font-semibold">
            {copy.refresh}
          </button>
        </div>
        <div className="surface-muted mt-6 rounded-[28px] p-3">
          <div className="max-h-[30rem] space-y-3 overflow-y-auto pr-1">
            {recentRuns.length === 0 && (
              <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">{copy.emptyRuns}</div>
            )}
            {recentRuns.map((run) => {
              const artifacts = artifactMap.get(run.id) ?? [];
              return (
                <article key={run.id} className="quiet-card rounded-[20px] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-ink">{run.modelName}</p>
                        <span className={['status-chip rounded-[12px] px-3 py-1 text-xs uppercase tracking-[0.16em]', statusClass(run.status)].join(' ')}>
                          {statusLabel(locale, run.status)}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]">
                        {copy.runIdentifierLabel} #{run.id}
                      </p>
                      <p className="text-sm text-[var(--mist)]">{formatDate(locale, run.createdAt)}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-ink">{formatPercent(run.scoreSummary?.accuracy)}</p>
                      <p className="mt-1 text-sm text-[var(--mist)]">{run.scoreSummary?.latencyBand ?? '—'}</p>
                    </div>
                  </div>

                  <div className="soft-rule mt-4 flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {artifacts.map((artifact) => (
                        <a
                          key={artifact.id}
                          href={`/api/platform/artifacts/download?artifactId=${artifact.id}`}
                          className="control-chip-sm rounded-[12px] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
                        >
                          {copy.download} · {artifact.kind}
                        </a>
                      ))}
                    </div>
                    {artifacts.some((artifact) => artifact.kind === 'json') && (
                      <button type="button" onClick={() => onPreview(run)} className="btn-secondary rounded-[14px] px-4 py-2 text-sm font-semibold">
                        {busyKey === `preview-${run.id}` ? '...' : copy.preview}
                      </button>
                    )}
                  </div>

                  {run.errorMessage ? <p className="status-danger mt-4 text-sm">{run.errorMessage}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="panel rounded-[26px] p-6 sm:p-8">
        <SectionIntro intro={previewIntro} />
        {!liveArtifact ? (
          <div className="mt-6 rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm leading-7 text-[var(--mist)]">{copy.emptyPreview}</div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.accuracy}</p>
                <p className="mt-3 text-[1.7rem] font-semibold text-ink">{formatPercent(liveArtifact.summary.accuracy)}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.runCountLabel}</p>
                <p className="mt-3 text-[1.7rem] font-semibold text-ink">{liveArtifact.summary.totalRuns}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.latencyLabel}</p>
                <p className="mt-3 text-lg font-semibold text-ink">{liveArtifact.summary.latencyBand}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="dark-card rounded-[24px] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.62)]">
                  {copy.runIdentifierLabel} #{liveRunId ?? liveArtifact.runId ?? '—'}
                </p>
                <p className="mt-3 text-2xl font-semibold">{liveArtifact.item.title}</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.76)]">{liveArtifact.item.question}</p>
                <div className="soft-rule mt-5 pt-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.62)]">{copy.answerValidationTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.84)]">{liveArtifact.item.finalAnswer}</p>
                </div>
              </div>

              <div className="quiet-card rounded-[24px] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-ink">{liveArtifact.summary.modelName}</p>
                  <p className="text-sm text-[var(--mist)]">{liveArtifact.summary.generatedAt}</p>
                </div>
                <div className="soft-rule mt-4 space-y-3 pt-4">
                  {liveArtifact.exportFiles.length === 0 ? (
                    <p className="text-sm leading-7 text-[var(--mist)]">{copy.emptyPreview}</p>
                  ) : (
                    liveArtifact.exportFiles.map((file) => (
                      <a
                        key={`${file.kind}-${file.relativePath}`}
                        href={file.downloadPath ?? '#'}
                        className="flex items-center justify-between gap-3 rounded-[20px] border border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.9)] px-4 py-3 text-sm text-ink"
                      >
                        <span>{file.label}</span>
                        <span className="text-[var(--mist)]">{copy.download}</span>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="surface-muted rounded-[24px] p-3">
              <div className="grid max-h-[28rem] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                {liveArtifact.runs.map((run) => (
                  <div key={run.runIndex} className="quiet-card rounded-[18px] px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-ink">{locale === 'zh' ? `运行 ${run.runIndex}` : `Run ${run.runIndex}`}</p>
                      <span
                        className={[
                          'status-chip rounded-[12px] px-3 py-1 text-xs uppercase tracking-[0.16em]',
                          run.status === 'correct'
                            ? 'status-chip-success'
                            : run.status === 'error'
                              ? 'status-chip-info'
                              : run.status === 'timeout'
                                ? 'status-chip-warning'
                                : 'status-chip-danger',
                        ].join(' ')}
                      >
                        {previewRunStatusLabel(locale, run.status)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{run.answer}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--mist)]">{run.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
