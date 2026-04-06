import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ensurePlatformStorage, PLATFORM_DB_PATH, PLATFORM_DIR } from '@/lib/platform-store';

export const DISPLAY_MODEL = process.env.WANFLOW_DEFAULT_MODEL ?? 'Qwen/Qwen3-235B-A22B-Thinking-2507';
export const DEFAULT_BASE_URL = process.env.WANFLOW_BASE_URL ?? 'http://35.220.164.252:3888/v1/';
export const DEFAULT_PYTHON_BIN = process.env.WANFLOW_PYTHON_BIN ?? path.join(process.env.HOME ?? '', 'miniconda3', 'bin', 'python3');

export const MODEL_ALIASES: Record<string, string> = {
  'qwen/qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
  'qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
};

export type HealthCheck = {
  name: string;
  status: 'ok' | 'warn' | 'error';
  detail: string;
};

export function normalizeModelName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return MODEL_ALIASES[DISPLAY_MODEL.toLowerCase()] ?? DISPLAY_MODEL;
  }
  return MODEL_ALIASES[trimmed.toLowerCase()] ?? trimmed;
}

export function readConfiguredApiKey() {
  return process.env.WANFLOW_QWEN_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || '';
}

export async function resolvePythonBin(): Promise<string> {
  try {
    await fs.access(DEFAULT_PYTHON_BIN);
    return DEFAULT_PYTHON_BIN;
  } catch {
    return 'python3';
  }
}

export async function getPlatformRuntimeHealth() {
  const checks: HealthCheck[] = [];
  const apiKey = readConfiguredApiKey();
  checks.push({
    name: 'api_key',
    status: apiKey ? 'ok' : 'error',
    detail: apiKey ? 'WANFLOW_QWEN_API_KEY is configured.' : 'WANFLOW_QWEN_API_KEY is missing.',
  });

  const pythonBin = await resolvePythonBin();
  checks.push({
    name: 'python_bin',
    status: pythonBin === 'python3' ? 'warn' : 'ok',
    detail: pythonBin === 'python3' ? 'Falling back to python3 from PATH.' : `Resolved Python runtime: ${pythonBin}`,
  });

  try {
    await ensurePlatformStorage();
    await fs.access(PLATFORM_DIR);
    await fs.access(PLATFORM_DB_PATH);
    checks.push({
      name: 'platform_storage',
      status: 'ok',
      detail: `Platform storage ready at ${PLATFORM_DIR}.`,
    });
  } catch (error) {
    checks.push({
      name: 'platform_storage',
      status: 'error',
      detail: error instanceof Error ? error.message : 'Failed to initialize platform storage.',
    });
  }

  checks.push({
    name: 'model_endpoint',
    status: 'ok',
    detail: `Configured endpoint: ${DEFAULT_BASE_URL}`,
  });

  checks.push({
    name: 'model_alias',
    status: 'ok',
    detail: `Display model ${DISPLAY_MODEL} normalizes to ${normalizeModelName(DISPLAY_MODEL)}.`,
  });

  const status = checks.some((entry) => entry.status === 'error')
    ? 'error'
    : checks.some((entry) => entry.status === 'warn')
      ? 'warn'
      : 'ok';

  return {
    status,
    checks,
    runtime: {
      platformDir: PLATFORM_DIR,
      dbPath: PLATFORM_DB_PATH,
      baseUrl: DEFAULT_BASE_URL,
      displayModel: DISPLAY_MODEL,
      normalizedModel: normalizeModelName(DISPLAY_MODEL),
      pythonBin,
      apiKeyConfigured: Boolean(apiKey),
    },
  };
}
