# ⚡ Commands

| Purpose | Command |
|-----------|---------|
| Initial Setup | `npm run setup` |
| Install Browsers | `npm run install:browsers` |
| Run All Tests | `npm test` |
| Run Tests in Chrome | `npm run test:chrome` |
| Run Tests in Headed Mode | `npm run test:headed` |
| Run Tests in Debug Mode | `npm run test:debug` |
| Open Playwright Report | `npm run report` |
| Generate Allure Report | `npm run allure:gen` |
| Open Allure Report | `npm run allure:open` |
| Generate and Open Allure Report | `npm run allure` |
| Clean Reports | `npm run clean` |

---

# 🌍 Environments (QA1 / QA2 / Dev)

The target environment is selected with the `TEST_ENV` variable (`qa1` | `qa2` | `dev`).
URLs and credentials live in the gitignored `.env` file (see `.env.example`).

| Environment | URL |
|-------------|-----|
| qa1 | https://dev-qa1-cp.test.landnav.com/ |
| qa2 | https://dev-qa2-cp.test.landnav.com/ |
| dev | https://dev-cicd1-cp.test.landnav.com/ |

### Select the environment per run

| Shell | Command |
|-------|---------|
| PowerShell | `$env:TEST_ENV='qa1'; npx playwright test` |
| PowerShell (reset after) | `Remove-Item Env:TEST_ENV` |
| Git Bash / Linux / macOS | `TEST_ENV=qa1 npx playwright test` |
| Any (edit `.env`) | set `TEST_ENV=qa1` in `.env`, then `npm test` |

### npm shortcuts (Git Bash / Linux / macOS only — these use bash syntax)

| Purpose | Command |
|---------|---------|
| Run all tests on QA1 | `npm run test:qa1` |
| Run all tests on QA2 | `npm run test:qa2` |
| Run all tests on Dev | `npm run test:dev` |

> Note: the test output and reports label the authenticated project after the
> active environment (e.g. `[qa1]`, `[qa2]`, `[dev]`) instead of `[chrome]`.

---

# 🎯 Run Specific Tests

| Purpose | Command |
|-----------|---------|
| Run by Test ID | `npx playwright test -g "TC_LNC_Login_033"` |
| Run by File | `npx playwright test tests/login/login.spec.ts` |
| Run by Line Number | `npx playwright test tests/login/login.spec.ts:45` |

---

# 🔧 Troubleshooting

| Purpose | Command |
|-----------|---------|
| Install Dependencies | `npm install` |
| Reinstall Browsers | `npx playwright install --force` |
| Clean Reports | `npm run clean` |
| Install Dependencies Again | `npm install` |
| Reinstall Browsers Again | `npx playwright install` |

---

# 🚀 First-Time Setup

| Step | Command |
|--------|---------|
| Clone Repository | `git clone <repository-url>` |
| Navigate to Project | `cd landnav-automation` |
| Install Dependencies & Browsers | `npm run setup` |

---

# 🔄 Daily Workflow

| Task | Command |
|-------|---------|
| Execute Tests | `npm test` |
| Open Playwright Report | `npm run report` |
| Generate Allure Report | `npm run allure:gen` |
| Open Allure Report | `npm run allure:open` |

---

# 🧹 Generated Folders

| Folder |
|---------|
| allure-results |
| allure-report |
| playwright-report |
| test-results |