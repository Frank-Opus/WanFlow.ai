export type RunStatus = 'correct' | 'incorrect' | 'timeout' | 'error';
export type ValidationStatus = 'PASS' | 'FAIL' | 'NEEDS_REVIEW';
export type ProductStatId = 'schema_fields' | 'parallel_runs' | 'exports' | 'accuracy_lens';
export type ExportKind = 'artifact_json' | 'artifact_workbook' | 'source_item';
export type ProofBenchRunNoteCode =
  | 'exact_match'
  | 'rhs_only'
  | 'sign_inversion'
  | 'boxed_normalized'
  | 'timeout'
  | 'compact_plaintext'
  | 'extra_factor'
  | 'ascii_latex'
  | 'matched_normalized_ref'
  | 'miss_after_normalization'
  | 'no_parseable_answer'
  | 'error';

export type SiteMeta = {
  brand: string;
  moduleName: string;
  tagline: string;
};

export type ProductStat = {
  id: ProductStatId;
};

export type ProofBenchItem = {
  sequence: number;
  title: string;
  question: string;
  gradeLevel: string;
  domainType: string;
  keyPoints: string[];
  pitfalls: string[];
  solutionSteps: string[];
  finalAnswer: string;
  sourceFiles: string[];
  validationNotes: string[];
};

export type ProofBenchSummary = {
  datasetName: string;
  modelName: string;
  endpoint: string;
  totalRuns: number;
  correctCount: number;
  accuracy: number;
  latencyBand: string;
  generatedAt: string;
};

export type ProofBenchRun = {
  runIndex: number;
  status: RunStatus;
  latencySeconds: number | null;
  answer: string;
  noteCode: ProofBenchRunNoteCode | null;
  note: string;
  rawResponse: string;
  query: string;
  error: string | null;
};

export type ProofBenchValidation = {
  rule: string;
  status: ValidationStatus;
  detail: string;
};

export type ProofBenchExport = {
  kind: ExportKind;
  label: string;
  fileName: string;
  relativePath: string;
  downloadPath?: string;
};

export type ProofBenchRequestConfig = {
  itemJsonPath: string;
  baseUrl: string;
  modelName: string;
  runs: number;
  parallelism: number;
  temperature: number;
  maxTokens: number;
};

export type ProofBenchArtifact = {
  source: 'seeded' | 'live';
  runId: string | null;
  item: ProofBenchItem;
  summary: ProofBenchSummary;
  runs: ProofBenchRun[];
  validationResults: ProofBenchValidation[];
  requestConfig: ProofBenchRequestConfig;
  exportFiles: ProofBenchExport[];
};

export type ProofBenchRunResponse = {
  artifact: ProofBenchArtifact;
  diagnostics: {
    stdout: string;
    stderr: string;
    durationMs: number;
  };
};

export const siteMeta: SiteMeta = {
  brand: 'WanFlow.ai',
  moduleName: 'BenchmarkOps',
  tagline: 'Enterprise evaluation workspace for source intake, benchmark execution, artifact replay, and delivery orchestration.',
};

export const productStats: ProductStat[] = [
  { id: 'schema_fields' },
  { id: 'parallel_runs' },
  { id: 'exports' },
  { id: 'accuracy_lens' },
];

export const defaultRunConfig: ProofBenchRequestConfig = {
  itemJsonPath: 'examples/qf3_item.json',
  baseUrl: 'http://35.220.164.252:3888/v1/',
  modelName: 'qwen3-235b-a22b-thinking-2507',
  runs: 8,
  parallelism: 8,
  temperature: 0.1,
  maxTokens: 512,
};

const seededItem: ProofBenchItem = {
  sequence: 1,
  title: 'Non-Abelian Wu-Yang monopole radial equation',
  gradeLevel: '研究生',
  domainType: '数学物理（Yang--Mills 场论）',
  question:
    'In four-dimensional Minkowski spacetime, consider an SU(2) Yang--Mills theory with gauge potential A_0^a = 0 and A_i^a = Σ ε_{aib} x^b / (g r^2) [1+φ(r)]. Derive φʺ(r) explicitly in terms of φ(r) and r.',
  keyPoints: ['Yang--Mills field strength', 'Wu--Yang monopole', 'Euler--Lagrange equation', 'spherical reduction', 'non-Abelian gauge field'],
  pitfalls: [
    'Dropping the nonlinear term -gε_{abc}A_μ^bA_ν^c',
    'Mixing up spatial index raising under Minkowski signature',
    'Leaving the final ODE in a partially simplified form',
  ],
  solutionSteps: [
    'Expand the nonzero gauge-potential components.',
    'Compute the spatial field-strength components F^a_{ij}.',
    'Contract Σ_a F^a_{μν}F^{a,μν} and reduce to the radial density.',
    'Integrate angles under spherical symmetry to get the effective action.',
    'Apply the Euler--Lagrange equation for φ(r).',
  ],
  finalAnswer: 'φʺ(r)=φ(r)[φ²(r)-1]/r²',
  sourceFiles: ['QF3.pdf', 'QF3-yang-mills-monopole.tex', '数学竞赛题(1).docx'],
  validationNotes: ['physics_review'],
};

const seededRuns: ProofBenchRun[] = [
  {
    runIndex: 1,
    status: 'correct',
    latencySeconds: 8.91,
    answer: 'φʺ(r)=\\frac{φ(r)[φ^2(r)-1]}{r^2}',
    noteCode: 'exact_match',
    note: 'Exact symbolic match after normalization.',
    rawResponse: '{"最终答案":"φʺ(r)=\\frac{φ(r)[φ^2(r)-1]}{r^2}"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 2,
    status: 'correct',
    latencySeconds: 10.44,
    answer: '\\frac{φ(r)(φ^2(r)-1)}{r^2}',
    noteCode: 'rhs_only',
    note: 'Returned bare RHS only; scorer marks as hit.',
    rawResponse: '{"最终答案":"\\frac{φ(r)(φ^2(r)-1)}{r^2}"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 3,
    status: 'incorrect',
    latencySeconds: 12.37,
    answer: 'φʺ(r)=\\frac{φ(r)(1-φ^2(r))}{r^2}',
    noteCode: 'sign_inversion',
    note: 'Sign inversion on the nonlinear term.',
    rawResponse: '{"最终答案":"φʺ(r)=\\frac{φ(r)(1-φ^2(r))}{r^2}"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 4,
    status: 'correct',
    latencySeconds: 9.72,
    answer: '\\boxed{\\frac{φ(r)[φ^2(r)-1]}{r^2}}',
    noteCode: 'boxed_normalized',
    note: 'Boxed output normalized successfully.',
    rawResponse: '{"最终答案":"\\boxed{\\frac{φ(r)[φ^2(r)-1]}{r^2}}"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 5,
    status: 'timeout',
    latencySeconds: 24.1,
    answer: '—',
    noteCode: 'timeout',
    note: 'No payload parsed before timeout.',
    rawResponse: '',
    query: 'seeded',
    error: 'Read timed out.',
  },
  {
    runIndex: 6,
    status: 'correct',
    latencySeconds: 11.83,
    answer: 'φʺ(r)=φ(r)(φ^2(r)-1)/r^2',
    noteCode: 'compact_plaintext',
    note: 'Compact plaintext math, still a hit.',
    rawResponse: '{"最终答案":"φʺ(r)=φ(r)(φ^2(r)-1)/r^2"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 7,
    status: 'incorrect',
    latencySeconds: 15.26,
    answer: 'φʺ(r)=2φ(r)(φ^2(r)-1)/r^2',
    noteCode: 'extra_factor',
    note: 'Incorrect extra factor of 2.',
    rawResponse: '{"最终答案":"φʺ(r)=2φ(r)(φ^2(r)-1)/r^2"}',
    query: 'seeded',
    error: null,
  },
  {
    runIndex: 8,
    status: 'correct',
    latencySeconds: 13.18,
    answer: '\\frac{\\phi(r)[\\phi^2(r)-1]}{r^2}',
    noteCode: 'ascii_latex',
    note: 'ASCII LaTeX output, exact hit.',
    rawResponse: '{"最终答案":"\\frac{\\phi(r)[\\phi^2(r)-1]}{r^2}"}',
    query: 'seeded',
    error: null,
  },
];

const seededValidation: ProofBenchValidation[] = [
  { rule: 'final_answer_length', status: 'PASS', detail: 'Final answer fits the <=50 character target.' },
  { rule: 'no_image_reference', status: 'PASS', detail: 'Question text does not reference external figures.' },
  { rule: 'single_question', status: 'PASS', detail: 'The item is a single prompt, not a multi-part sheet.' },
  { rule: 'solution_steps_array', status: 'PASS', detail: 'Solution process is stored as an ordered string array.' },
  { rule: 'dataset_fit', status: 'NEEDS_REVIEW', detail: 'Physical-math content may need business-side approval for inclusion.' },
];

export const seededArtifact: ProofBenchArtifact = {
  source: 'seeded',
  runId: null,
  item: seededItem,
  summary: {
    datasetName: 'QF3 Yang-Mills sample',
    modelName: 'qwen3-235b-a22b-thinking-2507',
    endpoint: defaultRunConfig.baseUrl,
    totalRuns: 8,
    correctCount: 5,
    accuracy: 0.625,
    latencyBand: '8.9s - 24.1s',
    generatedAt: new Date('2026-04-04T12:06:10+08:00').toISOString(),
  },
  runs: seededRuns,
  validationResults: seededValidation,
  requestConfig: defaultRunConfig,
  exportFiles: [
    {
      kind: 'artifact_workbook',
      label: 'Workbook artifact',
      fileName: 'qf3_smoke_test.xlsx',
      relativePath: 'samples/generated/qf3_smoke_test.xlsx',
    },
    {
      kind: 'artifact_json',
      label: 'JSON artifact',
      fileName: 'qf3_smoke_test.json',
      relativePath: 'samples/generated/qf3_smoke_test.json',
    },
    { kind: 'source_item', label: 'Source item', fileName: 'qf3_item.json', relativePath: 'examples/qf3_item.json' },
  ],
};

export function formatLatencyBand(values: Array<number | null | undefined>): string {
  const latencies = values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
  if (!latencies.length) return 'pending';
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);
  return `${min.toFixed(min >= 10 ? 1 : 2)}s - ${max.toFixed(max >= 10 ? 1 : 2)}s`;
}

export function deriveRunStatus(isCorrect: boolean, error?: string | null): RunStatus {
  if (isCorrect) return 'correct';
  if (error && /timeout|timed out/i.test(error)) return 'timeout';
  if (error) return 'error';
  return 'incorrect';
}

export function deriveRunNote(run: {
  is_correct?: boolean;
  error?: string | null;
  predicted_answer?: string;
}): { note: string; noteCode: ProofBenchRunNoteCode } {
  if (run.error) return { note: run.error, noteCode: 'error' };
  if (run.is_correct) {
    return {
      note: 'Matched the normalized reference answer.',
      noteCode: 'matched_normalized_ref',
    };
  }
  if (run.predicted_answer) {
    return {
      note: 'Returned a parseable answer but missed the target after normalization.',
      noteCode: 'miss_after_normalization',
    };
  }
  return {
    note: 'No parseable answer was returned.',
    noteCode: 'no_parseable_answer',
  };
}

export function buildArtifactFromFrameworkJson(
  frameworkArtifact: Record<string, unknown>,
  options: {
    source: 'live' | 'seeded';
    runId: string | null;
    itemJsonPath: string;
    outputFiles?: ProofBenchExport[];
  }
): ProofBenchArtifact {
  const item = frameworkArtifact.item as Record<string, unknown>;
  const summary = frameworkArtifact.summary as Record<string, unknown>;
  const requestConfig = frameworkArtifact.request_config as Record<string, unknown>;
  const runs = (frameworkArtifact.runs as Array<Record<string, unknown>> | undefined) ?? [];
  const validation = (frameworkArtifact.validation_results as Array<Record<string, unknown>> | undefined) ?? [];

  const normalizedRuns: ProofBenchRun[] = runs.map((run) => {
    const isCorrect = Boolean(run.is_correct);
    const error = (run.error as string | null | undefined) ?? null;
    const predictedAnswer = String(run.predicted_answer ?? '').trim();
    const runNote = deriveRunNote({
      is_correct: isCorrect,
      error,
      predicted_answer: predictedAnswer,
    });
    return {
      runIndex: Number(run.run_index ?? 0),
      status: deriveRunStatus(isCorrect, error),
      latencySeconds: typeof run.latency_seconds === 'number' ? run.latency_seconds : null,
      answer: predictedAnswer || '—',
      noteCode: runNote.noteCode,
      note: runNote.note,
      rawResponse: String(run.raw_response ?? ''),
      query: String(run.query ?? ''),
      error,
    };
  });

  return {
    source: options.source,
    runId: options.runId,
    item: {
      sequence: Number(item['序号'] ?? 0),
      title: `Item ${String(item['序号'] ?? '00').padStart(2, '0')} · ${String(item['领域类型'] ?? 'Reasoning contract')}`,
      question: String(item['问题'] ?? ''),
      gradeLevel: String(item['适合年级'] ?? ''),
      domainType: String(item['领域类型'] ?? ''),
      keyPoints: ((item['考察知识点'] as string[] | undefined) ?? []).map(String),
      pitfalls: ((item['易错点'] as string[] | undefined) ?? []).map(String),
      solutionSteps: ((item['解题过程'] as string[] | undefined) ?? []).map(String),
      finalAnswer: String(item['最终答案'] ?? ''),
      sourceFiles: ((item['源文件'] as string[] | undefined) ?? []).map(String),
      validationNotes: ((item['校验备注'] as string[] | undefined) ?? []).map(String),
    },
    summary: {
      datasetName: `Sequence ${Number(summary.item_sequence ?? 0)} benchmark`,
      modelName: String(summary.model_name ?? requestConfig.model_name ?? ''),
      endpoint: String(requestConfig.base_url ?? ''),
      totalRuns: Number(summary.run_count ?? runs.length),
      correctCount: Number(summary.correct_count ?? 0),
      accuracy: Number(summary.accuracy ?? 0),
      latencyBand: formatLatencyBand(normalizedRuns.map((run) => run.latencySeconds)),
      generatedAt: String(summary.generated_at ?? new Date().toISOString()),
    },
    runs: normalizedRuns,
    validationResults: validation.map((result) => ({
      rule: String(result.rule ?? ''),
      status: String(result.status ?? 'NEEDS_REVIEW') as ValidationStatus,
      detail: String(result.detail ?? ''),
    })),
    requestConfig: {
      itemJsonPath: options.itemJsonPath,
      baseUrl: String(requestConfig.base_url ?? defaultRunConfig.baseUrl),
      modelName: String(requestConfig.model_name ?? defaultRunConfig.modelName),
      runs: Number(requestConfig.runs ?? defaultRunConfig.runs),
      parallelism: Number(requestConfig.parallelism ?? defaultRunConfig.parallelism),
      temperature: Number(requestConfig.temperature ?? defaultRunConfig.temperature),
      maxTokens: Number(requestConfig.max_tokens ?? defaultRunConfig.maxTokens),
    },
    exportFiles: options.outputFiles ?? [],
  };
}
