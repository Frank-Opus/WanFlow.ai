import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3401);
const baseURL = `http://127.0.0.1:${port}`;
const runtimeRoot = path.join(__dirname, '.playwright-runtime');
const platformDir = path.join(runtimeRoot, 'platform-data');
const leadsDir = path.join(runtimeRoot, 'marketing-leads');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  webServer: {
    command:
      `rm -rf "${runtimeRoot}" && mkdir -p "${runtimeRoot}" && ` +
      `WANFLOW_PLATFORM_DIR="${platformDir}" WANFLOW_MARKETING_LEADS_DIR="${leadsDir}" ` +
      `npm run build && ` +
      `WANFLOW_PLATFORM_DIR="${platformDir}" WANFLOW_MARKETING_LEADS_DIR="${leadsDir}" PORT=${port} npm run start`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1200 },
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 13'],
      },
    },
  ],
});
