import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { environment } from './utils/environment';

// ── Auth state path (single source of truth) ─────────────────────────────────
const AUTH_FILE = path.resolve(__dirname, '.playwright/.auth/user.json');

// ── Target environment (qa1 | qa2 | dev) — select via TEST_ENV ───────────────
// Config is loaded once per worker process; only log in the main process so the
// banner prints a single time instead of once per worker.
if (!process.env.TEST_WORKER_INDEX) {
  console.log(`▶ Running against "${environment.name}" → ${environment.url}`);
}

export default defineConfig({

  // ── General ────────────────────────────────────────────────────────────────
  testDir: './tests',
  timeout: 40_000,          // 30 s per test action
  fullyParallel: true,
  // Retry once on CI so the existing trace:'on-first-retry' actually captures
  // a trace for triage; keep 0 locally for fast feedback.
  retries: process.env.CI ? 6 : 0,
  workers: 6,

  // ── Reporters ──────────────────────────────────────────────────────────────
  reporter: [
    ['html'],
    ['allure-playwright', {resultsDir: 'allure-results'}],
    ['dot'],
    ['list'],
  ],

  // ── Shared browser options ─────────────────────────────────────────────────
  use: {
    baseURL: environment.url,
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
      testMatch: /login\.spec\.ts/,
      use: {
        storageState: undefined, // ✅ critical — no auth for login page tests
      },
    },


    // 2️⃣  Main project — named after the active environment so test output
    //     and reports show e.g. [qa1] / [qa2] / [dev] instead of [chrome].
    {
      name: environment.name,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        // ✅ Only load auth file if it already exists (prevents ENOENT on first run)
        storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
      },
      dependencies: ['setup'],
      // guarantees setup runs first every time

      // ✅ EXCLUDE login tests here
      testIgnore: [/login\.spec\.ts/, /auth[\\/]auth\.setup/],

    },

    // ── Cross-browser projects (enable when needed) ────────────────────────────
    // Each is named "<env>-<browser>" so reports stay environment-aware, e.g.
    // [qa2-firefox]. Uncomment the block(s) you want and run with
    // `playwright test --project=qa2-firefox`.
    //
    // {
    //   name: `${environment.name}-firefox`,
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
    //   },
    //   dependencies: ['setup'],
    //   testIgnore: [/login\.spec\.ts/, /auth[\\/]auth\.setup/],
    // },
    //
    // {
    //   name: `${environment.name}-webkit`,
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
    //   },
    //   dependencies: ['setup'],
    //   testIgnore: [/login\.spec\.ts/, /auth[\\/]auth\.setup/],
    // },
    //
    // {
    //   name: `${environment.name}-edge`,
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
    //   },
    //   dependencies: ['setup'],
    //   testIgnore: [/login\.spec\.ts/, /auth[\\/]auth\.setup/],
    // },
  ],
});