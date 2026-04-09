'use client';

import GovernancePanel from '@dataflow/proofbench/modules/governance/governance-panel';
import ItemsPanel from '@dataflow/proofbench/modules/items/items-panel';
import ProjectsPanel from '@dataflow/proofbench/modules/projects/projects-panel';
import ResultsPanel from '@dataflow/proofbench/modules/results/results-panel';
import RunsPanel from '@dataflow/proofbench/modules/runs/runs-panel';
import SourcesPanel from '@dataflow/proofbench/modules/sources/sources-panel';
import type { BenchmarkOpsSectionIntro } from '@dataflow/proofbench/lib/view-model';
import { useBenchmarkOpsConsole } from '@/components/platform/use-platform-console';
import { getBenchmarkOpsShellCopy } from '../lib/copy';
import {
  BENCHMARKOPS_FORMAL_PRODUCT_ID,
  BENCHMARKOPS_FORMAL_SHELL_TEST_ID,
  BENCHMARKOPS_FORMAL_TITLE_TEST_ID,
} from '../lib/constants';

function SectionIntro({ intro }: { intro: BenchmarkOpsSectionIntro }) {
  return (
    <div className={intro.align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">{intro.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{intro.body}</p>
    </div>
  );
}

function roleKeywordLabel(locale: 'zh' | 'en', role: 'owner' | 'admin' | 'operator' | 'viewer') {
  if (locale === 'zh') {
    return {
      owner: '负责人',
      admin: '管理员',
      operator: '操作员',
      viewer: '查看者',
    }[role];
  }
  return {
    owner: 'Owner',
    admin: 'Admin',
    operator: 'Operator',
    viewer: 'Viewer',
  }[role];
}

export default function BenchmarkOpsShell() {
  const shell = useBenchmarkOpsConsole();
  const shellCopy = getBenchmarkOpsShellCopy(shell.locale);
  const titleId = 'benchmarkops-shell-title';
  const { copy, viewModel } = shell;

  return (
    <section
      data-testid={BENCHMARKOPS_FORMAL_SHELL_TEST_ID}
      data-product-id={BENCHMARKOPS_FORMAL_PRODUCT_ID}
      aria-labelledby={titleId}
      className="space-y-6"
    >
      <header className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-slate-800 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{shellCopy.shellBadge}</p>
        <h2 id={titleId} data-testid={BENCHMARKOPS_FORMAL_TITLE_TEST_ID} className="mt-1 text-xl font-semibold sm:text-2xl">
          {shellCopy.formalTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{shellCopy.shellBody}</p>
      </header>

      <div className="space-y-7">
        <section className="panel-strong overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="hero-haze relative space-y-5">
              <p className="section-kicker">{copy.heroEyebrow}</p>
              <div className="space-y-3">
                <h1 className="display-face max-w-3xl text-[2.25rem] leading-[1.02] text-ink sm:text-[2.95rem] lg:text-[3.7rem]">
                  {copy.heroTitle}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-[1rem]">{copy.heroBody}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#run-center" className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                  {copy.heroPrimary}
                </a>
                <button type="button" onClick={shell.refreshProjects} className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
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
                <p className="mt-3 text-[1.4rem] font-semibold leading-snug">{viewModel.selectedBundle?.project.name ?? '—'}</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.74)]">
                  {viewModel.selectedBundle?.project.description ?? copy.emptyProjects}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[rgba(248,250,252,0.62)]">
                  {shell.currentUser
                    ? shell.locale === 'zh'
                      ? `当前登录：${shell.currentUser.name} · ${roleKeywordLabel(shell.locale, shell.currentUser.role)}`
                      : `Signed in: ${shell.currentUser.name} · ${roleKeywordLabel(shell.locale, shell.currentUser.role)}`
                    : shell.locale === 'zh'
                      ? '当前登录：未识别'
                      : 'Signed in: unknown'}
                </p>
                <div className="soft-rule mt-5 grid gap-4 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{copy.selectedItem}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{viewModel.selectedItem?.title ?? copy.emptyItems}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{copy.lastUpdate}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{viewModel.lastUpdatedText}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="quiet-card rounded-[20px] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.projectCountLabel}</p>
                  <p className="mt-3 text-[1.8rem] font-semibold text-ink">{viewModel.bundles.length}</p>
                </div>
                <div className="quiet-card rounded-[20px] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.itemCountLabel}</p>
                  <p className="mt-3 text-[1.8rem] font-semibold text-ink">{viewModel.selectedBundle?.problemItems.length ?? 0}</p>
                </div>
                <div className="quiet-card rounded-[20px] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.runCountLabel}</p>
                  <p className="mt-3 text-[1.8rem] font-semibold text-ink">{viewModel.selectedBundle?.benchmarkRuns.length ?? 0}</p>
                </div>
                <div className="quiet-card rounded-[20px] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{copy.artifactCountLabel}</p>
                  <p className="mt-3 text-[1.8rem] font-semibold text-ink">{viewModel.selectedBundle?.artifacts.length ?? 0}</p>
                </div>
              </div>

              <div className="surface-muted rounded-[20px] px-5 py-4 text-sm leading-7 text-[var(--mist)]">{copy.enterpriseNotice}</div>
            </div>
          </div>
        </section>

        {(viewModel.banner || viewModel.error) && (
          <div className="grid gap-3 lg:grid-cols-2">
            {viewModel.banner && (
              <div role="status" aria-live="polite" className="status-chip status-chip-success rounded-[24px] px-5 py-4 text-sm">
                {viewModel.banner}
              </div>
            )}
            {viewModel.error && (
              <div role="alert" aria-live="assertive" className="status-chip status-chip-danger rounded-[24px] px-5 py-4 text-sm">
                {viewModel.error}
              </div>
            )}
          </div>
        )}

        <div className="grid items-start gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="space-y-6">
            <RunsPanel
              selectedItem={viewModel.selectedItem}
              runConfig={viewModel.runConfig}
              busyKey={viewModel.busyKey}
              ids={shell.ids}
              intro={{ eyebrow: copy.runTitle, title: copy.runHeadline, body: copy.runBody }}
              copy={copy}
              onUpdateRunConfig={shell.updateRunConfig}
              onRun={shell.runBenchmark}
            />

            <ResultsPanel
              locale={shell.locale}
              recentRuns={viewModel.recentRuns}
              artifactMap={viewModel.artifactMap}
              liveArtifact={viewModel.liveArtifact}
              liveRunId={viewModel.liveRunId}
              busyKey={viewModel.busyKey}
              resultsIntro={{ eyebrow: copy.resultsTitle, title: copy.resultsHeadline, body: copy.resultsBody, align: 'compact' }}
              previewIntro={{ eyebrow: copy.previewTitle, title: copy.previewHeadline, body: copy.previewBody, align: 'compact' }}
              copy={copy}
              onRefresh={shell.refreshProjects}
              onPreview={shell.previewRun}
            />
          </div>

          <div className="space-y-6">
            <section className="panel rounded-[26px] p-6 sm:p-8">
              <div className="flex flex-col gap-5">
                <div role="tablist" aria-label={shell.locale === 'zh' ? '工作台分区' : 'Workspace sections'} className="surface-muted flex flex-wrap gap-2 rounded-[20px] p-2">
                  {shell.adminTabs.map((tab) => {
                    const active = viewModel.adminView === tab.key;
                    return (
                      <button
                        id={shell.adminTabId(tab.key)}
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-controls={shell.adminPanelId(tab.key)}
                        tabIndex={active ? 0 : -1}
                        onClick={() => shell.setAdminView(tab.key)}
                        onKeyDown={(event) => shell.handleAdminTabKeyDown(tab.key, event)}
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
                  <SectionIntro intro={shell.adminMeta[viewModel.adminView]} />
                  {viewModel.adminView === 'items' ? <p className="max-w-md text-sm leading-7 text-[var(--mist)]">{copy.manualItemHint}</p> : null}
                  {viewModel.adminView === 'sources' ? (
                    <div className="rounded-[14px] border border-[rgba(145,97,28,0.16)] bg-[rgba(145,97,28,0.06)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--brass)]">
                      {copy.supportedFiles}
                    </div>
                  ) : null}
                </div>

                <div id={shell.adminPanelId(viewModel.adminView)} role="tabpanel" aria-labelledby={shell.adminTabId(viewModel.adminView)} className="space-y-5">
                  {viewModel.adminView === 'projects' ? (
                    <ProjectsPanel
                      bundles={viewModel.bundles}
                      selectedProjectId={viewModel.selectedProjectId}
                      projectName={viewModel.projectName}
                      projectDescription={viewModel.projectDescription}
                      busyKey={viewModel.busyKey}
                      ids={shell.ids}
                      copy={copy}
                      onProjectNameChange={shell.setProjectName}
                      onProjectDescriptionChange={shell.setProjectDescription}
                      onCreateProject={shell.createProject}
                      onRefresh={shell.refreshProjects}
                      onSelectProject={shell.setSelectedProjectId}
                    />
                  ) : null}

                  {viewModel.adminView === 'items' ? (
                    <ItemsPanel
                      selectedBundle={viewModel.selectedBundle}
                      selectedItemId={viewModel.selectedItemId}
                      itemForm={viewModel.itemForm}
                      busyKey={viewModel.busyKey}
                      ids={shell.ids}
                      copy={copy}
                      onSelectItem={shell.setSelectedItemId}
                      onUpdateItemForm={shell.updateItemForm}
                      onCreateItem={shell.createItem}
                    />
                  ) : null}

                  {viewModel.adminView === 'sources' ? (
                    <SourcesPanel
                      locale={shell.locale}
                      selectedBundle={viewModel.selectedBundle}
                      busyKey={viewModel.busyKey}
                      ids={shell.ids}
                      fileInputRef={shell.fileInputRef}
                      folderInputRef={shell.folderInputRef}
                      copy={copy}
                      onTriggerUpload={shell.triggerUpload}
                      onFilesSelected={shell.uploadFiles}
                    />
                  ) : null}
                </div>
              </div>
            </section>

            <GovernancePanel
              locale={shell.locale}
              selectedBundle={viewModel.selectedBundle}
              currentUser={shell.currentUser}
              intro={{ eyebrow: copy.governanceTitle, title: copy.governanceHeadline, body: copy.governanceBody, align: 'compact' }}
              copy={copy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
