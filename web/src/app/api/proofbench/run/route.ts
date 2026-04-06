import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import {
  buildArtifactFromFrameworkJson,
  defaultRunConfig,
  type ProofBenchExport,
  type ProofBenchRequestConfig,
} from '@/lib/proofbench';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const RUNS_DIR = path.join(ROOT_DIR, 'runs');
const PYTHON_BIN = process.env.WANFLOW_PYTHON_BIN ?? path.join(process.env.HOME ?? '', 'miniconda3', 'bin', 'python3');

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toRunId(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function resolveItemJsonPath(input: string): Promise<string> {
  const candidate = path.isAbsolute(input) ? path.resolve(input) : path.resolve(ROOT_DIR, input);
  const stats = await fs.stat(candidate);
  if (!stats.isFile()) {
    throw new Error(`Item JSON path is not a file: ${candidate}`);
  }
  return candidate;
}

function createOutputFiles(runId: string): ProofBenchExport[] {
  const jsonFile = 'artifact.json';
  const xlsxFile = 'artifact.xlsx';
  return [
    {
      kind: 'artifact_json',
      label: 'JSON artifact',
      fileName: jsonFile,
      relativePath: path.posix.join('runs', runId, jsonFile),
      downloadPath: `/api/proofbench/download?runId=${encodeURIComponent(runId)}&file=${encodeURIComponent(jsonFile)}`,
    },
    {
      kind: 'artifact_workbook',
      label: 'Workbook artifact',
      fileName: xlsxFile,
      relativePath: path.posix.join('runs', runId, xlsxFile),
      downloadPath: `/api/proofbench/download?runId=${encodeURIComponent(runId)}&file=${encodeURIComponent(xlsxFile)}`,
    },
  ];
}

async function resolvePythonBin(): Promise<string> {
  if (PYTHON_BIN && path.isAbsolute(PYTHON_BIN)) {
    try {
      await fs.access(PYTHON_BIN);
      return PYTHON_BIN;
    } catch {}
  }
  return 'python3';
}

async function runCli(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  const pythonBin = await resolvePythonBin();

  return await new Promise((resolve, reject) => {
    const child = spawn(pythonBin, args, {
      cwd: ROOT_DIR,
      env: {
        ...process.env,
        PYTHONPATH: process.env.PYTHONPATH
          ? `${path.join(ROOT_DIR, 'src')}${path.delimiter}${process.env.PYTHONPATH}`
          : path.join(ROOT_DIR, 'src'),
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
    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const apiKey = process.env.WANFLOW_QWEN_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || '';
    if (!apiKey) {
      throw new Error('Server config missing WANFLOW_QWEN_API_KEY.');
    }

    const body = (await request.json().catch(() => ({}))) as Partial<ProofBenchRequestConfig>;
    const config: ProofBenchRequestConfig = {
      itemJsonPath: body.itemJsonPath ?? defaultRunConfig.itemJsonPath,
      baseUrl: body.baseUrl ?? defaultRunConfig.baseUrl,
      modelName: body.modelName ?? defaultRunConfig.modelName,
      runs: clampNumber(Number(body.runs ?? defaultRunConfig.runs), 1, 8),
      parallelism: clampNumber(Number(body.parallelism ?? defaultRunConfig.parallelism), 1, 8),
      temperature: clampNumber(Number(body.temperature ?? defaultRunConfig.temperature), 0, 2),
      maxTokens: clampNumber(Number(body.maxTokens ?? defaultRunConfig.maxTokens), 64, 4096),
    };

    const itemPath = await resolveItemJsonPath(config.itemJsonPath);
    const runId = toRunId();
    const runDir = path.join(RUNS_DIR, runId);
    const outputJson = path.join(runDir, 'artifact.json');
    const outputXlsx = path.join(runDir, 'artifact.xlsx');
    await fs.mkdir(runDir, { recursive: true });

    const cliArgs = [
      '-m',
      'math_eval_framework.cli',
      'evaluate',
      '--item-json',
      itemPath,
      '--base-url',
      config.baseUrl,
      '--api-key',
      apiKey,
      '--model-name',
      config.modelName,
      '--runs',
      String(config.runs),
      '--parallelism',
      String(config.parallelism),
      '--temperature',
      String(config.temperature),
      '--max-tokens',
      String(config.maxTokens),
      '--output-xlsx',
      outputXlsx,
      '--output-json',
      outputJson,
    ];

    const result = await runCli(cliArgs);
    if (result.code !== 0) {
      return NextResponse.json(
        {
          error: 'Python benchmark execution failed.',
          diagnostics: {
            stdout: result.stdout,
            stderr: result.stderr,
            durationMs: Date.now() - startedAt,
          },
        },
        { status: 500 }
      );
    }

    const rawArtifact = JSON.parse(await fs.readFile(outputJson, 'utf8')) as Record<string, unknown>;
    const artifact = buildArtifactFromFrameworkJson(rawArtifact, {
      source: 'live',
      runId,
      itemJsonPath: path.relative(ROOT_DIR, itemPath),
      outputFiles: createOutputFiles(runId),
    });

    return NextResponse.json({
      artifact,
      diagnostics: {
        stdout: result.stdout,
        stderr: result.stderr,
        durationMs: Date.now() - startedAt,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown benchmark error.';
    return NextResponse.json(
      {
        error: message,
        diagnostics: {
          stdout: '',
          stderr: '',
          durationMs: Date.now() - startedAt,
        },
      },
      { status: 500 }
    );
  }
}
