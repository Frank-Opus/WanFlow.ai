'use client';

import { useCopy } from '@/components/shared/locale-provider';
import type { ProofBenchArtifact, ProofBenchRequestConfig, ProofBenchRunResponse, SiteMeta } from '@/lib/proofbench';

type ConfigPanelProps = {
  siteMeta: SiteMeta;
  artifact: ProofBenchArtifact;
  config: ProofBenchRequestConfig;
  loading: boolean;
  error: string | null;
  diagnostics: ProofBenchRunResponse['diagnostics'] | null;
  onConfigChange: <K extends keyof ProofBenchRequestConfig>(key: K, value: ProofBenchRequestConfig[K]) => void;
  onRun: () => void;
  onReset: () => void;
};

const fieldOrder: Array<keyof ProofBenchRequestConfig> = [
  'itemJsonPath',
  'baseUrl',
  'modelName',
  'runs',
  'parallelism',
  'temperature',
  'maxTokens',
];

export default function ConfigPanel({
  siteMeta,
  artifact,
  config,
  loading,
  error,
  diagnostics,
  onConfigChange,
  onRun,
  onReset,
}: ConfigPanelProps) {
  const text = useCopy();
  const fields = fieldOrder.map((key) => ({
    key,
    type: key === 'itemJsonPath' || key === 'baseUrl' || key === 'modelName' ? 'text' : 'number',
    step: key === 'temperature' ? '0.1' : undefined,
    ...text.workbench.fields[key],
  }));

  const accuracyLabel = `${Math.round(artifact.summary.accuracy * 100)}% ${text.workbench.accuracySuffix}`;
  const coverageLabel = `${artifact.summary.correctCount}/${artifact.summary.totalRuns} ${text.workbench.validatedHits}`;
  const modeLabel = artifact.source === 'live' ? text.workbench.liveArtifact : text.workbench.seededPreview;

  return (
    <section className="panel-strong relative overflow-hidden rounded-[34px] p-6 sm:p-8">
      <div className="liquid-orb right-[-2rem] top-[-1rem] h-28 w-28 bg-[rgba(184,137,24,0.18)]" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(30,64,175,0.3)] to-transparent" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow">{siteMeta.brand} · {siteMeta.moduleName}</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{text.workbench.controlPlaneTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-base">{text.workbench.controlPlaneBody}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[rgba(245,158,11,0.22)] bg-[rgba(245,158,11,0.1)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--signal)]">
            {modeLabel}
          </span>
          <span className="rounded-full border border-[rgba(30,58,138,0.12)] bg-[rgba(248,250,252,0.88)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--mist)]">
            {artifact.summary.modelName}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.key} className="rounded-[24px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.86)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
              <span className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{field.label}</span>
              {field.type === 'number' ? (
                <input
                  className="input-shell focus-ring mt-3 w-full rounded-2xl px-4 py-3"
                  type="number"
                  step={field.step}
                  value={config[field.key] as number}
                  onChange={(event) => onConfigChange(field.key, Number(event.target.value) as never)}
                />
              ) : (
                <input
                  className="input-shell focus-ring mt-3 w-full rounded-2xl px-4 py-3"
                  type="text"
                  value={config[field.key] as string}
                  onChange={(event) => onConfigChange(field.key, event.target.value as never)}
                />
              )}
              <p className="mt-2 text-xs leading-5 text-[var(--mist)]">{field.helper}</p>
            </label>
          ))}
        </div>

        <aside className="panel relative overflow-hidden rounded-[28px] p-5 sm:p-6">
          <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(30,64,175,0.25)] to-transparent" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{text.workbench.runSnapshot}</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{accuracyLabel}</p>
            </div>
            <span className="rounded-full border border-[rgba(30,58,138,0.08)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">
              {coverageLabel}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(30,58,138,0.08)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#1e40af,#3b82f6,#f59e0b)]"
              style={{ width: `${Math.min(Math.round(artifact.summary.accuracy * 100), 100)}%` }}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.latencyBand}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{artifact.summary.latencyBand}</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.generated}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{new Date(artifact.summary.generatedAt).toLocaleString()}</p>
            </div>
          </div>

          {diagnostics ? (
            <div className="mt-5 rounded-[22px] border border-[rgba(30,58,138,0.08)] bg-[rgba(248,250,252,0.8)] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.lastExecution}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{text.workbench.duration} {(diagnostics.durationMs / 1000).toFixed(1)}s</p>
              {diagnostics.stderr ? <p className="mt-2 text-xs leading-5 text-[var(--clay)]">{diagnostics.stderr}</p> : null}
            </div>
          ) : null}
        </aside>
      </div>

      {error ? (
        <div className="mt-5 rounded-[24px] border border-[rgba(159,77,63,0.18)] bg-[rgba(159,77,63,0.08)] px-5 py-4 text-sm leading-7 text-[var(--clay)]">
          {error}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRun}
          disabled={loading}
          className="btn-primary focus-ring rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em]"
        >
          {loading ? text.workbench.running : text.workbench.runSweep}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="btn-secondary focus-ring rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em]"
        >
          {text.workbench.resetSample}
        </button>
      </div>
    </section>
  );
}
