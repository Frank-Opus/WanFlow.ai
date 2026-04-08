'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { BENCHMARKOPS_PRODUCT_TITLE } from '@dataflow/proofbench/lib/constants';
import {
  benchmarkOpsAdminViews,
  type BenchmarkOpsAdminTab,
  type BenchmarkOpsAdminView,
  type BenchmarkOpsConsoleCopy,
  type BenchmarkOpsItemDraft,
  type BenchmarkOpsRunConfig,
  type BenchmarkOpsSectionIntro,
  type BenchmarkOpsViewIds,
  type BenchmarkOpsViewModel,
} from '@dataflow/proofbench/lib/view-model';
import { useLocale } from '@/components/shared/locale-provider';
import { buildArtifactFromFrameworkJson, type ProofBenchArtifact, type ProofBenchExport } from '@/lib/benchmarkops';
import type {
  PlatformArtifact,
  PlatformBenchmarkRun,
  PlatformProjectBundle,
  PlatformProblemItem,
} from '@/lib/platform-types';

const DISPLAY_MODEL = 'Qwen/Qwen3-235B-A22B-Thinking-2507';
const DEFAULT_BASE_URL = 'http://35.220.164.252:3888/v1/';

const COPY: Record<'zh' | 'en', BenchmarkOpsConsoleCopy> = {
  zh: {
    heroEyebrow: 'WanFlow.ai 主版块',
    heroTitle: `${BENCHMARKOPS_PRODUCT_TITLE} 企业评测中台`,
    heroBody:
      '把题源导入、题目管理、同步/异步评测、结果回看与交付导出放到一个工作台里。默认中文，默认接到 Qwen 评测服务，后续可继续扩到更多模型与队列。',
    heroPrimary: '跳到运行中心',
    heroSecondary: '刷新项目视图',
    summaryCards: [
      { label: '项目工作区', hint: 'Project / SourceFile / ProblemItem' },
      { label: '运行编排', hint: '同步等待 + 异步后台 worker' },
      { label: '交付产物', hint: 'JSON / XLSX / 原始诊断' },
    ],
    workspaceTitle: '项目工作台',
    workspaceHeadline: '项目是唯一工作容器',
    workspaceBody: '项目是顶层容器。源文件、题目、运行与产物全部挂在项目下面。',
    projectName: '项目名称',
    projectDescription: '项目说明',
    createProject: '新建项目',
    intakeTitle: '文件导入中心',
    intakeHeadline: '先统一输入，再抽取题目',
    intakeBody:
      '支持多文件与文件夹导入，接受 PDF、DOCX、JSON、TXT、Markdown、TeX。非 JSON 文件会进入 Python 归一化链，生成统一文本/LaTeX/标准化 JSON 后再抽取题目。',
    uploadSource: '上传文件',
    uploadFolder: '上传文件夹',
    uploadHint: '上传后自动归一化并刷新当前项目；会保留相对路径，并提供原文件、标准化 JSON、提取文本、LaTeX 下载入口。',
    problemTitle: '题目列表',
    problemHeadline: 'JSON 导入和手工补录可以并存',
    problemBody: '可从 JSON 导入，也可手动补录通用题目。运行中心始终绑定当前选中的题目。',
    createItem: '创建题目',
    runTitle: '运行中心',
    runHeadline: '同一套配置支持同步与异步',
    runBody: '同一套配置可直接同步等待，也可切到异步模式让后台 worker 执行。',
    resultsTitle: '结果中心',
    resultsHeadline: '每次运行都留下可追溯结果',
    resultsBody: '保留每次运行的状态、命中率、耗时区间与交付文件下载入口。',
    previewTitle: '评测预览',
    previewHeadline: '结果可以直接看，也可以回放',
    previewBody: '同步执行后直接预览；异步完成后可从 JSON 产物回放到页面。',
    governanceTitle: '治理视角',
    governanceHeadline: '交付、角色和状态统一可见',
    governanceBody: '成员角色、文件状态、题目标签和导出链在这里统一看，方便企业化交付。',
    emptyProjects: '当前还没有项目，先创建一个项目。',
    emptyItems: '当前项目还没有题目，可上传 JSON 或手动创建。',
    emptyRuns: '当前项目还没有运行记录。',
    emptyPreview: '还没有可预览的评测产物。先跑一次同步评测，或在结果中心回放一个 JSON 产物。',
    selectedItem: '当前题目',
    selectedProject: '当前项目',
    syncMode: '同步',
    asyncMode: '异步',
    startRun: '开始运行',
    refresh: '刷新',
    preview: '预览',
    download: '下载',
    running: '运行中',
    queued: '排队中',
    completed: '已完成',
    failed: '失败',
    draftItemTitle: '题目标题',
    draftItemPrompt: '题目内容 / Prompt',
    draftItemAnswer: '标准答案',
    subject: '学科',
    gradeLevel: '年级',
    difficulty: '难度',
    itemType: '题型',
    tags: '标签（逗号分隔）',
    notes: '备注',
    members: '成员',
    permissions: '权限角色',
    sourceFiles: '源文件',
    runMode: '执行模式',
    baseUrl: '服务地址',
    modelName: '默认模型',
    runs: '运行次数',
    parallelism: '并发数',
    temperature: '温度',
    maxTokens: '最大输出',
    lastUpdate: '最近更新时间',
    accuracy: '命中率',
    artifacts: '产物',
    diagnostics: '诊断',
    manualItemHint: '这里不绑定具体题目类型，保留通用字段，方便后面接 OCR/解析/审核流程。',
    supportedFiles: '支持 PDF / DOCX / JSON / TXT / MD / TEX / 文件夹',
    enterpriseNotice: '默认模型展示为用户指定的 Qwen/Qwen3-235B-A22B-Thinking-2507；实际调用时会自动归一化为服务端可识别的模型 ID。',
    genericExport: '导出的 Excel 采用通用企业交付结构，方便评测结果统一归档与复用。',
    countSuffix: '项',
    uploadFieldLabel: '上传源文件',
    projectCountLabel: '项目数',
    itemCountLabel: '题目数',
    runCountLabel: '运行数',
    artifactCountLabel: '产物数',
    importedCountLabel: '导入题目',
    sourcePathLabel: '源路径',
    sourceArtifactsLabel: '源产物',
    sourceOriginalLabel: '原文件',
    sourceNormalizedLabel: '标准化 JSON',
    sourceTextLabel: '提取文本',
    sourceLatexLabel: 'LaTeX',
    runIdentifierLabel: '运行编号',
    answerValidationTitle: '答案与校验',
    latencyLabel: '耗时区间',
  },
  en: {
    heroEyebrow: 'WanFlow.ai flagship module',
    heroTitle: `${BENCHMARKOPS_PRODUCT_TITLE} enterprise evaluation hub`,
    heroBody:
      'One workspace for source intake, item management, sync/async benchmark runs, result review, and client-ready exports. Chinese is the default locale and the Qwen evaluation endpoint is wired in by default.',
    heroPrimary: 'Jump to run center',
    heroSecondary: 'Refresh projects',
    summaryCards: [
      { label: 'Project workspace', hint: 'Project / SourceFile / ProblemItem' },
      { label: 'Run orchestration', hint: 'foreground sync + background worker' },
      { label: 'Delivery artifacts', hint: 'JSON / XLSX / diagnostics' },
    ],
    workspaceTitle: 'Project workspace',
    workspaceHeadline: 'Projects are the anchor container',
    workspaceBody: 'Projects are the top-level containers. Sources, items, runs, and artifacts all attach there.',
    projectName: 'Project name',
    projectDescription: 'Project description',
    createProject: 'Create project',
    intakeTitle: 'File intake center',
    intakeHeadline: 'Normalize first, extract items second',
    intakeBody:
      'Upload multiple files or whole folders with PDF, DOCX, JSON, TXT, Markdown, and TeX. Non-JSON inputs flow through the Python normalization chain before item extraction.',
    uploadSource: 'Upload file',
    uploadFolder: 'Upload folder',
    uploadHint: 'Uploads refresh the current project after normalization and preserve relative paths with original, normalized, text, and LaTeX downloads.',
    problemTitle: 'Problem board',
    problemHeadline: 'JSON import and manual authoring can coexist',
    problemBody: 'Import items from JSON or create them manually. The run center always targets the currently selected item.',
    createItem: 'Create item',
    runTitle: 'Run center',
    runHeadline: 'The same config supports sync or async execution',
    runBody: 'Use the same config for immediate sync execution or switch to async mode and let the background worker handle it.',
    resultsTitle: 'Results center',
    resultsHeadline: 'Every run keeps a traceable delivery record',
    resultsBody: 'Every run keeps status, hit rate, latency band, and artifact download links.',
    previewTitle: 'Benchmark preview',
    previewHeadline: 'Preview live results or replay from artifacts',
    previewBody: 'Sync runs preview immediately. Async runs can be replayed from the JSON artifact.',
    governanceTitle: 'Governance lane',
    governanceHeadline: 'Roles, status, and delivery stay visible together',
    governanceBody: 'Keep roles, file status, item tags, and export readiness on one surface for enterprise delivery.',
    emptyProjects: 'No projects yet. Create a project first.',
    emptyItems: 'No items in this project yet. Upload JSON or create one manually.',
    emptyRuns: 'No benchmark runs in this project yet.',
    emptyPreview: 'No preview artifact yet. Run a sync benchmark or replay a JSON artifact from the results center.',
    selectedItem: 'Selected item',
    selectedProject: 'Selected project',
    syncMode: 'Sync',
    asyncMode: 'Async',
    startRun: 'Start run',
    refresh: 'Refresh',
    preview: 'Preview',
    download: 'Download',
    running: 'Running',
    queued: 'Queued',
    completed: 'Completed',
    failed: 'Failed',
    draftItemTitle: 'Item title',
    draftItemPrompt: 'Item prompt',
    draftItemAnswer: 'Answer key',
    subject: 'Subject',
    gradeLevel: 'Grade level',
    difficulty: 'Difficulty',
    itemType: 'Item type',
    tags: 'Tags (comma separated)',
    notes: 'Notes',
    members: 'Members',
    permissions: 'Permission roles',
    sourceFiles: 'Source files',
    runMode: 'Run mode',
    baseUrl: 'Service URL',
    modelName: 'Default model',
    runs: 'Runs',
    parallelism: 'Parallelism',
    temperature: 'Temperature',
    maxTokens: 'Max tokens',
    lastUpdate: 'Last updated',
    accuracy: 'Accuracy',
    artifacts: 'Artifacts',
    diagnostics: 'Diagnostics',
    manualItemHint: 'This stays generic on purpose so OCR, parsing, and review workflows can plug in later.',
    supportedFiles: 'Supports PDF / DOCX / JSON / TXT / MD / TEX / folders',
    enterpriseNotice: 'The UI shows the requested Qwen/Qwen3-235B-A22B-Thinking-2507 label; execution normalizes it to the provider-supported model ID.',
    genericExport: 'The Excel export uses a shared enterprise delivery shape for easier archiving and reuse.',
    countSuffix: 'items',
    uploadFieldLabel: 'Upload source file',
    projectCountLabel: 'Projects',
    itemCountLabel: 'Items',
    runCountLabel: 'Runs',
    artifactCountLabel: 'Artifacts',
    importedCountLabel: 'Imported items',
    sourcePathLabel: 'Source path',
    sourceArtifactsLabel: 'Source artifacts',
    sourceOriginalLabel: 'Original',
    sourceNormalizedLabel: 'Normalized JSON',
    sourceTextLabel: 'Extracted text',
    sourceLatexLabel: 'LaTeX',
    runIdentifierLabel: 'Run ID',
    answerValidationTitle: 'Answer and validation',
    latencyLabel: 'Latency band',
  },
};

const defaultRunConfig: BenchmarkOpsRunConfig = {
  mode: 'sync',
  baseUrl: DEFAULT_BASE_URL,
  modelName: DISPLAY_MODEL,
  runs: 8,
  parallelism: 4,
  temperature: 0.1,
  maxTokens: 1024,
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

function artifactExports(artifacts: PlatformArtifact[]): ProofBenchExport[] {
  return artifacts.map((artifact) => ({
    kind: artifact.kind === 'xlsx' ? 'artifact_workbook' : 'artifact_json',
    label: artifact.kind.toUpperCase(),
    fileName: artifact.fileName,
    relativePath: artifact.storagePath,
    downloadPath: `/api/platform/artifacts/download?artifactId=${artifact.id}`,
  }));
}

function buildDefaultProjectDraft(locale: 'zh' | 'en') {
  return locale === 'zh'
    ? {
        name: '企业评测工作区',
        description: '用于多题目、多运行、多导出的通用评测项目。',
      }
    : {
        name: 'Enterprise Benchmark Workspace',
        description: 'A general evaluation project for multi-item, multi-run, and export-driven delivery.',
      };
}

function buildDefaultItemForm(locale: 'zh' | 'en'): BenchmarkOpsItemDraft {
  return locale === 'zh'
    ? {
        title: '',
        prompt: '',
        answerKey: '',
        subject: '通用',
        gradeLevel: '未标注',
        difficulty: '中等',
        itemType: '开放题',
        tags: '',
        notes: '',
      }
    : {
        title: '',
        prompt: '',
        answerKey: '',
        subject: 'General',
        gradeLevel: 'Unspecified',
        difficulty: 'Medium',
        itemType: 'Open response',
        tags: '',
        notes: '',
      };
}

function relativePathForUpload(file: File) {
  const fileWithRelativePath = file as File & { webkitRelativePath?: string };
  return fileWithRelativePath.webkitRelativePath?.trim() || file.name;
}

export function useBenchmarkOpsConsole() {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const localeKey = locale as 'zh' | 'en';
  const ids: BenchmarkOpsViewIds = {
    adminTabs: useId(),
    projectName: useId(),
    projectDescription: useId(),
    sourceUpload: useId(),
    itemTitle: useId(),
    itemPrompt: useId(),
    itemAnswer: useId(),
    itemSubject: useId(),
    itemGradeLevel: useId(),
    itemDifficulty: useId(),
    itemType: useId(),
    itemTags: useId(),
    itemNotes: useId(),
    runMode: useId(),
    runModelName: useId(),
    runBaseUrl: useId(),
    runRuns: useId(),
    runParallelism: useId(),
    runTemperature: useId(),
    runMaxTokens: useId(),
  };

  const [bundles, setBundles] = useState<PlatformProjectBundle[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [adminView, setAdminView] = useState<BenchmarkOpsAdminView>('projects');
  const [runConfig, setRunConfig] = useState<BenchmarkOpsRunConfig>(defaultRunConfig);
  const projectDraft = buildDefaultProjectDraft(localeKey);
  const [projectName, setProjectName] = useState(projectDraft.name);
  const [projectDescription, setProjectDescription] = useState(projectDraft.description);
  const [itemForm, setItemForm] = useState<BenchmarkOpsItemDraft>(() => buildDefaultItemForm(localeKey));
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [liveArtifact, setLiveArtifact] = useState<ProofBenchArtifact | null>(null);
  const [liveRunId, setLiveRunId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  function adminTabId(view: BenchmarkOpsAdminView) {
    return `${ids.adminTabs}-${view}-tab`;
  }

  function adminPanelId(view: BenchmarkOpsAdminView) {
    return `${ids.adminTabs}-${view}-panel`;
  }

  async function loadProjects(silent = false) {
    try {
      if (!silent) setBusyKey('loading');
      const response = await fetch('/api/platform/projects', { cache: 'no-store' });
      const payload = (await response.json()) as { projects?: PlatformProjectBundle[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to load projects.');
      }
      const projects = payload.projects ?? [];
      setError(null);
      setBundles(projects);
      setSelectedProjectId((current) =>
        current && projects.some((bundle) => bundle.project.id === current) ? current : projects[0]?.project.id ?? ''
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load projects.');
    } finally {
      if (!silent) setBusyKey(null);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadProjects(true);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!folderInputRef.current) return;
    folderInputRef.current.setAttribute('webkitdirectory', '');
    folderInputRef.current.setAttribute('directory', '');
  }, []);

  const selectedBundle = useMemo(
    () => bundles.find((bundle) => bundle.project.id === selectedProjectId) ?? null,
    [bundles, selectedProjectId]
  );

  useEffect(() => {
    setLiveArtifact(null);
    setLiveRunId(null);
    if (!selectedBundle) {
      setSelectedItemId('');
      return;
    }
    setSelectedItemId((current) => {
      if (current && selectedBundle.problemItems.some((item) => item.id === current)) {
        return current;
      }
      return selectedBundle.problemItems[0]?.id ?? '';
    });
  }, [selectedBundle]);

  const selectedItem = useMemo(
    () => selectedBundle?.problemItems.find((item) => item.id === selectedItemId) ?? null,
    [selectedBundle, selectedItemId]
  );

  const artifactMap = useMemo(() => {
    const map = new Map<string, PlatformArtifact[]>();
    for (const artifact of selectedBundle?.artifacts ?? []) {
      const list = map.get(artifact.benchmarkRunId) ?? [];
      list.push(artifact);
      map.set(artifact.benchmarkRunId, list);
    }
    return map;
  }, [selectedBundle]);

  const recentRuns = useMemo(
    () => [...(selectedBundle?.benchmarkRuns ?? [])].sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)),
    [selectedBundle]
  );
  const latestRun = recentRuns[0] ?? null;

  const adminMeta: Record<BenchmarkOpsAdminView, BenchmarkOpsSectionIntro> = {
    projects: {
      eyebrow: copy.workspaceTitle,
      title: copy.workspaceHeadline,
      body: copy.workspaceBody,
    },
    items: {
      eyebrow: copy.problemTitle,
      title: copy.problemHeadline,
      body: copy.problemBody,
    },
    sources: {
      eyebrow: copy.intakeTitle,
      title: copy.intakeHeadline,
      body: copy.intakeBody,
    },
  };

  const adminTabs: BenchmarkOpsAdminTab[] = [
    { key: 'projects', label: copy.workspaceTitle },
    { key: 'items', label: copy.problemTitle },
    { key: 'sources', label: copy.intakeTitle },
  ];

  function focusAdminTab(view: BenchmarkOpsAdminView) {
    window.requestAnimationFrame(() => {
      document.getElementById(adminTabId(view))?.focus();
    });
  }

  function handleAdminTabKeyDown(currentView: BenchmarkOpsAdminView, event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = benchmarkOpsAdminViews.indexOf(currentView);
    if (currentIndex === -1) return;

    let nextView: BenchmarkOpsAdminView | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextView = benchmarkOpsAdminViews[(currentIndex + 1) % benchmarkOpsAdminViews.length];
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextView = benchmarkOpsAdminViews[(currentIndex - 1 + benchmarkOpsAdminViews.length) % benchmarkOpsAdminViews.length];
    } else if (event.key === 'Home') {
      nextView = benchmarkOpsAdminViews[0];
    } else if (event.key === 'End') {
      nextView = benchmarkOpsAdminViews[benchmarkOpsAdminViews.length - 1];
    }

    if (!nextView) return;
    event.preventDefault();
    setAdminView(nextView);
    focusAdminTab(nextView);
  }

  function triggerUpload(kind: 'file' | 'folder') {
    const target = kind === 'file' ? fileInputRef.current : folderInputRef.current;
    if (!target) return;
    target.value = '';
    target.click();
  }

  async function handleCreateProject() {
    try {
      setBusyKey('project');
      setError(null);
      const response = await fetch('/api/platform/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: projectName, description: projectDescription }),
      });
      const payload = (await response.json()) as { project?: { id: string }; error?: string };
      if (!response.ok || !payload.project) {
        throw new Error(payload.error ?? 'Failed to create project.');
      }
      setBanner(localeKey === 'zh' ? '项目已创建。' : 'Project created.');
      await loadProjects(true);
      setSelectedProjectId(payload.project.id);
    } catch (projectError) {
      setError(projectError instanceof Error ? projectError.message : 'Failed to create project.');
    } finally {
      setBusyKey(null);
    }
  }

  async function handleUpload(files: File[]) {
    if (!selectedBundle || files.length === 0) return;
    try {
      setBusyKey('upload');
      setError(null);
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
        formData.append('relativePath', relativePathForUpload(file));
      }
      const response = await fetch(`/api/platform/projects/${selectedBundle.project.id}/sources`, {
        method: 'POST',
        body: formData,
      });
      const payload = (await response.json()) as {
        importedItems?: PlatformProblemItem[];
        warnings?: string[];
        error?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Upload failed.');
      }
      const importedCount = payload.importedItems?.length ?? 0;
      const warningSuffix = payload.warnings?.length ? ` ${payload.warnings.join(' | ')}` : '';
      setBanner(
        localeKey === 'zh'
          ? `已导入 ${files.length} 个源文件，生成 ${importedCount} 道题目。${warningSuffix}`.trim()
          : `Imported ${files.length} sources and created ${importedCount} items.${warningSuffix}`.trim()
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (folderInputRef.current) folderInputRef.current.value = '';
      await loadProjects(true);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setBusyKey(null);
    }
  }

  async function handleCreateItem() {
    if (!selectedBundle) return;
    try {
      setBusyKey('item');
      setError(null);
      const response = await fetch(`/api/platform/projects/${selectedBundle.project.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...itemForm,
          tags: itemForm.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });
      const payload = (await response.json()) as { item?: PlatformProblemItem; error?: string };
      if (!response.ok || !payload.item) {
        throw new Error(payload.error ?? 'Failed to create item.');
      }
      setBanner(localeKey === 'zh' ? '题目已创建。' : 'Item created.');
      setItemForm((current) => ({
        ...current,
        ...buildDefaultItemForm(localeKey),
        title: '',
        prompt: '',
        answerKey: '',
        tags: '',
        notes: '',
      }));
      await loadProjects(true);
      setSelectedItemId(payload.item.id);
    } catch (itemError) {
      setError(itemError instanceof Error ? itemError.message : 'Failed to create item.');
    } finally {
      setBusyKey(null);
    }
  }

  async function handleRun() {
    if (!selectedBundle || !selectedItem) return;
    try {
      setBusyKey('run');
      setError(null);
      const response = await fetch(`/api/platform/projects/${selectedBundle.project.id}/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...runConfig,
          problemItemId: selectedItem.id,
        }),
      });
      const payload = (await response.json()) as {
        runId?: string;
        artifact?: ProofBenchArtifact;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Run failed.');
      }
      if (payload.artifact) {
        setLiveArtifact(payload.artifact);
        setLiveRunId(payload.runId ?? null);
      } else {
        setLiveArtifact(null);
        setLiveRunId(null);
      }
      setBanner(
        runConfig.mode === 'sync'
          ? localeKey === 'zh'
            ? '同步评测已完成。'
            : 'Sync benchmark completed.'
          : localeKey === 'zh'
            ? '异步任务已进入队列。'
            : 'Async run queued.'
      );
      await loadProjects(true);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : 'Run failed.');
    } finally {
      setBusyKey(null);
    }
  }

  async function handlePreview(run: PlatformBenchmarkRun) {
    try {
      setBusyKey(`preview-${run.id}`);
      setError(null);
      const jsonArtifact = (artifactMap.get(run.id) ?? []).find((artifact) => artifact.kind === 'json');
      if (!jsonArtifact) {
        throw new Error(localeKey === 'zh' ? '该运行没有 JSON 产物。' : 'No JSON artifact for this run.');
      }
      const response = await fetch(`/api/platform/artifacts/download?artifactId=${jsonArtifact.id}`);
      if (!response.ok) {
        throw new Error(localeKey === 'zh' ? '无法读取 JSON 产物。' : 'Failed to read JSON artifact.');
      }
      const frameworkArtifact = (await response.json()) as Record<string, unknown>;
      setLiveArtifact(
        buildArtifactFromFrameworkJson(frameworkArtifact, {
          source: 'live',
          runId: run.id,
          itemJsonPath: run.artifactJsonPath ?? 'platform-data',
          outputFiles: artifactExports(artifactMap.get(run.id) ?? []),
        })
      );
      setLiveRunId(run.id);
    } catch (previewError) {
      setError(previewError instanceof Error ? previewError.message : 'Preview failed.');
    } finally {
      setBusyKey(null);
    }
  }

  const viewModel: BenchmarkOpsViewModel = {
    bundles,
    selectedProjectId,
    selectedItemId,
    adminView,
    runConfig,
    itemForm,
    projectName,
    projectDescription,
    selectedBundle,
    selectedItem,
    recentRuns,
    latestRun,
    artifactMap,
    liveArtifact,
    liveRunId,
    banner,
    error,
    busyKey,
    lastUpdatedText: formatDate(localeKey, latestRun?.createdAt ?? selectedBundle?.project.updatedAt),
  };

  return {
    locale: localeKey,
    copy,
    ids,
    viewModel,
    adminMeta,
    adminTabs,
    fileInputRef,
    folderInputRef,
    adminTabId,
    adminPanelId,
    setAdminView,
    handleAdminTabKeyDown,
    setProjectName,
    setProjectDescription,
    setSelectedProjectId,
    setSelectedItemId,
    updateItemForm: (patch: Partial<BenchmarkOpsItemDraft>) => setItemForm((current) => ({ ...current, ...patch })),
    updateRunConfig: (patch: Partial<BenchmarkOpsRunConfig>) => setRunConfig((current) => ({ ...current, ...patch })),
    refreshProjects: () => void loadProjects(),
    createProject: () => void handleCreateProject(),
    uploadFiles: (files: File[]) => void handleUpload(files),
    triggerUpload,
    createItem: () => void handleCreateItem(),
    runBenchmark: () => void handleRun(),
    previewRun: (run: PlatformBenchmarkRun) => void handlePreview(run),
  };
}
