'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useLocale } from '@/components/shared/locale-provider';
import { buildArtifactFromFrameworkJson, type ProofBenchArtifact, type ProofBenchExport } from '@/lib/proofbench';
import type {
  PlatformArtifact,
  PlatformBenchmarkRun,
  PlatformProjectBundle,
  PlatformProblemItem,
  PlatformSourceFile,
} from '@/lib/platform-types';

const DISPLAY_MODEL = 'Qwen/Qwen3-235B-A22B-Thinking-2507';
const DEFAULT_BASE_URL = 'http://35.220.164.252:3888/v1/';

type ConsoleCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroPrimary: string;
  heroSecondary: string;
  summaryCards: Array<{ label: string; hint: string }>;
  workspaceTitle: string;
  workspaceHeadline: string;
  workspaceBody: string;
  projectName: string;
  projectDescription: string;
  createProject: string;
  intakeTitle: string;
  intakeHeadline: string;
  intakeBody: string;
  uploadSource: string;
  uploadFolder: string;
  uploadHint: string;
  problemTitle: string;
  problemHeadline: string;
  problemBody: string;
  createItem: string;
  runTitle: string;
  runHeadline: string;
  runBody: string;
  resultsTitle: string;
  resultsHeadline: string;
  resultsBody: string;
  previewTitle: string;
  previewHeadline: string;
  previewBody: string;
  governanceTitle: string;
  governanceHeadline: string;
  governanceBody: string;
  emptyProjects: string;
  emptyItems: string;
  emptyRuns: string;
  emptyPreview: string;
  selectedItem: string;
  selectedProject: string;
  syncMode: string;
  asyncMode: string;
  startRun: string;
  refresh: string;
  preview: string;
  download: string;
  running: string;
  queued: string;
  completed: string;
  failed: string;
  draftItemTitle: string;
  draftItemPrompt: string;
  draftItemAnswer: string;
  subject: string;
  gradeLevel: string;
  difficulty: string;
  itemType: string;
  tags: string;
  notes: string;
  members: string;
  permissions: string;
  sourceFiles: string;
  runMode: string;
  baseUrl: string;
  modelName: string;
  runs: string;
  parallelism: string;
  temperature: string;
  maxTokens: string;
  lastUpdate: string;
  accuracy: string;
  artifacts: string;
  diagnostics: string;
  manualItemHint: string;
  supportedFiles: string;
  enterpriseNotice: string;
  genericExport: string;
  countSuffix: string;
  uploadFieldLabel: string;
  projectCountLabel: string;
  itemCountLabel: string;
  runCountLabel: string;
  artifactCountLabel: string;
  importedCountLabel: string;
  sourcePathLabel: string;
  sourceArtifactsLabel: string;
  sourceOriginalLabel: string;
  sourceNormalizedLabel: string;
  sourceTextLabel: string;
  sourceLatexLabel: string;
  runIdentifierLabel: string;
  answerValidationTitle: string;
  latencyLabel: string;
};

const COPY: Record<'zh' | 'en', ConsoleCopy> = {
  zh: {
    heroEyebrow: 'WanFlow.ai 主版块',
    heroTitle: 'BenchmarkOps 企业评测中台',
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
    intakeBody: '支持多文件与文件夹导入，接受 PDF、DOCX、JSON、TXT、Markdown、TeX。非 JSON 文件会进入 Python 归一化链，生成统一文本/LaTeX/标准化 JSON 后再抽取题目。',
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
    genericExport: '导出的 Excel 已去掉旧单题演示方案的模型名硬编码，改为通用企业产物结构。',
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
    heroTitle: 'BenchmarkOps enterprise evaluation hub',
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
    intakeBody: 'Upload multiple files or whole folders with PDF, DOCX, JSON, TXT, Markdown, and TeX. Non-JSON inputs flow through the Python normalization chain before item extraction.',
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
    genericExport: 'The Excel export no longer carries legacy single-item naming and now uses a generic enterprise workbook shape.',
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

type RunConfig = {
  mode: 'sync' | 'async';
  baseUrl: string;
  modelName: string;
  runs: number;
  parallelism: number;
  temperature: number;
  maxTokens: number;
};

type UploadableFile = File & {
  webkitRelativePath?: string;
};

type SourceDownloadLink = {
  kind: 'original' | 'normalized' | 'text' | 'latex';
  label: string;
  href: string;
};

type AdminView = 'projects' | 'items' | 'sources';

const adminViews: AdminView[] = ['projects', 'items', 'sources'];

const defaultRunConfig: RunConfig = {
  mode: 'sync',
  baseUrl: DEFAULT_BASE_URL,
  modelName: DISPLAY_MODEL,
  runs: 8,
  parallelism: 4,
  temperature: 0.1,
  maxTokens: 1024,
};

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

function sourceParseStatusLabel(locale: 'zh' | 'en', status: PlatformSourceFile['parseStatus']) {
  const map = {
    zh: {
      uploaded: '已上传',
      classifying: '分类中',
      extracting: '抽取中',
      normalized: '已标准化',
      itemized: '已生成题目',
      pending: '待处理',
      parsing: '解析中',
      parsed: '已解析',
      failed: '解析失败',
    },
    en: {
      uploaded: 'Uploaded',
      classifying: 'Classifying',
      extracting: 'Extracting',
      normalized: 'Normalized',
      itemized: 'Itemized',
      pending: 'Pending',
      parsing: 'Parsing',
      parsed: 'Parsed',
      failed: 'Failed',
    },
  };
  return map[locale][status];
}

function sourceStatusClass(status: PlatformSourceFile['parseStatus']) {
  if (status === 'itemized' || status === 'parsed') {
    return 'status-chip-success';
  }
  if (status === 'normalized') {
    return 'status-chip-info';
  }
  if (status === 'failed') {
    return 'status-chip-danger';
  }
  return 'status-chip-warning';
}

function roleLabel(locale: 'zh' | 'en', role: 'owner' | 'editor' | 'viewer' | 'runner') {
  const map = {
    zh: {
      owner: '负责人',
      editor: '编辑',
      viewer: '查看者',
      runner: '执行者',
    },
    en: {
      owner: 'Owner',
      editor: 'Editor',
      viewer: 'Viewer',
      runner: 'Runner',
    },
  };
  return map[locale][role];
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

function artifactExports(artifacts: PlatformArtifact[]): ProofBenchExport[] {
  return artifacts.map((artifact) => ({
    kind: artifact.kind === 'xlsx' ? 'artifact_workbook' : 'artifact_json',
    label: artifact.kind.toUpperCase(),
    fileName: artifact.fileName,
    relativePath: artifact.storagePath,
    downloadPath: `/api/platform/artifacts/download?artifactId=${artifact.id}`,
  }));
}

function buildSourceDownloadLinks(locale: 'zh' | 'en', source: PlatformSourceFile): SourceDownloadLink[] {
  const links: SourceDownloadLink[] = [
    {
      kind: 'original',
      label: locale === 'zh' ? '原文件' : 'Original',
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=original`,
    },
  ];

  if (source.metadata?.normalizedArtifactPath) {
    links.push({
      kind: 'normalized',
      label: locale === 'zh' ? '标准化 JSON' : 'Normalized JSON',
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=normalized`,
    });
  }
  if (source.metadata?.extractedTextPath) {
    links.push({
      kind: 'text',
      label: locale === 'zh' ? '提取文本' : 'Extracted text',
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=text`,
    });
  }
  if (source.metadata?.latexArtifactPath) {
    links.push({
      kind: 'latex',
      label: locale === 'zh' ? 'LaTeX' : 'LaTeX',
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=latex`,
    });
  }

  return links;
}

function FieldLabel({ label, htmlFor, helper }: { label: string; htmlFor: string; helper?: string }) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
        {label}
      </label>
      {helper ? <p className="text-xs leading-5 text-[var(--mist)]">{helper}</p> : null}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  align = 'start',
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: 'start' | 'compact';
}) {
  return (
    <div className={align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{body}</p>
    </div>
  );
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

function buildDefaultItemForm(locale: 'zh' | 'en') {
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

export default function PlatformConsole() {
  const { locale } = useLocale();
  const t = COPY[locale];
  const localeKey = locale as 'zh' | 'en';
  const ids = {
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
  const [adminView, setAdminView] = useState<AdminView>('projects');
  const [runConfig, setRunConfig] = useState<RunConfig>(defaultRunConfig);
  const projectDraft = buildDefaultProjectDraft(localeKey);
  const [projectName, setProjectName] = useState(projectDraft.name);
  const [projectDescription, setProjectDescription] = useState(projectDraft.description);
  const [itemForm, setItemForm] = useState(() => buildDefaultItemForm(localeKey));
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [liveArtifact, setLiveArtifact] = useState<ProofBenchArtifact | null>(null);
  const [liveRunId, setLiveRunId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  function adminTabId(view: AdminView) {
    return `${ids.adminTabs}-${view}-tab`;
  }

  function adminPanelId(view: AdminView) {
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
      setBundles(projects);
      setSelectedProjectId((current) => (current && projects.some((bundle) => bundle.project.id === current) ? current : projects[0]?.project.id ?? ''));
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

  const adminMeta = {
    projects: {
      eyebrow: t.workspaceTitle,
      title: t.workspaceHeadline,
      body: t.workspaceBody,
    },
    items: {
      eyebrow: t.problemTitle,
      title: t.problemHeadline,
      body: t.problemBody,
    },
    sources: {
      eyebrow: t.intakeTitle,
      title: t.intakeHeadline,
      body: t.intakeBody,
    },
  } satisfies Record<AdminView, { eyebrow: string; title: string; body: string }>;

  const adminTabs = [
    { key: 'projects', label: t.workspaceTitle },
    { key: 'items', label: t.problemTitle },
    { key: 'sources', label: t.intakeTitle },
  ] as const;

  function focusAdminTab(view: AdminView) {
    window.requestAnimationFrame(() => {
      document.getElementById(adminTabId(view))?.focus();
    });
  }

  function handleAdminTabKeyDown(currentView: AdminView, event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = adminViews.indexOf(currentView);
    if (currentIndex === -1) return;

    let nextView: AdminView | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextView = adminViews[(currentIndex + 1) % adminViews.length];
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextView = adminViews[(currentIndex - 1 + adminViews.length) % adminViews.length];
    } else if (event.key === 'Home') {
      nextView = adminViews[0];
    } else if (event.key === 'End') {
      nextView = adminViews[adminViews.length - 1];
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

  async function handleUpload(files: UploadableFile[]) {
    if (!selectedBundle) return;
    if (!files.length) return;
    try {
      setBusyKey('upload');
      setError(null);
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
        formData.append('relativePath', file.webkitRelativePath?.trim() || file.name);
      }
      const response = await fetch(`/api/platform/projects/${selectedBundle.project.id}/sources`, {
        method: 'POST',
        body: formData,
      });
      const payload = (await response.json()) as {
        sources?: PlatformSourceFile[];
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
      setItemForm((current) => ({ ...current, ...buildDefaultItemForm(localeKey), title: '', prompt: '', answerKey: '', tags: '', notes: '' }));
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

  return (
    <div className="space-y-7">
      <section className="panel-strong overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="hero-haze relative space-y-5">
            <p className="section-kicker">{t.heroEyebrow}</p>
            <div className="space-y-3">
              <h1 className="display-face max-w-3xl text-[2.25rem] leading-[1.02] text-ink sm:text-[2.95rem] lg:text-[3.7rem]">
                {t.heroTitle}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-[1rem]">{t.heroBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#run-center" className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                {t.heroPrimary}
              </a>
              <button type="button" onClick={() => void loadProjects()} className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
                {t.heroSecondary}
              </button>
            </div>
            <div className="surface-shell rounded-[22px]">
              {t.summaryCards.map((card, index) => (
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
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgba(248,250,252,0.62)]">{t.selectedProject}</p>
              <p className="mt-3 text-[1.4rem] font-semibold leading-snug">{selectedBundle?.project.name ?? '—'}</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.74)]">{selectedBundle?.project.description ?? t.emptyProjects}</p>
              <div className="soft-rule mt-5 grid gap-4 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{t.selectedItem}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{selectedItem?.title ?? t.emptyItems}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{t.lastUpdate}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{formatDate(localeKey, latestRun?.createdAt ?? selectedBundle?.project.updatedAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.projectCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{bundles.length}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.itemCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.problemItems.length ?? 0}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.runCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.benchmarkRuns.length ?? 0}</p>
              </div>
              <div className="quiet-card rounded-[20px] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.artifactCountLabel}</p>
                <p className="mt-3 text-[1.8rem] font-semibold text-ink">{selectedBundle?.artifacts.length ?? 0}</p>
              </div>
            </div>

            <div className="surface-muted rounded-[20px] px-5 py-4 text-sm leading-7 text-[var(--mist)]">{t.enterpriseNotice}</div>
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
          <section id="run-center" className="panel rounded-[26px] p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro eyebrow={t.runTitle} title={t.runHeadline} body={t.runBody} />
              <div className="surface-muted max-w-md rounded-[20px] px-4 py-3 text-sm leading-7 text-[var(--mist)]">
                {t.enterpriseNotice}
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="dark-card rounded-[24px] p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[rgba(248,250,252,0.62)]">{t.selectedItem}</p>
                <p className="mt-3 text-2xl font-semibold">{selectedItem?.title ?? '—'}</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.76)]">{selectedItem?.prompt ?? t.emptyItems}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(selectedItem?.metadata.tags ?? []).map((tag) => (
                    <span key={tag} className="rounded-[12px] bg-[rgba(248,250,252,0.08)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[rgba(248,250,252,0.74)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="soft-rule mt-5 grid gap-4 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{t.modelName}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">{runConfig.modelName}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.6)]">{t.runMode}</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(248,250,252,0.82)]">
                      {runConfig.mode === 'sync' ? t.syncMode : t.asyncMode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="quiet-card rounded-[24px] p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runMode} label={t.runMode} />
                    <select id={ids.runMode} value={runConfig.mode} onChange={(event) => setRunConfig((current) => ({ ...current, mode: event.target.value as RunConfig['mode'] }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm">
                      <option value="sync">{t.syncMode}</option>
                      <option value="async">{t.asyncMode}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runModelName} label={t.modelName} />
                    <input id={ids.runModelName} value={runConfig.modelName} onChange={(event) => setRunConfig((current) => ({ ...current, modelName: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.modelName} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <FieldLabel htmlFor={ids.runBaseUrl} label={t.baseUrl} />
                    <input id={ids.runBaseUrl} value={runConfig.baseUrl} onChange={(event) => setRunConfig((current) => ({ ...current, baseUrl: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.baseUrl} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runRuns} label={t.runs} />
                    <input id={ids.runRuns} type="number" min={1} max={8} value={runConfig.runs} onChange={(event) => setRunConfig((current) => ({ ...current, runs: Number(event.target.value || 1) }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.runs} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runParallelism} label={t.parallelism} />
                    <input id={ids.runParallelism} type="number" min={1} max={8} value={runConfig.parallelism} onChange={(event) => setRunConfig((current) => ({ ...current, parallelism: Number(event.target.value || 1) }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.parallelism} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runTemperature} label={t.temperature} />
                    <input id={ids.runTemperature} type="number" min={0} max={2} step={0.1} value={runConfig.temperature} onChange={(event) => setRunConfig((current) => ({ ...current, temperature: Number(event.target.value || 0) }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.temperature} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor={ids.runMaxTokens} label={t.maxTokens} />
                    <input id={ids.runMaxTokens} type="number" min={64} max={4096} step={64} value={runConfig.maxTokens} onChange={(event) => setRunConfig((current) => ({ ...current, maxTokens: Number(event.target.value || 64) }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.maxTokens} />
                  </div>
                </div>

                <div className="soft-rule mt-5 flex flex-wrap items-center justify-between gap-3 pt-5">
                  <div className="text-sm leading-7 text-[var(--mist)]">
                    {t.runs}: {runConfig.runs} · {t.parallelism}: {runConfig.parallelism}
                  </div>
                  <button type="button" onClick={handleRun} disabled={!selectedItem || busyKey === 'run'} className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                    {busyKey === 'run' ? '...' : `${t.startRun} · ${runConfig.mode === 'sync' ? t.syncMode : t.asyncMode}`}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="panel rounded-[26px] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <SectionIntro eyebrow={t.resultsTitle} title={t.resultsHeadline} body={t.resultsBody} align="compact" />
              <button type="button" onClick={() => void loadProjects()} className="btn-secondary rounded-[14px] px-4 py-2 text-sm font-semibold">
                {t.refresh}
              </button>
            </div>
            <div className="surface-muted mt-6 rounded-[28px] p-3">
              <div className="max-h-[30rem] space-y-3 overflow-y-auto pr-1">
                {recentRuns.length === 0 && (
                  <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">{t.emptyRuns}</div>
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
                              {statusLabel(localeKey, run.status)}
                            </span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]">
                            {t.runIdentifierLabel} #{run.id}
                          </p>
                          <p className="text-sm text-[var(--mist)]">{formatDate(localeKey, run.createdAt)}</p>
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
                              {t.download} · {artifact.kind}
                            </a>
                          ))}
                        </div>
                        {artifacts.some((artifact) => artifact.kind === 'json') && (
                          <button type="button" onClick={() => void handlePreview(run)} className="btn-secondary rounded-[14px] px-4 py-2 text-sm font-semibold">
                            {busyKey === `preview-${run.id}` ? '...' : t.preview}
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
            <SectionIntro eyebrow={t.previewTitle} title={t.previewHeadline} body={t.previewBody} align="compact" />
            {!liveArtifact ? (
              <div className="mt-6 rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm leading-7 text-[var(--mist)]">{t.emptyPreview}</div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="quiet-card rounded-[20px] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.accuracy}</p>
                    <p className="mt-3 text-[1.7rem] font-semibold text-ink">{formatPercent(liveArtifact.summary.accuracy)}</p>
                  </div>
                  <div className="quiet-card rounded-[20px] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.runCountLabel}</p>
                    <p className="mt-3 text-[1.7rem] font-semibold text-ink">{liveArtifact.summary.totalRuns}</p>
                  </div>
                  <div className="quiet-card rounded-[20px] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mist)]">{t.latencyLabel}</p>
                    <p className="mt-3 text-lg font-semibold text-ink">{liveArtifact.summary.latencyBand}</p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="dark-card rounded-[24px] p-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.62)]">
                      {t.runIdentifierLabel} #{liveRunId ?? liveArtifact.runId ?? '—'}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{liveArtifact.item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.76)]">{liveArtifact.item.question}</p>
                    <div className="soft-rule mt-5 pt-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(248,250,252,0.62)]">{t.answerValidationTitle}</p>
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
                        <p className="text-sm leading-7 text-[var(--mist)]">{t.emptyPreview}</p>
                      ) : (
                        liveArtifact.exportFiles.map((file) => (
                          <a
                            key={`${file.kind}-${file.relativePath}`}
                            href={file.downloadPath ?? '#'}
                            className="flex items-center justify-between gap-3 rounded-[20px] border border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.9)] px-4 py-3 text-sm text-ink"
                          >
                            <span>{file.label}</span>
                            <span className="text-[var(--mist)]">{t.download}</span>
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
                          <p className="text-sm font-semibold text-ink">{localeKey === 'zh' ? `运行 ${run.runIndex}` : `Run ${run.runIndex}`}</p>
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
                            {previewRunStatusLabel(localeKey, run.status)}
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
        </div>

        <div className="space-y-6">
          <section className="panel rounded-[26px] p-6 sm:p-8">
            <div className="flex flex-col gap-5">
              <div role="tablist" aria-label={localeKey === 'zh' ? '工作台分区' : 'Workspace sections'} className="surface-muted flex flex-wrap gap-2 rounded-[20px] p-2">
                {adminTabs.map((tab) => {
                  const active = adminView === tab.key;
                  return (
                    <button
                      id={adminTabId(tab.key)}
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls={adminPanelId(tab.key)}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setAdminView(tab.key)}
                      onKeyDown={(event) => handleAdminTabKeyDown(tab.key, event)}
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
                <SectionIntro eyebrow={adminMeta[adminView].eyebrow} title={adminMeta[adminView].title} body={adminMeta[adminView].body} />
                {adminView === 'items' ? <p className="max-w-md text-sm leading-7 text-[var(--mist)]">{t.manualItemHint}</p> : null}
                {adminView === 'sources' ? (
                  <div className="rounded-[14px] border border-[rgba(145,97,28,0.16)] bg-[rgba(145,97,28,0.06)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--brass)]">
                    {t.supportedFiles}
                  </div>
                ) : null}
              </div>

              <div id={adminPanelId(adminView)} role="tabpanel" aria-labelledby={adminTabId(adminView)}>
                  {adminView === 'projects' ? (
                  <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel htmlFor={ids.projectName} label={t.projectName} />
                      <input id={ids.projectName} value={projectName} onChange={(event) => setProjectName(event.target.value)} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.projectName} />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor={ids.projectDescription} label={t.projectDescription} />
                      <input id={ids.projectDescription} value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.projectDescription} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={handleCreateProject} disabled={busyKey === 'project'} className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                      {busyKey === 'project' ? '...' : t.createProject}
                    </button>
                    <button type="button" onClick={() => void loadProjects()} disabled={busyKey === 'loading'} className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
                      {t.refresh}
                    </button>
                  </div>
                  <div className="surface-muted rounded-[24px] p-3">
                    <div className="max-h-[24rem] space-y-3 overflow-y-auto pr-1">
                      {bundles.length === 0 && <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">{t.emptyProjects}</div>}
                      {bundles.map((bundle) => {
                        const active = bundle.project.id === selectedProjectId;
                        return (
                          <button
                            key={bundle.project.id}
                            type="button"
                            onClick={() => setSelectedProjectId(bundle.project.id)}
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
                                {bundle.problemItems.length} {t.countSuffix}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  </>
                ) : null}

                {adminView === 'items' ? (
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.94fr]">
                  <div className="surface-muted rounded-[24px] p-3">
                    <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                      {(selectedBundle?.problemItems ?? []).length === 0 && (
                        <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">{t.emptyItems}</div>
                      )}
                      {(selectedBundle?.problemItems ?? []).map((item) => {
                        const active = item.id === selectedItemId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedItemId(item.id)}
                            aria-pressed={active}
                            className={[
                              'w-full rounded-[20px] border px-5 py-5 text-left transition',
                              active
                                ? 'border-[rgba(15,118,110,0.2)] bg-[rgba(15,118,110,0.08)] shadow-[0_12px_28px_rgba(15,118,110,0.08)]'
                                : 'border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.94)]',
                            ].join(' ')}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-ink">{item.title}</p>
                                <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--mist)]">{item.prompt}</p>
                              </div>
                              <div className="control-chip-sm rounded-[12px] px-3 py-1 text-xs uppercase tracking-[0.18em]">
                                {item.metadata.subject}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="quiet-card rounded-[24px] p-5">
                    <div className="grid gap-3">
                      <div className="space-y-2">
                        <FieldLabel htmlFor={ids.itemTitle} label={t.draftItemTitle} />
                        <input id={ids.itemTitle} value={itemForm.title} onChange={(event) => setItemForm((current) => ({ ...current, title: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.draftItemTitle} />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel htmlFor={ids.itemPrompt} label={t.draftItemPrompt} />
                        <textarea id={ids.itemPrompt} value={itemForm.prompt} onChange={(event) => setItemForm((current) => ({ ...current, prompt: event.target.value }))} className="input-shell min-h-28 w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.draftItemPrompt} />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel htmlFor={ids.itemAnswer} label={t.draftItemAnswer} />
                        <textarea id={ids.itemAnswer} value={itemForm.answerKey} onChange={(event) => setItemForm((current) => ({ ...current, answerKey: event.target.value }))} className="input-shell min-h-20 w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.draftItemAnswer} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <FieldLabel htmlFor={ids.itemSubject} label={t.subject} />
                          <input id={ids.itemSubject} value={itemForm.subject} onChange={(event) => setItemForm((current) => ({ ...current, subject: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.subject} />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel htmlFor={ids.itemGradeLevel} label={t.gradeLevel} />
                          <input id={ids.itemGradeLevel} value={itemForm.gradeLevel} onChange={(event) => setItemForm((current) => ({ ...current, gradeLevel: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.gradeLevel} />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel htmlFor={ids.itemDifficulty} label={t.difficulty} />
                          <input id={ids.itemDifficulty} value={itemForm.difficulty} onChange={(event) => setItemForm((current) => ({ ...current, difficulty: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.difficulty} />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel htmlFor={ids.itemType} label={t.itemType} />
                          <input id={ids.itemType} value={itemForm.itemType} onChange={(event) => setItemForm((current) => ({ ...current, itemType: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.itemType} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel htmlFor={ids.itemTags} label={t.tags} />
                        <input id={ids.itemTags} value={itemForm.tags} onChange={(event) => setItemForm((current) => ({ ...current, tags: event.target.value }))} className="input-shell w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.tags} />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel htmlFor={ids.itemNotes} label={t.notes} />
                        <textarea id={ids.itemNotes} value={itemForm.notes} onChange={(event) => setItemForm((current) => ({ ...current, notes: event.target.value }))} className="input-shell min-h-24 w-full rounded-2xl px-4 py-3 text-sm" placeholder={t.notes} />
                      </div>
                      <button type="button" onClick={handleCreateItem} disabled={busyKey === 'item'} className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                        {busyKey === 'item' ? '...' : t.createItem}
                      </button>
                    </div>
                  </div>
                  </div>
                ) : null}

                {adminView === 'sources' ? (
                  <>
                  <div className="flex flex-wrap gap-3">
                    <div className="space-y-2">
                      <FieldLabel htmlFor={`${ids.sourceUpload}-button`} label={t.uploadFieldLabel} helper={t.supportedFiles} />
                      <input
                        id={ids.sourceUpload}
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="sr-only"
                        tabIndex={-1}
                        onChange={(event) => {
                          const files = Array.from(event.target.files ?? []) as UploadableFile[];
                          if (files.length) void handleUpload(files);
                        }}
                      />
                      <button
                        id={`${ids.sourceUpload}-button`}
                        type="button"
                        onClick={() => triggerUpload('file')}
                        className="btn-secondary inline-flex rounded-[16px] px-5 py-3 text-sm font-semibold"
                      >
                        {busyKey === 'upload' ? '...' : t.uploadSource}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor={`${ids.sourceUpload}-folder-button`} label={t.uploadFolder} helper={t.supportedFiles} />
                      <input
                        id={`${ids.sourceUpload}-folder`}
                        ref={folderInputRef}
                        type="file"
                        multiple
                        className="sr-only"
                        tabIndex={-1}
                        onChange={(event) => {
                          const files = Array.from(event.target.files ?? []) as UploadableFile[];
                          if (files.length) void handleUpload(files);
                        }}
                      />
                      <button
                        id={`${ids.sourceUpload}-folder-button`}
                        type="button"
                        onClick={() => triggerUpload('folder')}
                        className="btn-secondary inline-flex rounded-[16px] px-5 py-3 text-sm font-semibold"
                      >
                        {busyKey === 'upload' ? '...' : t.uploadFolder}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--mist)]">{t.uploadHint}</p>
                  <div className="surface-muted rounded-[24px] p-3">
                    <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                      {(selectedBundle?.sourceFiles ?? []).length === 0 && (
                        <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">
                          {t.supportedFiles}
                        </div>
                      )}
                      {(selectedBundle?.sourceFiles ?? []).map((source) => (
                        <div key={source.id} className="quiet-card rounded-[20px] px-5 py-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-ink">{source.fileName}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]">{source.fileType}</span>
                                <span className={['status-chip rounded-[12px] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]', sourceStatusClass(source.parseStatus)].join(' ')}>
                                  {sourceParseStatusLabel(localeKey, source.parseStatus)}
                                </span>
                              </div>
                              <p className="mt-3 text-xs leading-6 text-[var(--mist)]">
                                {t.sourcePathLabel}: {source.metadata?.relativePath ?? source.fileName}
                              </p>
                              {source.metadata?.classifier ? (
                                <p className="text-xs leading-6 text-[var(--mist)]">classifier: {source.metadata.classifier}</p>
                              ) : null}
                              {source.parseError ? <p className="status-danger text-xs leading-6">{source.parseError}</p> : null}
                            </div>
                            <div className="space-y-3 text-right">
                              <div className="text-xs text-[var(--mist)]">
                                {source.importedItemIds.length} {t.importedCountLabel}
                              </div>
                              <div className="flex flex-wrap justify-end gap-2">
                                {buildSourceDownloadLinks(localeKey, source).map((link) => (
                                  <a
                                    key={`${source.id}-${link.kind}`}
                                    href={link.href}
                                    className="control-chip-sm rounded-[12px] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </>
                ) : null}
              </div>
            </div>
          </section>

          <section className="panel rounded-[26px] p-6 sm:p-8">
            <SectionIntro eyebrow={t.governanceTitle} title={t.governanceHeadline} body={t.governanceBody} align="compact" />
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="quiet-card rounded-[20px] p-5">
                <p className="text-sm font-semibold text-ink">{t.members}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(selectedBundle?.members ?? []).map((member) => (
                    <span key={member.userId} className="control-chip-sm rounded-[12px] px-3 py-2 text-xs uppercase tracking-[0.16em]">
                      {member.name} · {roleLabel(localeKey, member.role)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="quiet-card rounded-[20px] p-5">
                <p className="text-sm font-semibold text-ink">{t.permissions}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--mist)]">
                  {localeKey === 'zh' ? '负责人 / 编辑 / 查看者 / 执行者' : 'Owner / Editor / Viewer / Runner'}
                </p>
              </div>
              <div className="quiet-card rounded-[20px] p-5">
                <p className="text-sm font-semibold text-ink">{t.genericExport}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{t.enterpriseNotice}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
