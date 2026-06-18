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
Create a `.env` file from `.env.example` and set `APP_URL`, `APP_USERNAME`, and `APP_PASSWORD`.
These are loaded via `config/env.ts` (`import { env } from '@config/env'`).
If the `.env` file is missing, tests will use empty strings (which may cause authentication failures).

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
- `pages/BasePage.ts` — base class wrapping all common Playwright actions. All page objects and
  components extend this. See **BasePage API** section below for the full method reference.
- `pages/LoginPage.ts`, `pages/MyWhamPage.ts` — page objects.
- `pages/components/wham/` — `MyWhamPage` is composed of section/component objects
  (`WhamSearchSection`, `WhamTableSection`, `WhamAddEditModal`, `WhamPropertyModal`,
  `WhamValidationPopup`, `WhamDeletePopup`), each its own `BasePage` subclass. Access them via
  `myWhamPage.search`, `myWhamPage.table`, etc. Tests typically instantiate
  `new MyWhamPage(authenticatedPage)` and drive the components.

### BasePage API

#### Navigation
| Method | Description |
|---|---|
| `navigateTo(url, waitState?)` | Navigates and waits. Default `waitState` is `domcontentloaded` (not `networkidle`). |
| `waitForPageLoad(state?)` | Waits for load state. Default `domcontentloaded`. |
| `reloadPage()` | Reloads and waits. |
| `waitForUrlToContain(urlPart, timeout?)` | Waits until URL includes the string. |
| `waitForUrlToMatch(pattern, timeout?)` | Waits until URL matches a RegExp. |

#### Waits
| Method | Description |
|---|---|
| `waitForElementVisible(locator, timeout?)` | Waits for element to be visible. |
| `waitForElementHidden(locator, timeout?)` | Waits for element to be hidden. |
| `waitForElementAttached(locator, timeout?)` | Waits for element to be in the DOM. |
| `waitForElementDetached(locator, timeout?)` | Waits for element to leave the DOM. |
| `wait(ms)` | Fixed delay (use sparingly). |
| `waitForSpinnerToDisappear(timeout?)` | Waits for `.blockui` spinner to clear. Call after any action that triggers loading. |

#### Clicks & Keyboard
| Method | Description |
|---|---|
| `clickElement(locator)` | Waits for visibility then clicks. Primary click method. |
| `doubleClickElement(locator)` | Double-click. |
| `forceClick(locator)` | Force-clicks (bypasses visibility check). Use only when overlapping elements block normal click. |
| `pressEscape()` | Closes modals, dropdowns, datepicker. |
| `pressEnter(locator?)` | Submits forms. Pass locator to scope to element, omit for global. |
| `pressTab(locator?)` | Moves focus / closes datepicker after fill. |
| `pressKey(locator, key)` | Presses any key on a specific element. |

#### Inputs
| Method | Description |
|---|---|
| `fillInput(locator, value)` | Waits for visibility then fills. Primary fill method. |
| `clearAndFill(locator, value)` | Clears then fills (for fields with existing values). |
| `appendText(locator, value)` | Types character by character via `pressSequentially`. |
| `selectAllText(locator)` | Ctrl+A on the element. |

#### Date Picker
| Method | Description |
|---|---|
| `fillDate(inputLocator, date)` | **Primary method.** Fills `MM/DD/YYYY` string and presses Tab to close the picker. |
| `selectDateFromPicker(inputLocator, date)` | **Fallback only.** Navigates the Bootstrap calendar when the input is read-only. |

#### Dropdowns (native `<select>`)
| Method | Description |
|---|---|
| `selectDropdownByLabel(locator, label)` | **Primary method.** Selects by visible text — use this always. |
| `getSelectedOptionText(locator)` | Returns the currently selected option text. |
| `selectDropdown(locator, value)` | ⚠️ **Deprecated.** Value-based; brittle with numeric IDs. |
| `selectDropdownByIndex(locator, index)` | ⚠️ **Deprecated.** Index-based; breaks on reorder. |

#### Checkboxes
| Method | Description |
|---|---|
| `checkCheckbox(locator)` | Checks if unchecked. For non-table checkboxes. |
| `uncheckCheckbox(locator)` | Unchecks if checked. For non-table checkboxes. |
| `selectAllRows(tableLocator)` | Clicks the header "select all" checkbox in a kt-datatable. |
| `selectRowCheckbox(rowLocator)` | Clicks the per-row checkbox. Pass a row from `getRowById()`. |
| `isRowCheckboxChecked(rowLocator)` | Returns `boolean` — current check state of a row. |

#### Table (kt-datatable)
The site uses `kt-datatable` for all tables. Row IDs follow `#${tableId}_row_${recordId}`.

| Method | Description |
|---|---|
| `getRowById(tableId, recordId)` | Returns row `Locator` by record ID. e.g. `getRowById('myWhamSearchTable', 2525)` |
| `getCellText(rowLocator, fieldName)` | Reads cell text by `data-field` name. e.g. `getCellText(row, 'Level')` |
| `getRowCount(tableLocator)` | Counts `.kt-datatable__row` elements. |
| `waitForTableRows(tableLocator, timeout?)` | Waits for first row to be visible after search. |
| `searchInTable(inputLocator, searchText)` | Fills search input, presses Enter, waits for spinner. |
| `clickColumnHeader(tableLocator, columnName)` | Clicks a column header to sort. |
| `getColumnSortOrder(tableLocator, columnName)` | Returns `'asc'`, `'desc'`, or `'none'`. |

#### Pagination (kt-datatable)
| Method | Description |
|---|---|
| `goToNextPage(tableLocator)` | Clicks next page and waits for spinner. |
| `goToPreviousPage(tableLocator)` | Clicks previous page and waits for spinner. |
| `goToPage(tableLocator, pageNumber)` | Navigates to a specific page number. |
| `getCurrentPage(tableLocator)` | Returns current active page number. |
| `getTotalPages(tableLocator)` | Returns total number of pages. |

#### Modals
| Method | Description |
|---|---|
| `waitForModalVisible(modalLocator, timeout?)` | Waits for modal to open. |
| `waitForModalClosed(modalLocator, timeout?)` | Waits for modal to close after submit/cancel. |
| `getModalTitle(modalLocator)` | Reads `.modal-title` text. |
| `closePopupIfVisible(closeButton)` | Clicks close only if currently visible. |
| `validatePopupVisible(locator)` | Waits then asserts visible. |

#### Toast / Alerts
⚠️ Toast selectors (`.alert, .toast`) are generic placeholders — update once actual DOM is confirmed.

| Method | Description |
|---|---|
| `waitForToast(message?, timeout?)` | Waits for toast; filter by message text if provided. |
| `getToastMessage()` | Reads toast text content. |
| `waitForToastToDisappear(timeout?)` | Waits for toast to clear before next action. |

#### Form Validation
| Method | Description |
|---|---|
| `getFieldError(fieldLocator)` | Reads Bootstrap `.invalid-feedback` error for a field. |
| `waitForFieldError(fieldLocator, timeout?)` | Waits for `is-invalid` class to appear after bad submit. |
| `validateFieldError(fieldLocator, expectedMessage)` | Asserts error message contains expected text. |

#### Saved Criteria (reports bar)
⚠️ `selectSavedCriteria` uses a generic selector — update with actual `<select>` ID once confirmed.

| Method | Description |
|---|---|
| `selectSavedCriteria(optionText)` | Selects a saved criteria entry from the dropdown. |
| `saveCurrentCriteria(name)` | Clicks Save, fills name modal (`#savedReportName`), confirms via `#saveSubmit`. |
| `resetCriteria()` | Clicks Reset button. |
| `deleteSavedCriteria()` | Clicks Delete button. |
| `clickPrint()` | Clicks Print to open the report submission modal. |

#### Report Queue (My Process)
| Method | Description |
|---|---|
| `submitReportToQueue(description)` | Fills description modal and saves. Call after `clickPrint()`. |
| `searchMyProcess()` | Clicks Search in My Process and waits for spinner. |
| `getReportStatus(rowLocator)` | Reads `i.badge` text from a My Process row (`Start`/`Started`/`Success`/`Error`). |
| `waitForReportComplete(refreshFn, rowLocator, timeout?)` | Polls every 15s via `refreshFn` until `Success` or `Error`. Default timeout 5 min. Throws on error. |
| `getResultFileLinks(modalLocator)` | Returns all `href` values from the results modal (PDF/TXT links). |
| `downloadResultFile(linkLocator)` | Clicks a result link and returns a Playwright `Download` object. |

#### New Tab
| Method | Description |
|---|---|
| `waitForNewTab(triggerFn)` | Wraps an action that opens a new tab. Returns the new `Page`. |

#### Validation (use in specs, not page objects)
| Method | Description |
|---|---|
| `validateElementVisible(locator)` | `expect(locator).toBeVisible()` |
| `validateElementHidden(locator)` | `expect(locator).toBeHidden()` |
| `validateElementEnabled(locator)` | `expect(locator).toBeEnabled()` |
| `validateElementDisabled(locator)` | `expect(locator).toBeDisabled()` |
| `validateText(locator, text)` | `expect(locator).toContainText(text)` |
| `validateExactText(locator, text)` | `expect(locator).toHaveText(text)` |
| `validateValue(locator, value)` | `expect(locator).toHaveValue(value)` |
| `validateUrl(expected)` | `expect(page).toHaveURL(expected)` |
| `validateTitle(expected)` | `expect(page).toHaveTitle(expected)` |
| `validateElementCount(locator, count)` | `expect(locator).toHaveCount(count)` |

#### Utilities
| Method | Description |
|---|---|
| `getText(locator)` | Returns `textContent()`. |
| `getInputValue(locator)` | Returns `inputValue()`. |
| `isVisible(locator)` | Returns `boolean`. |
| `isEnabled(locator)` | Returns `boolean`. |
| `isElementPresent(locator)` | Returns `true` if element exists in DOM (regardless of visibility). |
| `uploadFile(inputLocator, filePath)` | Sets files on a file input. |
| `waitForDownload()` | Waits for a download event and returns `Download`. |
| `takeScreenshot(fileName)` | Saves full-page screenshot to `screenshots/`. |
| `scrollIntoView(locator)` | Scrolls element into view. |
| `scrollToBottom()` | Scrolls page to bottom. |
| `scrollToTop()` | Scrolls page to top. |

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
Priority order: 1) role/label/placeholder (`getByRole`, `getByLabel`, `getByPlaceholder`);
2) stable `data-testid` (request these from the frontend team for dynamic/table/modal elements);
3) scoped CSS by stable attribute (`[data-field='To']`). **Banned:** positional XPath, `nth-child` chains,
and auto-generated ids (e.g. Parsley `parsley-id-9`) — these are the main source of breakage.

## Notes / gotchas

- `test.config.ts` is a leftover OpenCart template (hardcoded localhost/MacBook data) and is **not**
  used by the current suite — do not rely on or extend it.
- Generated artifacts (`test-results/`, `playwright-report/`, `allure-results/`, `.playwright/`) are
  gitignored; don't commit them.
- `auth.setup` confirms login by waiting for a `Welcome <username>` heading; `LoginPage.verifyLoginSuccess`
  checks the URL matches `/dashboard|home/i` — keep these in sync if the app's post-login UI changes.
- The project uses GitHub Actions for CI (see `.github/workflows/playwright.yml`). Tests run on push
  and pull request to `main` and `master` branches.