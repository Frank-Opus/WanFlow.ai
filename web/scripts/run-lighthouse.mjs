import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, '.lighthouse');
const runtimeRoot = path.join(outputDir, '.runtime');
const port = Number(process.env.LIGHTHOUSE_PORT ?? process.env.PORT ?? 3401);
const baseURL = process.env.LIGHTHOUSE_BASE_URL ?? `http://127.0.0.1:${port}`;

const audits = [
  { id: 'home', path: '/' },
  { id: 'solutions', path: '/solutions' },
  { id: 'contact', path: '/contact' },
  { id: 'proofbench-login', path: '/dataflow/proofbench/login' },
];

const thresholds = {
  performance: 0.75,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
};

function formatScore(value) {
  if (typeof value !== 'number') {
    return 'n/a';
  }
  return `${Math.round(value * 100)}`;
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function probeServer(url, attempts = 60) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'wanflow-lighthouse-probe' },
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok) {
        return true;
      }
    } catch {
      // Keep polling until the server is reachable or the attempt budget ends.
    }
    await wait(1000);
  }

  return false;
}

async function ensureBuildArtifacts() {
  const buildIdPath = path.join(projectRoot, '.next', 'BUILD_ID');
  try {
    await fs.access(buildIdPath);
  } catch {
    throw new Error('Missing Next.js production build. Run `cd web && npm run build` before `npm run audit:lighthouse`.');
  }
}

async function startAuditServer() {
  await ensureBuildArtifacts();
  await fs.rm(runtimeRoot, { recursive: true, force: true });
  const platformDir = path.join(runtimeRoot, 'platform-data');
  const leadsDir = path.join(runtimeRoot, 'marketing-leads');
  await fs.mkdir(platformDir, { recursive: true });
  await fs.mkdir(leadsDir, { recursive: true });

  const server = spawn('npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: projectRoot,
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(port),
      WANFLOW_PLATFORM_DIR: platformDir,
      WANFLOW_MARKETING_LEADS_DIR: leadsDir,
    },
    stdio: 'pipe',
  });

  let stderr = '';
  server.stderr.on('data', (chunk) => {
    stderr += String(chunk);
  });

  const ready = await probeServer(baseURL);
  if (!ready) {
    server.kill('SIGTERM');
    throw new Error(`Timed out waiting for Lighthouse audit server on ${baseURL}.\n${stderr}`.trim());
  }

  return server;
}

let auditServer = null;
if (!(await probeServer(baseURL, 2))) {
  auditServer = await startAuditServer();
}

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
});

const failures = [];

try {
  await fs.mkdir(outputDir, { recursive: true });

  for (const audit of audits) {
    const targetUrl = new URL(audit.path, baseURL).toString();
    await fetch(targetUrl, { headers: { 'user-agent': 'wanflow-lighthouse-warmup' } }).catch(() => null);
    const result = await lighthouse(targetUrl, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: Object.keys(thresholds),
      throttlingMethod: 'provided',
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        width: 1440,
        height: 1200,
        deviceScaleFactor: 1,
        disabled: false,
      },
    });

    if (!result?.lhr) {
      failures.push(`${audit.id}: missing Lighthouse result`);
      continue;
    }

    const reportPath = path.join(outputDir, `${audit.id}.json`);
    await fs.writeFile(reportPath, result.report, 'utf8');

    const line = [
      audit.id.padEnd(16),
      `performance ${formatScore(result.lhr.categories.performance?.score)}`.padEnd(18),
      `accessibility ${formatScore(result.lhr.categories.accessibility?.score)}`.padEnd(20),
      `best-practices ${formatScore(result.lhr.categories['best-practices']?.score)}`.padEnd(22),
      `seo ${formatScore(result.lhr.categories.seo?.score)}`,
    ].join(' | ');
    console.log(line);

    for (const [category, threshold] of Object.entries(thresholds)) {
      const score = result.lhr.categories[category]?.score;
      if (typeof score !== 'number' || score < threshold) {
        failures.push(`${audit.id}: ${category} ${formatScore(score)} < ${Math.round(threshold * 100)}`);
      }
    }
  }
} finally {
  await chrome.kill();
  if (auditServer) {
    auditServer.kill('SIGTERM');
    await wait(500);
  }
}

if (failures.length > 0) {
  console.error('\nLighthouse threshold failures:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`\nLighthouse reports written to ${outputDir}`);
