export type PlatformRole = 'owner' | 'editor' | 'viewer' | 'runner';
export type SourceFileType = 'pdf' | 'docx' | 'json' | 'txt' | 'other';
export type SourceParseStatus = 'pending' | 'parsing' | 'parsed' | 'uploaded' | 'classifying' | 'extracting' | 'normalized' | 'itemized' | 'failed';
export type ProblemReviewStatus = 'draft' | 'reviewed' | 'approved';
export type BenchmarkRunMode = 'sync' | 'async';
export type BenchmarkRunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
export type ArtifactKind = 'json' | 'xlsx' | 'raw_log' | 'normalized_result' | 'preview';

export type PlatformMember = {
  userId: string;
  name: string;
  role: PlatformRole;
};

export type PlatformProject = {
  id: string;
  name: string;
  description: string;
  ownerUserId: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
};

export type PlatformSourceFile = {
  id: string;
  projectId: string;
  fileName: string;
  fileType: SourceFileType;
  storagePath: string;
  uploadUserId: string;
  parseStatus: SourceParseStatus;
  parseError: string | null;
  importedItemIds: string[];
  metadata?: {
    relativePath?: string | null;
    classifier?: string | null;
    normalizedArtifactPath?: string | null;
    latexArtifactPath?: string | null;
    extractedTextPath?: string | null;
  } | null;
  createdAt: string;
};

export type PlatformProblemItem = {
  id: string;
  projectId: string;
  sourceFileId: string | null;
  title: string;
  prompt: string;
  answerKey: string;
  metadata: {
    subject: string;
    gradeLevel: string;
    difficulty: string;
    itemType: string;
    tags: string[];
    notes: string;
  };
  itemSchemaVersion: string;
  reviewStatus: ProblemReviewStatus;
  createdAt: string;
  updatedAt: string;
};

export type PlatformBenchmarkRun = {
  id: string;
  projectId: string;
  problemItemId: string;
  triggerUserId: string;
  mode: BenchmarkRunMode;
  status: BenchmarkRunStatus;
  modelName: string;
  baseUrl: string;
  temperature: number;
  parallelism: number;
  runs: number;
  maxTokens: number;
  scoreSummary: {
    accuracy: number;
    correctCount: number;
    totalRuns: number;
    latencyBand: string;
  } | null;
  diagnostics: {
    stdout: string;
    stderr: string;
    durationMs: number;
  } | null;
  artifactJsonPath: string | null;
  artifactXlsxPath: string | null;
  errorMessage: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
};

export type PlatformArtifact = {
  id: string;
  benchmarkRunId: string;
  kind: ArtifactKind;
  storagePath: string;
  fileName: string;
  fileSize: number | null;
  createdAt: string;
};

export type PlatformDB = {
  projects: PlatformProject[];
  members: Record<string, PlatformMember[]>;
  sourceFiles: PlatformSourceFile[];
  problemItems: PlatformProblemItem[];
  benchmarkRuns: PlatformBenchmarkRun[];
  artifacts: PlatformArtifact[];
};

export type PlatformProjectBundle = {
  project: PlatformProject;
  members: PlatformMember[];
  sourceFiles: PlatformSourceFile[];
  problemItems: PlatformProblemItem[];
  benchmarkRuns: PlatformBenchmarkRun[];
  artifacts: PlatformArtifact[];
};
