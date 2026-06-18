import {
  test,
  expect
} from "@playwright/test";

import { env } from "../../config/env";

import { LoginPage } from "../../pages/LoginPage";

// =====================================================
// DISABLE AUTH STATE
// =====================================================

test.use(
  { storageState: undefined }
);

// =====================================================
// TEST SETUP
// =====================================================

test.beforeEach(
  async ({ page }) => {

      await page.goto(
          env.url
      );
  }
);

// =====================================================
// POSITIVE SCENARIO
// =====================================================

test("valid credentials log the user in", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.usernameInput.fill(
          env.username
      );

      await loginPage.passwordInput.fill(
          env.password
      );

      await loginPage.loginButton.click();

      await expect(
        page.getByText(new RegExp(`Welcome ${env.username}`, 'i'))
      ).toBeVisible();
  }
);

// =====================================================
// NEGATIVE SCENARIOS
// =====================================================

test("invalid password prevents login", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.usernameInput.fill(
          env.username
      );

      await loginPage.passwordInput.fill(
          "wrong-password"
      );

      await loginPage.loginButton.click();

      await loginPage.verifyLoginError;
  }
);

test( "empty username prevents login", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.passwordInput.fill(
          env.password
      );

      await loginPage.loginButton.click();

      await loginPage.verifyLoginError;
  }
);

test("empty password prevents login", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.usernameInput.fill(
          env.username
      );

      await loginPage.loginButton.click();

      await loginPage.verifyLoginError;
  }
);

test("empty username and password prevents login", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.loginButton.click();

      await loginPage.verifyLoginError;
  }
);

// =====================================================
// UI VALIDATIONS
// =====================================================

test( "verify login page UI", async ({ page }) => {

      const loginPage =
          new LoginPage(page);

      await loginPage.verifyLoginPageLoaded();
  }
);
/** 
// ── ✅ Positive Scenario ─────────────────────────────────────

test('valid credentials log the user in', async ({ page }) => {
  await page.fill('[name="Username"]', env.username);
  await page.fill('[name="Password"]', env.password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByText(new RegExp(`Welcome ${env.username}`, 'i'))
  ).toBeVisible();
});

// ── ✅ Negative Scenarios ────────────────────────────────────

test('incorrect password shows error', async ({ page }) => {
  await page.fill('[name="Username"]', env.username);
  await page.fill('[name="Password"]', 'wrong-password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // adjust based on your app
  await expect(page).toHaveURL(/login/i);
});

test('empty username shows error', async ({ page }) => {
  await page.fill('[name="Password"]', env.password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/login/i);
});

test('empty password shows error', async ({ page }) => {
  await page.fill('[name="Username"]', env.username);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/login/i);
});

test('completely empty form shows error', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/login/i);
});

// ── ✅ UI Check ─────────────────────────────────────────────

test('login page has required elements', async ({ page }) => {
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

**/
