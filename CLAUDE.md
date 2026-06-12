# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Playwright end-to-end test automation (TypeScript) for the **LandNav** web application,
targeting the **My WHAM** module and login/auth flows. Tests run against a hosted dev
environment (default `https://dev-qa2-cp.test.landnav.com/`, overridable via `APP_URL`).

## Commands

```bash
npm test                 # run all tests (playwright test)
npm run test:chrome      # run only the chromium project
npm run test:headed      # run with a visible browser
npm run test:debug       # run with the Playwright inspector
npm run report           # open the HTML report
npm run allure:gen       # generate Allure report from allure-results
npm run allure:open      # open the Allure report

# Run a single test file / single test
npx playwright test tests/mywham/SearchWham.spec.ts
npx playwright test -g "basic message search"
```

There is no lint/typecheck npm script; type errors surface at runtime via ts-node/Playwright's
transpilation. `tsconfig.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`.

## Environment setup

Credentials and target URL come from a `.env` file (see `.env.example`):
`APP_URL`, `APP_USERNAME`, `APP_PASSWORD`. Loaded via `config/env.ts` (`import { env } from '@config/env'`).
Tests will silently use empty strings if `.env` is missing.

## Architecture

### Authentication flow (critical to understand before touching projects/config)
`playwright.config.ts` defines three projects with a specific dependency chain:
- **`setup`** — runs `tests/auth/auth.setup.spec.ts` once, logs in, and saves storage state to
  `.playwright/.auth/user.json`.
- **`chrome`** — the main project. Depends on `setup`, loads the saved auth state (only if the file
  exists, to avoid ENOENT on first run), and **ignores** the login specs. This is where all WHAM tests run.
- **`login`** — runs `tests/auth/Login.spec.ts` with `storageState: undefined` so login UI can be
  tested unauthenticated.

When adding tests that need a logged-in session, they belong to the `chrome` project (anything in
`tests/` not matching the ignore patterns). Tests that must run logged-out require
`test.use({ storageState: undefined })`.

### Fixtures (`fixtures/index.ts`)
Custom test extends Playwright's `base` with:
- `loginPage` — a `LoginPage` instance.
- `authenticatedPage` — a `Page` already navigated to `env.url` (relies on saved auth state).

WHAM specs import `test` from `../../fixtures` (not `@playwright/test`) to get `authenticatedPage`.
The login spec imports `test` directly from `@playwright/test`.

### Page Object Model
- `pages/BasePage.ts` — base class wrapping common Playwright actions (waits, clicks, fills,
  dropdowns, table helpers, validation/`expect` wrappers, downloads, logging). All page objects and
  components extend this.
- `pages/LoginPage.ts`, `pages/MyWhamPage.ts` — page objects.
- `pages/components/wham/` — `MyWhamPage` is composed of section/component objects
  (`WhamSearchSection`, `WhamTableSection`, `WhamAddEditModal`, `WhamPropertyModal`,
  `WhamValidationPopup`, `WhamDeletePopup`), each its own `BasePage` subclass. Access them via
  `myWhamPage.search`, `myWhamPage.table`, etc. Tests typically instantiate
  `new MyWhamPage(authenticatedPage)` and drive the components.

### Test data
- `testdata/mywham/*.ts` — typed data objects per feature (`whamSearchData`, `whamAddEditData`,
  `whamNegativeData`, `whamPropertyData`, `whamValidationData`). Imported directly into specs.
- `testdata/logindata.{json,csv}` — consumed via `utils/dataProvider.ts` (`DataProvider.getTestDataFromJson` / `getTestDataFromCsv`).
- `utils/randomDataGenerator.ts` — faker-based random data.

### Path aliases (tsconfig.json)
`@pages/*`, `@utils/*`, `@config/*`, `@testdata/*`. Note: many existing files use relative imports
instead — both work.

## Conventions

- **File naming:** Page objects → PascalCase (`HomePage.ts`, `MyWhamPage.ts`); spec files →
  camelCase (`addWham.spec.ts`, `login.spec.ts`); test-data files → camelCase
  (`whamSearchData.ts`); utils → camelCase (`dataProvider.ts`). The `login` project in
  `playwright.config.ts` matches `/login\.spec\.ts/`, so keep that filename casing.
- One spec per feature under `tests/<module>/` (`addWham`, `editWham`, `deleteWham`, ...).
- **Navigation:** reach modules through `HomePage` (`pages/HomePage.ts`), which uses the
  `navigation "Main Navigation"` landmark and link names — never positional XPath like `//li[5]`.
  A module page's nav method delegates to `home.openX()`.
- **Assertions live in specs, not page objects.** Page objects only DO (`clickSave`, `enterMessage`)
  and READ (`getRowCount`, expose `readonly` Locators). Specs call `expect(...)`. The WHAM components
  no longer contain any `validateX`/`expect` methods — all WHAM specs assert directly on the public
  Locators. (`BasePage`/`LoginPage` still expose generic `validateX` helpers; don't reintroduce
  assertion methods on the WHAM page objects.) Page-object methods may still *wait* for readiness
  (`waitForElementVisible`), which is not an assertion.
- **Every test must assert a real outcome** — "no exception thrown" is not a pass. See
  `tests/mywham/addWham.spec.ts` as the **reference spec**: `test.step` for reporting (not
  `console.log`), typed data, and outcome assertions (value retained, option selected, modal closed).
- **Test data is typed.** Add an `interface` for each data set (e.g. `WhamAddEditDataShape` in
  `testdata/mywham/whamAddEditData.ts`) so typos fail at compile time. Use `RandomDataUtil` for
  unique create-data.
- `fullyParallel: false`, `workers: 4`, `retries: process.env.CI ? 1 : 0` — tests share one
  authenticated state, so avoid cross-test data dependencies; clean up anything a test creates.
- Page objects use a heavily commented, one-arg-per-line style; match it when editing existing files.

### Locator strategy (for new modules)
Priority order: 1) role/label/placeholder (`getByRole`, `getByLabel`); 2) stable `data-testid`
(request these from the frontend team for dynamic/table/modal elements); 3) scoped CSS by stable
attribute (`[data-field='To']`). **Banned:** positional XPath, `nth-child` chains, and
auto-generated ids (e.g. Parsley `parsley-id-9`) — these are the main source of breakage.

## Notes / gotchas

- `test.config.ts` is a leftover OpenCart template (hardcoded localhost/MacBook data) and is **not**
  used by the current suite — do not rely on or extend it.
- Generated artifacts (`test-results/`, `playwright-report/`, `allure-results/`, `.playwright/`) are
  gitignored; don't commit them.
- `auth.setup` confirms login by waiting for a `Welcome <username>` heading; `LoginPage.verifyLoginSuccess`
  checks the URL matches `/dashboard|home/i` — keep these in sync if the app's post-login UI changes.
