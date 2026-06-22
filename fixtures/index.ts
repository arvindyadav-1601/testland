// fixtures/index.ts
//
// Central fixture registry for the LandNav test suite.
// All specs import { test, expect } from here — never from @playwright/test directly.
//
// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW MODULE FIXTURE
// ─────────────────────────────────────────────────────────────
// 1. Build the page object: pages/YourModulePage.ts
//
// 2. Import it here:
//    import { YourModulePage } from '../pages/YourModulePage';
//
// 3. Add it to MyFixtures type:
//    yourModulePage: YourModulePage;
//
// 4. Add the fixture implementation below the last module fixture.
//    - Receive authenticatedPage and homePage as dependencies.
//    - Call the page's open/navigate method so specs start on the right page.
//    Example:
//
//    yourModulePage: async ({ authenticatedPage, homePage }, use) => {
//        const modulePage = new YourModulePage(authenticatedPage, homePage);
//        await modulePage.openYourModulePage();
//        await use(modulePage);
//    },
//
// 5. Specs destructure the fixture — no new/navigate boilerplate needed:
//    test('my test', async ({ yourModulePage }) => { ... });
// ─────────────────────────────────────────────────────────────

import { test as base, Page } from '@playwright/test';

import { LoginPage }  from '../pages/LoginPage';
import { HomePage }   from '../pages/HomePage';
import { MyWhamPage } from '../pages/MyWhamPage';

// Add new module page imports here ↓
// import { CashReceiptingPage } from '../pages/CashReceiptingPage';
// import { BillMaintenancePage } from '../pages/BillMaintenancePage';
// import { ProcessesPage }       from '../pages/ProcessesPage';
// import { ReportsPage }         from '../pages/ReportsPage';
// import { SettingsPage }        from '../pages/SettingsPage';

import { env } from '@config/env';

type MyFixtures = {

    // ── Foundation ──────────────────────────────────────────
    loginPage:         LoginPage;   // unauthenticated — login.spec.ts only
    authenticatedPage: Page;        // raw page with saved auth state loaded
    homePage:          HomePage;    // sidebar navigation — shared by all modules

    // ── Module pages ────────────────────────────────────────
    myWhamPage:        MyWhamPage;

    // Add new module fixture types here ↓
    // cashReceiptingPage: CashReceiptingPage;
    // billMaintenancePage: BillMaintenancePage;
    // processesPage:       ProcessesPage;
    // reportsPage:         ReportsPage;
    // settingsPage:        SettingsPage;
};

export const test = base.extend<MyFixtures>({

    // ── Foundation fixtures ──────────────────────────────────

    loginPage: async ({ page }, use) => {

        await page.goto(env.url);

        await page.waitForLoadState('domcontentloaded');

        await use(new LoginPage(page));
    },

    authenticatedPage: async ({ page }, use) => {

        await page.goto(env.url);

        await page.waitForLoadState('domcontentloaded');

        await use(page);
    },

    homePage: async ({ authenticatedPage }, use) => {

        await use(new HomePage(authenticatedPage));
    },

    // ── Module fixtures ──────────────────────────────────────

    myWhamPage: async ({ authenticatedPage, homePage }, use) => {

        const myWhamPage = new MyWhamPage(authenticatedPage, homePage);

        await myWhamPage.openMyWhamPage();

        await use(myWhamPage);
    },

    // Add new module fixtures here ↓

    // cashReceiptingPage: async ({ authenticatedPage, homePage }, use) => {
    //     const cashReceiptingPage = new CashReceiptingPage(authenticatedPage, homePage);
    //     await cashReceiptingPage.openCashReceiptingPage();
    //     await use(cashReceiptingPage);
    // },

    // billMaintenancePage: async ({ authenticatedPage, homePage }, use) => {
    //     const billMaintenancePage = new BillMaintenancePage(authenticatedPage, homePage);
    //     await billMaintenancePage.openBillMaintenancePage();
    //     await use(billMaintenancePage);
    // },

    // processesPage: async ({ authenticatedPage, homePage }, use) => {
    //     const processesPage = new ProcessesPage(authenticatedPage, homePage);
    //     await processesPage.openProcessesPage();
    //     await use(processesPage);
    // },

    // reportsPage: async ({ authenticatedPage, homePage }, use) => {
    //     const reportsPage = new ReportsPage(authenticatedPage, homePage);
    //     await reportsPage.openReportsPage();
    //     await use(reportsPage);
    // },

    // settingsPage: async ({ authenticatedPage, homePage }, use) => {
    //     const settingsPage = new SettingsPage(authenticatedPage, homePage);
    //     await settingsPage.openSettingsPage();
    //     await use(settingsPage);
    // },
});

export { expect } from '@playwright/test';
