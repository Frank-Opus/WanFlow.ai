import { access } from 'node:fs/promises';
import path from 'node:path';

const defaultPythonBin = process.env.WANFLOW_PYTHON_BIN || path.join(process.env.HOME || '', 'miniconda3', 'bin', 'python3');
const baseUrl = (process.env.WANFLOW_BASE_URL || 'http://35.220.164.252:3888/v1/').trim();
const displayModel = (process.env.WANFLOW_DEFAULT_MODEL || 'Qwen/Qwen3-235B-A22B-Thinking-2507').trim();
const apiKey = (process.env.WANFLOW_QWEN_API_KEY || process.env.OPENAI_API_KEY || '').trim();
const skipModelCatalogCheck = process.env.WANFLOW_SKIP_MODEL_CATALOG_CHECK === '1';

const modelAliases = {
  'qwen/qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
  'qwen3-235b-a22b-thinking-2507': 'qwen3-235b-a22b-thinking-2507',
};

function normalizeModelName(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) {
    return modelAliases[displayModel.toLowerCase()] || displayModel;
  }
  return modelAliases[trimmed.toLowerCase()] || trimmed;
}

async function resolvePythonBin() {
  try {
    await access(defaultPythonBin);
    return defaultPythonBin;
  } catch {
    return 'python3';
  }
}

async function fetchModelCatalog() {
  const endpoint = `${baseUrl.replace(/\/$/, '')}/models`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(endpoint, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Model catalog probe failed: ${response.status} ${response.statusText}`);
    }
    const payload = await response.json();
    const ids = Array.isArray(payload?.data) ? payload.data.map((item) => item?.id).filter(Boolean) : [];
    return { endpoint, ids };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (!apiKey) {
    throw new Error('WANFLOW_QWEN_API_KEY is required.');
  }

  const pythonBin = await resolvePythonBin();
  const normalizedModel = normalizeModelName(displayModel);
  const summary = {
    baseUrl,
    displayModel,
    normalizedModel,
    pythonBin,
    modelCatalogChecked: !skipModelCatalogCheck,
  };

  if (!skipModelCatalogCheck) {
    const catalog = await fetchModelCatalog();
    if (!catalog.ids.includes(normalizedModel)) {
      throw new Error(`Model ${normalizedModel} not found in ${catalog.endpoint}.`);
    }
    summary.modelCatalogSize = catalog.ids.length;
  }

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
