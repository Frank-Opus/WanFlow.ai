'use client';

import type { PlatformProblemItem } from '@/lib/platform-types';
import type {
  BenchmarkOpsConsoleCopy,
  BenchmarkOpsRunConfig,
  BenchmarkOpsSectionIntro,
  BenchmarkOpsViewIds,
} from '@dataflow/proofbench/lib/view-model';

type RunsPanelProps = {
  selectedItem: PlatformProblemItem | null;
  runConfig: BenchmarkOpsRunConfig;
  busyKey: string | null;
  ids: Pick<
    BenchmarkOpsViewIds,
    'runMode' | 'runModelName' | 'runBaseUrl' | 'runRuns' | 'runParallelism' | 'runTemperature' | 'runMaxTokens'
  >;
  intro: BenchmarkOpsSectionIntro;
  copy: Pick<
    BenchmarkOpsConsoleCopy,
    | 'selectedItem'
    | 'emptyItems'
    | 'runMode'
    | 'syncMode'
    | 'asyncMode'
    | 'modelName'
    | 'baseUrl'
    | 'runs'
    | 'parallelism'
    | 'temperature'
    | 'maxTokens'
    | 'startRun'
  >;
  onUpdateRunConfig: (patch: Partial<BenchmarkOpsRunConfig>) => void;
  onRun: () => void;
};

function SectionIntro({ intro }: { intro: BenchmarkOpsSectionIntro }) {
  return (
    <div className={intro.align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">
        {intro.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{intro.body}</p>
    </div>
  );
}

export default function RunsPanel({
  selectedItem,
  runConfig,
  busyKey,
  ids,
  intro,
  copy,
  onUpdateRunConfig,
  onRun,
}: RunsPanelProps) {
  const disabled = busyKey === 'run' || !selectedItem;

  return (
    <section id="run-center" className="panel rounded-[26px] p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-5">
          <SectionIntro intro={intro} />

          <div className="dark-card rounded-[24px] p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.62)]">
              {copy.selectedItem}
            </p>
            {selectedItem ? (
              <>
                <p className="mt-3 text-xl font-semibold">{selectedItem.title}</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.78)]">{selectedItem.prompt}</p>
              </>
            ) : (
              <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.78)]">{copy.emptyItems}</p>
            )}
          </div>
        </div>

        <div className="quiet-card rounded-[24px] p-5">
          <div className="grid gap-3">
            <div className="space-y-2">
              <label htmlFor={ids.runMode} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.runMode}
              </label>
              <select
                id={ids.runMode}
                value={runConfig.mode}
                onChange={(event) => onUpdateRunConfig({ mode: event.target.value as BenchmarkOpsRunConfig['mode'] })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
              >
                <option value="sync">{copy.syncMode}</option>
                <option value="async">{copy.asyncMode}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor={ids.runModelName} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.modelName}
              </label>
              <input
                id={ids.runModelName}
                value={runConfig.modelName}
                onChange={(event) => onUpdateRunConfig({ modelName: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.modelName}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={ids.runBaseUrl} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.baseUrl}
              </label>
              <input
                id={ids.runBaseUrl}
                value={runConfig.baseUrl}
                onChange={(event) => onUpdateRunConfig({ baseUrl: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.baseUrl}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor={ids.runRuns} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                  {copy.runs}
                </label>
                <input
                  id={ids.runRuns}
                  type="number"
                  min={1}
                  value={runConfig.runs}
                  onChange={(event) => onUpdateRunConfig({ runs: Math.max(1, Number(event.target.value) || 1) })}
                  className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={ids.runParallelism} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                  {copy.parallelism}
                </label>
                <input
                  id={ids.runParallelism}
                  type="number"
                  min={1}
                  value={runConfig.parallelism}
                  onChange={(event) => onUpdateRunConfig({ parallelism: Math.max(1, Number(event.target.value) || 1) })}
                  className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={ids.runTemperature} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                  {copy.temperature}
                </label>
                <input
                  id={ids.runTemperature}
                  type="number"
                  min={0}
                  max={2}
                  step="0.1"
                  value={runConfig.temperature}
                  onChange={(event) => onUpdateRunConfig({ temperature: Math.max(0, Number(event.target.value) || 0) })}
                  className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={ids.runMaxTokens} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                  {copy.maxTokens}
                </label>
                <input
                  id={ids.runMaxTokens}
                  type="number"
                  min={1}
                  step={1}
                  value={runConfig.maxTokens}
                  onChange={(event) => onUpdateRunConfig({ maxTokens: Math.max(1, Number(event.target.value) || 1) })}
                  className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onRun}
              disabled={disabled}
              className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busyKey === 'run' ? '...' : copy.startRun}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
