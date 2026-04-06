import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..', '..');
const platformDir = path.join(rootDir, 'platform-data');
const dbPath = path.join(platformDir, 'db.json');
const dbLockPath = path.join(platformDir, 'db.lock');
const defaultPythonBin = process.env.WANFLOW_PYTHON_BIN || path.join(process.env.HOME || '', 'miniconda3', 'bin', 'python3');
const displayModel = process.env.WANFLOW_DEFAULT_MODEL || 'Qwen/Qwen3-235B-A22B-Thinking-2507';
const modelAliases = {
  'qwen/qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
  'qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
};

function now() {
  return new Date().toISOString();
}

function resolveApiKey() {
  const apiKey = (process.env.WANFLOW_QWEN_API_KEY || process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('Server config missing WANFLOW_QWEN_API_KEY.');
  }
  return apiKey;
}

function normalizeModelName(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) {
    return modelAliases[displayModel.toLowerCase()] || displayModel;
  }
  return modelAliases[trimmed.toLowerCase()] || trimmed;
}

function formatLatencyBand(runs) {
  const latencies = runs
    .map((run) => run.latency_seconds)
    .filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (!latencies.length) {
    return 'pending';
  }
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);
  const formatValue = (value) => `${value.toFixed(value >= 10 ? 1 : 2)}s`;
  return `${formatValue(min)} - ${formatValue(max)}`;
}

async function resolvePythonBin() {
  try {
    await fs.access(defaultPythonBin);
    return defaultPythonBin;
  } catch {
    return 'python3';
  }
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function atomicWriteText(targetPath, content) {
  const tempPath = `${targetPath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, content, 'utf8');
  await fs.rename(tempPath, targetPath);
}

async function acquireDbLock(timeoutMs = 5000) {
  const startedAt = Date.now();

  while (true) {
    try {
      return await fs.open(dbLockPath, 'wx');
    } catch (error) {
      if (!error || error.code !== 'EEXIST') {
        throw error;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        throw new Error(`Timed out waiting for platform DB lock: ${dbLockPath}`);
      }
      await sleep(25);
    }
  }
}

async function releaseDbLock(lockHandle) {
  await lockHandle.close().catch(() => {});
  await fs.unlink(dbLockPath).catch(() => {});
}

async function readDb() {
  return JSON.parse(await fs.readFile(dbPath, 'utf8'));
}

async function writeDb(db) {
  await atomicWriteText(dbPath, JSON.stringify(db, null, 2));
}

async function mutateDb(mutator) {
  const lockHandle = await acquireDbLock();
  try {
    const db = await readDb();
    const result = await mutator(db);
    await writeDb(db);
    return result;
  } finally {
    await releaseDbLock(lockHandle);
  }
}

async function updateRun(runId, patch) {
  return mutateDb((db) => {
    const run = db.benchmarkRuns.find((entry) => entry.id === runId);
    if (!run) throw new Error(`Run ${runId} not found.`);
    Object.assign(run, patch);
    return run;
  });
}

async function replaceArtifacts(runId, artifacts) {
  await mutateDb((db) => {
    db.artifacts = db.artifacts.filter((artifact) => artifact.benchmarkRunId !== runId).concat(artifacts);
  });
}

function buildFrameworkItem(problemItem) {
  return {
    序号: 1,
    问题: problemItem.prompt,
    适合年级: problemItem.metadata.gradeLevel || 'Unknown',
    领域类型: problemItem.metadata.subject || 'General',
    考察知识点: problemItem.metadata.tags || [],
    易错点: [],
    '思考过程/分析': problemItem.metadata.notes || 'Imported from WanFlow.ai platform.',
    解题过程: [],
    最终答案: problemItem.answerKey,
    源文件: [],
    校验备注: [],
  };
}

async function runCli(args) {
  const pythonBin = await resolvePythonBin();
  return new Promise((resolve, reject) => {
    const child = spawn(pythonBin, args, {
      cwd: rootDir,
      env: {
        ...process.env,
        PYTHONPATH: process.env.PYTHONPATH
          ? `${path.join(rootDir, 'src')}${path.delimiter}${process.env.PYTHONPATH}`
          : path.join(rootDir, 'src'),
      },
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on('data', (chunk) => {
      stderr += String(chunk);
    });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });
}

async function main() {
  const jobFlag = process.argv.indexOf('--job');
  const jobPath = jobFlag >= 0 ? process.argv[jobFlag + 1] : null;
  if (!jobPath) throw new Error('--job path is required');

  const job = JSON.parse(await fs.readFile(jobPath, 'utf8'));
  const artifactDir = path.join(platformDir, 'artifacts', job.projectId, job.runId);
  await fs.mkdir(artifactDir, { recursive: true });
  const itemJsonPath = path.join(artifactDir, 'item.json');
  const outputJson = path.join(artifactDir, 'artifact.json');
  const outputXlsx = path.join(artifactDir, 'artifact.xlsx');
  await fs.writeFile(itemJsonPath, JSON.stringify(buildFrameworkItem(job.problemItem), null, 2), 'utf8');
  let apiKey = '';
  try {
    apiKey = resolveApiKey();
  } catch (error) {
    await updateRun(job.runId, {
      status: 'failed',
      diagnostics: {
        stdout: '',
        stderr: error instanceof Error ? error.message : String(error),
        durationMs: 0,
      },
      errorMessage: error instanceof Error ? error.message : 'Server config missing WANFLOW_QWEN_API_KEY.',
      finishedAt: now(),
    }).catch(() => {});
    throw error;
  }

  await updateRun(job.runId, {
    status: 'running',
    startedAt: now(),
  });

  const startedAt = Date.now();
  const args = [
    '-m',
    'math_eval_framework.cli',
    'evaluate',
    '--item-json',
    itemJsonPath,
    '--base-url',
    job.config.baseUrl,
    '--api-key',
    apiKey,
    '--model-name',
    normalizeModelName(job.config.modelName),
    '--runs',
    String(job.config.runs),
    '--parallelism',
    String(job.config.parallelism),
    '--temperature',
    String(job.config.temperature),
    '--max-tokens',
    String(job.config.maxTokens),
    '--output-xlsx',
    outputXlsx,
    '--output-json',
    outputJson,
  ];

  const result = await runCli(args);
  if (result.code !== 0) {
    await updateRun(job.runId, {
      status: 'failed',
      diagnostics: {
        stdout: result.stdout,
        stderr: result.stderr,
        durationMs: Date.now() - startedAt,
      },
      errorMessage: result.stderr || 'Python benchmark execution failed.',
      finishedAt: now(),
    });
    return;
  }

  const frameworkArtifact = JSON.parse(await fs.readFile(outputJson, 'utf8'));
  const summary = frameworkArtifact.summary || {};
  const runArtifacts = [
    {
      id: `${job.runId}-json`,
      benchmarkRunId: job.runId,
      kind: 'json',
      storagePath: path.relative(rootDir, outputJson),
      fileName: 'artifact.json',
      fileSize: (await fs.stat(outputJson)).size,
      createdAt: now(),
    },
    {
      id: `${job.runId}-xlsx`,
      benchmarkRunId: job.runId,
      kind: 'xlsx',
      storagePath: path.relative(rootDir, outputXlsx),
      fileName: 'artifact.xlsx',
      fileSize: (await fs.stat(outputXlsx)).size,
      createdAt: now(),
    },
  ];
  await replaceArtifacts(job.runId, runArtifacts);
  await updateRun(job.runId, {
    status: 'completed',
    diagnostics: {
      stdout: result.stdout,
      stderr: result.stderr,
      durationMs: Date.now() - startedAt,
    },
    scoreSummary: {
      accuracy: Number(summary.accuracy || 0),
      correctCount: Number(summary.correct_count || 0),
      totalRuns: Number(summary.run_count || 0),
      latencyBand: formatLatencyBand(frameworkArtifact.runs || []),
    },
    artifactJsonPath: runArtifacts[0].storagePath,
    artifactXlsxPath: runArtifacts[1].storagePath,
    errorMessage: null,
    finishedAt: now(),
  });

  await fs.unlink(jobPath).catch(() => {});
}

main().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});
