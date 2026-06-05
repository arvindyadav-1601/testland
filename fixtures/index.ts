// fixtures/index.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '@config/env';

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto(env.url); // already logged-in session
    await use(page);

  },
});

export { expect } from '@playwright/test';



