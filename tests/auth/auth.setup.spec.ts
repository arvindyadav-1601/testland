/**
 * tests/auth/auth.setup.spec.ts
 *
 * ONE-TIME AUTHENTICATION SETUP
 *
 * Runs once as the 'setup' project before the 'chrome' project.
 * Logs in via LoginPage, confirms success, and saves browser storage
 * state to .playwright/.auth/user.json so all 'chrome' tests start
 * with an authenticated session — no per-test login overhead.
 *
 * If the saved state expires mid-run, delete user.json and re-run —
 * this file will execute again before any chrome test retries.
 */

import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { env } from '../../config/env';
import { LoginPage } from '../../pages/LoginPage';

// Run without any pre-existing auth state
setup.use({ storageState: undefined });

// Must match AUTH_FILE path in playwright.config.ts
const AUTH_FILE = path.resolve(
    __dirname,
    '../../.playwright/.auth/user.json'
);

// =====================================================
// AUTHENTICATION SETUP
// =====================================================

setup('authenticate and save storage state', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // ── Step 1: Ensure auth directory exists ──────────────────────────────────
    await setup.step('Ensure auth directory exists', async () => {

        fs.mkdirSync(
            path.dirname(AUTH_FILE),
            { recursive: true }
        );
    });

    // ── Step 2: Navigate to login page ────────────────────────────────────────
    await setup.step('Navigate to login page', async () => {

        await loginPage.navigateTo(env.url);
    });

    // ── Step 3: Verify login page is loaded ───────────────────────────────────
    await setup.step('Verify login page loaded', async () => {

        await loginPage.verifyLoginPageLoaded();
    });

    // ── Step 4: Enter credentials ─────────────────────────────────────────────
    await setup.step(`Enter credentials for: ${env.username}`, async () => {

        await loginPage.fillInput(
            loginPage.usernameInput,
            env.username
        );

        await loginPage.fillInput(
            loginPage.passwordInput,
            env.password
        );
    });

    // ── Step 5: Submit login ───────────────────────────────────────────────────
    await setup.step('Submit login form', async () => {

        await loginPage.clickElement(
            loginPage.loginButton
        );
    });

    // ── Step 6: Confirm successful authentication ─────────────────────────────
    await setup.step('Confirm successful authentication', async () => {

        await expect(
            page.getByRole('link', { name: 'Welcome GCS' })
        ).toBeVisible({ timeout: 30_000 });
    });

    // ── Step 7: Save authenticated storage state to disk ──────────────────────
    await setup.step('Save storage state', async () => {

        await page.context().storageState({ path: AUTH_FILE });
    });
});
