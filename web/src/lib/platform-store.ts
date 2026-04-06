import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type {
  PlatformArtifact,
  PlatformBenchmarkRun,
  PlatformDB,
  PlatformMember,
  PlatformProblemItem,
  PlatformProject,
  PlatformProjectBundle,
  PlatformSourceFile,
} from '@/lib/platform-types';

const ROOT_DIR = path.resolve(process.cwd(), '..');
export const PLATFORM_DIR = path.join(ROOT_DIR, 'platform-data');
export const PLATFORM_DB_PATH = path.join(PLATFORM_DIR, 'db.json');
export const PLATFORM_DB_LOCK_PATH = path.join(PLATFORM_DIR, 'db.lock');
export const PLATFORM_UPLOADS_DIR = path.join(PLATFORM_DIR, 'uploads');
export const PLATFORM_ARTIFACTS_DIR = path.join(PLATFORM_DIR, 'artifacts');

function now() {
  return new Date().toISOString();
}

function emptyDb(): PlatformDB {
  return {
    projects: [],
    members: {},
    sourceFiles: [],
    problemItems: [],
    benchmarkRuns: [],
    artifacts: [],
  };
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function atomicWriteText(targetPath: string, content: string) {
  const tempPath = `${targetPath}.${process.pid}.${randomUUID()}.tmp`;
  await fs.writeFile(tempPath, content, 'utf8');
  await fs.rename(tempPath, targetPath);
}

async function acquireDbLock(timeoutMs = 5000) {
  const startedAt = Date.now();

  while (true) {
    try {
      return await fs.open(PLATFORM_DB_LOCK_PATH, 'wx');
    } catch (error) {
      if (!(error instanceof Error) || !('code' in error) || error.code !== 'EEXIST') {
        throw error;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        throw new Error(`Timed out waiting for platform DB lock: ${PLATFORM_DB_LOCK_PATH}`);
      }
      await sleep(25);
    }
  }
}

async function releaseDbLock(lockHandle: Awaited<ReturnType<typeof fs.open>>) {
  await lockHandle.close().catch(() => {});
  await fs.unlink(PLATFORM_DB_LOCK_PATH).catch(() => {});
}

async function loadPlatformDbFile(): Promise<PlatformDB> {
  const raw = await fs.readFile(PLATFORM_DB_PATH, 'utf8');
  return JSON.parse(raw) as PlatformDB;
}

export async function ensurePlatformStorage() {
  await fs.mkdir(PLATFORM_DIR, { recursive: true });
  await fs.mkdir(PLATFORM_UPLOADS_DIR, { recursive: true });
  await fs.mkdir(PLATFORM_ARTIFACTS_DIR, { recursive: true });
  try {
    await fs.access(PLATFORM_DB_PATH);
  } catch {
    await atomicWriteText(PLATFORM_DB_PATH, JSON.stringify(emptyDb(), null, 2));
  }
}

export async function readPlatformDb(): Promise<PlatformDB> {
  await ensurePlatformStorage();
  return loadPlatformDbFile();
}

export async function writePlatformDb(db: PlatformDB) {
  await ensurePlatformStorage();
  const lockHandle = await acquireDbLock();
  try {
    await atomicWriteText(PLATFORM_DB_PATH, JSON.stringify(db, null, 2));
  } finally {
    await releaseDbLock(lockHandle);
  }
}

async function mutatePlatformDb<T>(mutator: (db: PlatformDB) => Promise<T> | T): Promise<T> {
  await ensurePlatformStorage();
  const lockHandle = await acquireDbLock();
  try {
    const db = await loadPlatformDbFile();
    const result = await mutator(db);
    await atomicWriteText(PLATFORM_DB_PATH, JSON.stringify(db, null, 2));
    return result;
  } finally {
    await releaseDbLock(lockHandle);
  }
}

export async function seedPlatformDbIfNeeded() {
  return mutatePlatformDb((db) => {
    if (db.projects.length) return db;

    const projectId = randomUUID();
    const sourceId = randomUUID();
    const itemId = randomUUID();
    const createdAt = now();

    const project: PlatformProject = {
      id: projectId,
      name: '企业评测项目 / Enterprise Evaluation',
      description: '用于上传题源、维护题目、执行同步/异步评测与导出交付物。',
      ownerUserId: 'local-admin',
      status: 'active',
      createdAt,
      updatedAt: createdAt,
    };

    const members: PlatformMember[] = [
      { userId: 'local-admin', name: 'Local Admin', role: 'owner' },
      { userId: 'ops-runner', name: 'Ops Runner', role: 'runner' },
    ];

    const sourceFile: PlatformSourceFile = {
      id: sourceId,
      projectId,
      fileName: 'examples/qf3_item.json',
      fileType: 'json',
      storagePath: 'examples/qf3_item.json',
      uploadUserId: 'local-admin',
      parseStatus: 'itemized',
      parseError: null,
      importedItemIds: [itemId],
      metadata: {
        relativePath: 'examples/qf3_item.json',
        classifier: 'json_structured',
      },
      createdAt,
    };

    const item: PlatformProblemItem = {
      id: itemId,
      projectId,
      sourceFileId: sourceId,
      title: 'Seeded reasoning item',
      prompt:
        'In four-dimensional Minkowski spacetime, consider an SU(2) Yang--Mills theory with gauge potential A_0^a = 0 and A_i^a = Σ ε_{aib} x^b / (g r^2) [1+φ(r)]. Derive φʺ(r) explicitly in terms of φ(r) and r.',
      answerKey: 'φʺ(r)=φ(r)[φ²(r)-1]/r²',
      metadata: {
        subject: 'Math Physics',
        gradeLevel: 'Graduate',
        difficulty: 'Advanced',
        itemType: 'Open response',
        tags: ['yang-mills', 'ode', 'symbolic'],
        notes: 'Seeded from local example JSON.',
      },
      itemSchemaVersion: 'v1',
      reviewStatus: 'approved',
      createdAt,
      updatedAt: createdAt,
    };

    db.projects.push(project);
    db.members[projectId] = members;
    db.sourceFiles.push(sourceFile);
    db.problemItems.push(item);
    return db;
  });
}

export async function listProjectBundles(): Promise<PlatformProjectBundle[]> {
  const db = await seedPlatformDbIfNeeded();
  return db.projects.map((project) => ({
    project,
    members: db.members[project.id] ?? [],
    sourceFiles: db.sourceFiles.filter((source) => source.projectId === project.id),
    problemItems: db.problemItems.filter((item) => item.projectId === project.id),
    benchmarkRuns: db.benchmarkRuns.filter((run) => run.projectId === project.id),
    artifacts: db.artifacts.filter((artifact) => {
      const run = db.benchmarkRuns.find((candidate) => candidate.id === artifact.benchmarkRunId);
      return run?.projectId === project.id;
    }),
  }));
}

export async function getProjectBundle(projectId: string): Promise<PlatformProjectBundle | null> {
  const bundles = await listProjectBundles();
  return bundles.find((bundle) => bundle.project.id === projectId) ?? null;
}

export async function createProject(input: { name: string; description: string; ownerUserId?: string }) {
  return mutatePlatformDb((db) => {
    const createdAt = now();
    const project: PlatformProject = {
      id: randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      ownerUserId: input.ownerUserId ?? 'local-admin',
      status: 'active',
      createdAt,
      updatedAt: createdAt,
    };
    db.projects.unshift(project);
    db.members[project.id] = [{ userId: project.ownerUserId, name: 'Local Admin', role: 'owner' }];
    return project;
  });
}

export async function createSourceFile(input: Omit<PlatformSourceFile, 'id' | 'createdAt'>) {
  return mutatePlatformDb((db) => {
    const source: PlatformSourceFile = { ...input, id: randomUUID(), createdAt: now() };
    db.sourceFiles.unshift(source);
    const project = db.projects.find((entry) => entry.id === source.projectId);
    if (project) project.updatedAt = now();
    return source;
  });
}

export async function updateSourceFile(sourceId: string, patch: Partial<PlatformSourceFile>) {
  return mutatePlatformDb((db) => {
    const source = db.sourceFiles.find((entry) => entry.id === sourceId);
    if (!source) return null;
    Object.assign(source, patch);
    return source;
  });
}

export async function createProblemItem(input: Omit<PlatformProblemItem, 'id' | 'createdAt' | 'updatedAt'>) {
  return mutatePlatformDb((db) => {
    const timestamp = now();
    const item: PlatformProblemItem = {
      ...input,
      id: randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    db.problemItems.unshift(item);
    const project = db.projects.find((entry) => entry.id === item.projectId);
    if (project) project.updatedAt = timestamp;
    const source = item.sourceFileId ? db.sourceFiles.find((entry) => entry.id === item.sourceFileId) : null;
    if (source && !source.importedItemIds.includes(item.id)) {
      source.importedItemIds.push(item.id);
    }
    return item;
  });
}

export async function createBenchmarkRun(input: Omit<PlatformBenchmarkRun, 'id' | 'createdAt'>) {
  return mutatePlatformDb((db) => {
    const run: PlatformBenchmarkRun = {
      ...input,
      id: randomUUID(),
      createdAt: now(),
    };
    db.benchmarkRuns.unshift(run);
    return run;
  });
}

export async function updateBenchmarkRun(runId: string, patch: Partial<PlatformBenchmarkRun>) {
  return mutatePlatformDb((db) => {
    const run = db.benchmarkRuns.find((entry) => entry.id === runId);
    if (!run) return null;
    Object.assign(run, patch);
    return run;
  });
}

export async function replaceArtifactsForRun(runId: string, artifacts: PlatformArtifact[]) {
  await mutatePlatformDb((db) => {
    db.artifacts = db.artifacts.filter((artifact) => artifact.benchmarkRunId !== runId).concat(artifacts);
  });
}

export async function createArtifact(input: Omit<PlatformArtifact, 'id' | 'createdAt'>): Promise<PlatformArtifact> {
  return {
    ...input,
    id: randomUUID(),
    createdAt: now(),
  };
}

export function resolvePlatformPath(relativePath: string) {
  return path.join(ROOT_DIR, relativePath);
}

export function getProjectUploadDir(projectId: string) {
  return path.join(PLATFORM_UPLOADS_DIR, projectId);
}

export function getProjectArtifactDir(projectId: string) {
  return path.join(PLATFORM_ARTIFACTS_DIR, projectId);
}

export function getSourceArtifactDir(projectId: string, sourceFileId: string) {
  return path.join(PLATFORM_ARTIFACTS_DIR, projectId, 'sources', sourceFileId);
}
