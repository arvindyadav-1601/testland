// fixtures/index.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { env } from '@config/env';

type MyFixtures = {
  loginPage:    LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    await page.goto(env.url);
    const lp = new LoginPage(page);
    await lp.login(env.username, env.password);
    await use(page);
  },
});

export { expect } from '@playwright/test';