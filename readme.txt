# LandNav Automation Framework

Playwright + TypeScript Automation Framework for LandNav applications.

---

# Prerequisites

Install the following:

- Node.js (LTS recommended)
- npm
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone <repository-url>
cd landnav-automation
```

---

# Initial Setup

Installs all project dependencies and Playwright browsers.

```bash
npm run setup
```

Equivalent to:

```bash
npm install
npx playwright install
```

---

# Install Playwright Browsers

```bash
npm run install:browsers
```

Equivalent to:

```bash
npx playwright install
```

---

# Run Tests

Run all tests:

```bash
npm test
```

This automatically:

1. Cleans previous reports
2. Cleans previous test results
3. Executes all tests

---

# Run Tests in Chrome

```bash
npm run test:chrome
```

---

# Run Tests in Headed Mode

```bash
npm run test:headed
```

---

# Run Tests in Debug Mode

```bash
npm run test:debug
```

---

# Run a Specific Test

Using test title:

```bash
npx playwright test -g "TC_LNC_Login_033"
```

Using file:

```bash
npx playwright test tests/login/login.spec.ts
```

Using line number:

```bash
npx playwright test tests/login/login.spec.ts:45
```

---

# View Playwright Report

```bash
npm run report
```

Equivalent to:

```bash
npx playwright show-report
```

---

# Allure Reporting

## Generate Allure Report

```bash
npm run allure:gen
```

Equivalent to:

```bash
allure generate allure-results --clean -o allure-report
```

---

## Open Existing Allure Report

```bash
npm run allure:open
```

Equivalent to:

```bash
allure open allure-report
```

---

## Generate and Open Allure Report

```bash
npm run allure
```

Equivalent to:

```bash
allure serve allure-results
```

---

# Clean Reports and Results

Deletes:

- allure-results
- allure-report
- playwright-report
- test-results

```bash
npm run clean
```

---

# Folder Structure

```text
project-root/
│
├── tests/
├── pages/
├── fixtures/
├── utils/
├── data/
│
├── allure-results/
├── allure-report/
├── playwright-report/
├── test-results/
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Typical Workflow

## First Time Setup

```bash
git clone <repository-url>

cd landnav-automation

npm run setup
```

---

## Daily Execution

Run tests:

```bash
npm test
```

View Playwright report:

```bash
npm run report
```

Generate Allure report:

```bash
npm run allure:gen
```

Open Allure report:

```bash
npm run allure:open
```

---

# Troubleshooting

## Install Missing Dependencies

```bash
npm install
```

## Reinstall Browsers

```bash
npx playwright install --force
```

## Clear Everything and Start Fresh

```bash
npm run clean

npm install

npx playwright install
```

---

# Framework Features

- Playwright + TypeScript
- Page Object Model (POM)
- Reusable BasePage
- Custom Fixtures
- Environment Configuration
- Allure Reporting
- Playwright HTML Reporting
- Screenshot Capture
- Video Recording
- Trace Collection
- Parallel Execution Support