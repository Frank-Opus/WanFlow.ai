import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, '.lighthouse');
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
}

if (failures.length > 0) {
  console.error('\nLighthouse threshold failures:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`\nLighthouse reports written to ${outputDir}`);
