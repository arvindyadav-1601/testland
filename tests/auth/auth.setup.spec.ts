/**
 * tests/auth/auth.setup.ts
 *
 * ONE-TIME AUTHENTICATION SETUP
 *
 * This file is matched by the 'setup' project in playwright.config.ts.
 * It logs in once per worker and saves the browser storage state to
 * .playwright/.auth/user.json.  Every test in the 'chrome' project then
 * starts with that saved state — no login needed in individual tests.
 *
 * Benefits:
 *  - Dramatically faster test execution (no login overhead per test)
 *  - Single point of failure if credentials change
 *  - Consistent authentication state across all tests
 *
 * If the saved state expires mid-run, Playwright will automatically
 * re-run this setup file before retrying the failed test.
 */

import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { env } from '../../config/env';
setup.use({ storageState: undefined })

// Must match AUTH_STATE_PATH in playwright.config.ts
const AUTH_FILE = path.resolve(__dirname, '../../.playwright/.auth/user.json');

setup('authenticate and save storage state', async ({ page }) => {
  console.log(`[auth.setup] Logging in as: ${env.username}`);


  // Ensure the .auth directory exists
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });

  // ── Step 1: Navigate to the login page ────────────────────────────────────
  await page.goto(env.url);

  // ── Step 2: Fill credentials ──────────────────────────────────────────────
  await page.getByPlaceholder('Username').fill(env.username);
  await page.getByPlaceholder('Password').fill(env.password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // ── Step 3: Confirm successful login ──────────────────────────────────────
  await expect(
    page.getByRole('heading', { name: new RegExp(`Welcome ${env.username}`, 'i') }),
  ).toBeVisible({ timeout: 30_000 });

  // ── Step 4: Save the authenticated browser context to disk ────────────────
  await page.context().storageState({ path: AUTH_FILE });
  console.log(`[auth.setup] Storage state saved to: ${AUTH_FILE}`);
});
