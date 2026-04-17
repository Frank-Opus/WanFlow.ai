'use client';

import type { PlatformProjectBundle } from '@/lib/platform-types';
import type { BenchmarkOpsConsoleCopy, BenchmarkOpsViewIds } from '@dataflow/proofbench/lib/view-model';

type ProjectsPanelProps = {
  bundles: PlatformProjectBundle[];
  selectedProjectId: string;
  projectName: string;
  projectDescription: string;
  busyKey: string | null;
  ids: Pick<BenchmarkOpsViewIds, 'projectName' | 'projectDescription'>;
  copy: Pick<
    BenchmarkOpsConsoleCopy,
    'projectName' | 'projectDescription' | 'createProject' | 'refresh' | 'emptyProjects' | 'countSuffix'
  >;
  onProjectNameChange: (value: string) => void;
  onProjectDescriptionChange: (value: string) => void;
  onCreateProject: () => void;
  onRefresh: () => void;
  onSelectProject: (projectId: string) => void;
};

export default function ProjectsPanel({
  bundles,
  selectedProjectId,
  projectName,
  projectDescription,
  busyKey,
  ids,
  copy,
  onProjectNameChange,
  onProjectDescriptionChange,
  onCreateProject,
  onRefresh,
  onSelectProject,
}: ProjectsPanelProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={ids.projectName} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
            {copy.projectName}
          </label>
          <input
            id={ids.projectName}
            value={projectName}
            onChange={(event) => onProjectNameChange(event.target.value)}
            className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
            placeholder={copy.projectName}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor={ids.projectDescription}
            className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]"
          >
            {copy.projectDescription}
          </label>
          <input
            id={ids.projectDescription}
            value={projectDescription}
            onChange={(event) => onProjectDescriptionChange(event.target.value)}
            className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
            placeholder={copy.projectDescription}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onCreateProject} disabled={busyKey === 'project'} className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
          {busyKey === 'project' ? '...' : copy.createProject}
        </button>
        <button type="button" onClick={onRefresh} disabled={busyKey === 'loading'} className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
          {copy.refresh}
        </button>
      </div>

      <div className="surface-muted rounded-[24px] p-3">
        <div className="max-h-[24rem] space-y-3 overflow-y-auto pr-1">
          {bundles.length === 0 && (
            <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">
              {copy.emptyProjects}
            </div>
          )}
          {bundles.map((bundle) => {
            const active = bundle.project.id === selectedProjectId;
            return (
              <button
                key={bundle.project.id}
                type="button"
                onClick={() => onSelectProject(bundle.project.id)}
                aria-pressed={active}
                className={[
                  'w-full rounded-[20px] border px-5 py-5 text-left transition',
                  active
                    ? 'border-[rgba(21,70,199,0.22)] bg-[rgba(21,70,199,0.08)] shadow-[0_12px_28px_rgba(21,70,199,0.08)]'
                    : 'border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.94)]',
                ].join(' ')}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-ink">{bundle.project.name}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--mist)]">{bundle.project.description}</p>
                  </div>
                  <div className="surface-muted rounded-[12px] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--mist)]">
                    {bundle.problemItems.length} {copy.countSuffix}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
