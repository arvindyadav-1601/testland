import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// ── Auth state path (single source of truth) ─────────────────────────────────
const AUTH_FILE = path.resolve(__dirname, '.playwright/.auth/user.json');

export default defineConfig({

  // ── General ────────────────────────────────────────────────────────────────
  testDir: './tests',
  timeout: 30_000,          // 30 s per test action
  fullyParallel: false,
  retries: 1,
  workers: 1,

  // ── Reporters ──────────────────────────────────────────────────────────────
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['dot'],
    ['list'],
  ],

  // ── Shared browser options ─────────────────────────────────────────────────
  use: {
    baseURL: process.env.APP_URL ?? 'https://dev-qa2-cp.test.landnav.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
  },

  // ── Projects ───────────────────────────────────────────────────────────────
  projects: [
    // 1️⃣  Auth setup — runs once, writes user.json
    {
      name: 'setup',
      testMatch: /auth[\\/]auth\.setup/,   // ✅ fixed: was missing escape + dot escape
    },


    {
      name: 'login',
      testMatch: /.*Login\.spec\.ts/,
      use: {
        storageState: undefined, // ✅ critical
      },
    },


    // 2️⃣  Chrome — reuses saved auth state
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        // ✅ Only load auth file if it already exists (prevents ENOENT on first run)
        storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
      },
      dependencies: ['setup'],
      // guarantees setup runs first every time

      // ✅ EXCLUDE login tests here
      testIgnore: [/.*Login\.spec\.ts/, /auth[\\/]auth\.setup/],

    },
  ],
});