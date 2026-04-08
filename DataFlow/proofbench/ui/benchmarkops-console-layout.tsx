'use client';

import GovernancePanel from '@dataflow/proofbench/modules/governance/governance-panel';
import ItemsPanel from '@dataflow/proofbench/modules/items/items-panel';
import ProjectsPanel from '@dataflow/proofbench/modules/projects/projects-panel';
import ResultsPanel from '@dataflow/proofbench/modules/results/results-panel';
import RunsPanel from '@dataflow/proofbench/modules/runs/runs-panel';
import SourcesPanel from '@dataflow/proofbench/modules/sources/sources-panel';
import type { BenchmarkOpsSectionIntro, BenchmarkOpsViewModel } from '@dataflow/proofbench/lib/view-model';

type BenchmarkOpsConsoleLayoutProps = {
  viewModel: BenchmarkOpsViewModel;
};

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

function SectionIntro({ intro }: { intro: BenchmarkOpsSectionIntro }) {
  return (
    <div className={intro.align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">{intro.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{intro.body}</p>
    </div>
  );
}

export default function BenchmarkOpsConsoleLayout({ viewModel }: BenchmarkOpsConsoleLayoutProps) {
  const {
    locale,
    copy,
    ids,
    bundles,
    selectedProjectId,
    selectedItemId,
    selectedBundle,
    selectedItem,
    adminView,
    adminMeta,
    adminTabs,
    runConfig,
    projectName,
    projectDescription,
    itemForm,
    banner,
    error,
    busyKey,
    liveArtifact,
    liveRunId,
    artifactMap,
    recentRuns,
    latestRun,
    fileInputRef,
    folderInputRef,
    actions,
  } = viewModel;

  return (
    <div className="space-y-7">
      <section className="panel-strong overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="hero-haze relative space-y-5">
            <p className="section-kicker">{copy.heroEyebrow}</p>
            <div className="space-y-3">
              <h1 className="display-face max-w-3xl text-[2.25rem] leading-[1.02] text-ink sm:text-[2.95rem] lg:text-[3.7rem]">{copy.heroTitle}</h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-[1rem]">{copy.heroBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#run-center" className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                {copy.heroPrimary}
              </a>
              <button
                type="button"
                onClick={() => void actions.refreshProjects()}
                className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold"
              >
                {copy.heroSecondary}
              </button>
            </div>
            <div className="surface-shell rounded-[22px]">
              {copy.summaryCards.map((card, index) => (
                <div
                  key={card.label}
                  className={[
                    'grid gap-2 px-4 py-3 sm:grid-cols-[8rem_1fr]',
                    index > 0 ? 'border-t border-[rgba(25,40,72,0.08)]' : '',
                  ].join(' ')}
                >
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mist)]">{card.label}</p>
                  <p className="text-sm text-[var(--ink-soft)]">{card.hint}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="dark-card rounded-[24px] p-6 shadow-[0_20px_42px_rgba(18,25,38,0.14)]">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgba(248,250,252,0.62)]">{copy.selectedProject}</p>
              <p className="mt-3 text-[1.4rem] font-semibold leading-snug">{selectedBundle?.project.name ?? '—'}</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.74)]">{selectedBundle?.project.description ?? copy.emptyProjects}</p>
              <div className="soft-rule mt-5 grid gap-4 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{copy.selectedItem}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{selectedItem?.title ?? copy.emptyItems}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{copy.lastUpdate}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">
                    {formatDate(locale, latestRun?.createdAt ?? selectedBundle?.project.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.projectCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{bundles.length}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.itemCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.problemItems.length ?? 0}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.runCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.benchmarkRuns.length ?? 0}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.artifactCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.artifacts.length ?? 0}</p>
              </div>
            </div>

            <div className="surface-muted rounded-[20px] px-5 py-4 text-sm leading-7 text-[var(--mist)]">{copy.enterpriseNotice}</div>
          </div>
        </div>
      </section>

      {(banner || error) && (
        <div className="grid gap-3 lg:grid-cols-2">
          {banner && (
            <div role="status" aria-live="polite" className="status-chip status-chip-success rounded-[24px] px-5 py-4 text-sm">
              {banner}
            </div>
          )}
          {error && (
            <div role="alert" aria-live="assertive" className="status-chip status-chip-danger rounded-[24px] px-5 py-4 text-sm">
              {error}
            </div>
          )}
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="space-y-6">
          <RunsPanel
            selectedItem={selectedItem}
            runConfig={runConfig}
            busyKey={busyKey}
            ids={ids}
            intro={{ eyebrow: copy.runTitle, title: copy.runHeadline, body: copy.runBody }}
            copy={copy}
            onUpdateRunConfig={actions.updateRunConfig}
            onRun={() => void actions.runBenchmark()}
          />

          <ResultsPanel
            locale={locale}
            recentRuns={recentRuns}
            artifactMap={artifactMap}
            liveArtifact={liveArtifact}
            liveRunId={liveRunId}
            busyKey={busyKey}
            resultsIntro={{ eyebrow: copy.resultsTitle, title: copy.resultsHeadline, body: copy.resultsBody, align: 'compact' }}
            previewIntro={{ eyebrow: copy.previewTitle, title: copy.previewHeadline, body: copy.previewBody, align: 'compact' }}
            copy={copy}
            onRefresh={() => void actions.refreshProjects()}
            onPreview={(run) => void actions.previewRun(run)}
          />
        </div>

        <div className="space-y-6">
          <section className="panel rounded-[26px] p-6 sm:p-8">
            <div className="flex flex-col gap-5">
              <div role="tablist" aria-label={locale === 'zh' ? '工作台分区' : 'Workspace sections'} className="surface-muted flex flex-wrap gap-2 rounded-[20px] p-2">
                {adminTabs.map((tab) => {
                  const active = adminView === tab.key;
                  return (
                    <button
                      id={actions.adminTabId(tab.key)}
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls={actions.adminPanelId(tab.key)}
                      tabIndex={active ? 0 : -1}
                      onClick={() => actions.selectAdminView(tab.key)}
                      onKeyDown={(event) => actions.handleAdminTabKeyDown(tab.key, event)}
                      className={[
                        'control-chip rounded-[14px] px-4 py-2 text-sm font-semibold transition',
                        active
                          ? 'bg-[rgba(18,25,38,0.94)] text-[var(--paper)] shadow-[0_12px_28px_rgba(18,25,38,0.14)]'
                          : 'border-transparent bg-transparent text-[var(--mist)] hover:bg-[rgba(255,255,255,0.82)] hover:text-ink',
                      ].join(' ')}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <SectionIntro intro={adminMeta[adminView]} />
                {adminView === 'items' ? <p className="max-w-md text-sm leading-7 text-[var(--mist)]">{copy.manualItemHint}</p> : null}
                {adminView === 'sources' ? (
                  <div className="rounded-[14px] border border-[rgba(145,97,28,0.16)] bg-[rgba(145,97,28,0.06)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--brass)]">
                    {copy.supportedFiles}
                  </div>
                ) : null}
              </div>

              <div id={actions.adminPanelId(adminView)} role="tabpanel" aria-labelledby={actions.adminTabId(adminView)} className="space-y-5">
                {adminView === 'projects' ? (
                  <ProjectsPanel
                    bundles={bundles}
                    selectedProjectId={selectedProjectId}
                    projectName={projectName}
                    projectDescription={projectDescription}
                    busyKey={busyKey}
                    ids={ids}
                    copy={copy}
                    onProjectNameChange={actions.updateProjectName}
                    onProjectDescriptionChange={actions.updateProjectDescription}
                    onCreateProject={() => void actions.createProject()}
                    onRefresh={() => void actions.refreshProjects()}
                    onSelectProject={actions.selectProject}
                  />
                ) : null}

                {adminView === 'items' ? (
                  <ItemsPanel
                    selectedBundle={selectedBundle}
                    selectedItemId={selectedItemId}
                    itemForm={itemForm}
                    busyKey={busyKey}
                    ids={ids}
                    copy={copy}
                    onSelectItem={actions.selectItem}
                    onUpdateItemForm={actions.updateItemForm}
                    onCreateItem={() => void actions.createItem()}
                  />
                ) : null}

                {adminView === 'sources' ? (
                  <SourcesPanel
                    locale={locale}
                    selectedBundle={selectedBundle}
                    busyKey={busyKey}
                    ids={ids}
                    fileInputRef={fileInputRef}
                    folderInputRef={folderInputRef}
                    copy={copy}
                    onTriggerUpload={actions.triggerUpload}
                    onFilesSelected={(files) => void actions.uploadFiles(files)}
                  />
                ) : null}
              </div>
            </div>
          </section>

          <GovernancePanel
            locale={locale}
            selectedBundle={selectedBundle}
            intro={{ eyebrow: copy.governanceTitle, title: copy.governanceHeadline, body: copy.governanceBody, align: 'compact' }}
            copy={copy}
          />
        </div>
      </div>
    </div>
  );
}
