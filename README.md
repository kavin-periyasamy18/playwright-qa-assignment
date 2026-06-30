# Playwright QA Automation Assignment

A Playwright-based test automation framework built with TypeScript for UI and API validation. The project demonstrates a clean Page Object Model structure, reusable fixtures, helper utilities, and GitHub Actions-based CI.

## Overview

This project automates two main flows:

1. **UI automation** for the DemoQA Book Store application.
2. **API automation** for the ReqRes public API.

The framework uses a modular design with page objects, fixtures, utility helpers, and custom step decorators to improve readability and maintainability.

## Features

- Page Object Model (POM) for UI automation
- Reusable Playwright fixtures for page injection
- Custom `test.step()` decorator for structured reporting
- Shared browser action helpers for click, type, wait, and text extraction
- UI validation for login, search, book details, and logout
- API tests for create, get, and update user flows
- File output generation for captured book details
- GitHub Actions workflow for automated test execution
- Playwright HTML report generation

## Tech Stack

- **Playwright Test**
- **TypeScript**
- **Node.js**
- **GitHub Actions**
- **dotenv**

## Project Structure

```text
playwright-qa-assignment/
├── fixtures/
│   └── testFixtures.ts
├── pages/
│   ├── bookStore.page.ts
│   ├── home.page.ts
│   └── login.page.ts
├── tests/
│   ├── api/
│   │   └── api.test.ts
│   └── ui/
│       └── demo.test.ts
├── utils/
│   ├── apiHelper.ts
│   ├── aut.ts
│   ├── browserAction.ts
│   ├── constants.ts
│   ├── decoders.ts
│   └── fileUtil.ts
├── .github/workflows/playwright.yml
├── playwright.config.ts
└── package.json
```

## Test Coverage

### UI Flow
The UI test covers the DemoQA Book Store application and validates:

- Login to the application
- Search for a specific book
- Verify the book appears in the search results
- Capture book title, author, and publisher details
- Write book details to a local output file
- Log out successfully

### API Flow
The API test covers the ReqRes workflow and validates:

- Create a user
- Retrieve the user
- Update the user name

## Configuration

The framework reads environment variables through `dotenv`.

### Required environment variables

- `BASE_URL` (optional) — overrides the default Playwright base URL
- `REQRES_API_KEY` — required for the ReqRes API helper

> Note: keep secrets out of version control. Store real values in a local `.env` file.

## Default URLs and Test Data

- DemoQA application: `https://demoqa.com/`
- ReqRes API: `https://reqres.in/`
- Demo user: `AutomationDemo`
- Demo password: `Automation@101`
- Book searched in the UI test: `Learning JavaScript Design Patterns`
- API test data: `Kavin` / `Quality Assurance Engineer`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 3. Add environment variables

Create a `.env` file in the project root and add:

```env
REQRES_API_KEY=your_api_key_here
# Optional
BASE_URL=https://reqres.in
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run only UI tests

```bash
npx playwright test tests/ui
```

### Run only API tests

```bash
npx playwright test tests/api
```

### Open the HTML report

```bash
npx playwright show-report
```

## Playwright Configuration

The current Playwright configuration is set up to:

- Run tests from the `tests/` directory
- Save artifacts in `test-results/`
- Use Chromium by default
- Capture screenshots only on failure
- Capture trace on first retry
- Retain video on failure
- Use HTML reporting locally and in CI

## GitHub Actions

The project includes a workflow at `.github/workflows/playwright.yml` that:

- Installs dependencies
- Installs Playwright browsers
- Runs the full test suite
- Uploads the HTML report as a build artifact

## Output Files

The UI test writes book details to the `output/` folder in timestamped text files such as:

```text
output/book-details-<timestamp>.txt
```

## Notes

- The project currently runs Chromium only.
- `node_modules/`, test artifacts, and Playwright reports are excluded through `.gitignore`.
- The repo is best presented with a clean README, a valid `.env.example`, and no generated artifacts committed.

## Author

Prepared as a Playwright QA automation assignment.
