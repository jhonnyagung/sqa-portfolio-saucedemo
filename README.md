# SQA Portfolio – E2E UI & API Test Automation

![Playwright Tests](https://github.com/<your-github-username>/sqa-portfolio-saucedemo/actions/workflows/playwright.yml/badge.svg)

Automated test suite for the [SauceDemo](https://www.saucedemo.com) e-commerce demo app and the [JSONPlaceholder](https://jsonplaceholder.typicode.com) REST API, built with **Playwright + TypeScript**.

## What this project demonstrates

| Skill | Where |
|---|---|
| Page Object Model | `pages/` |
| Custom fixtures (pre-logged-in state) | `tests/fixtures.ts` |
| Data-driven tests | `tests/ui/login.spec.ts` |
| Positive & negative test cases | all UI specs |
| Cross-device testing (desktop + mobile) | `playwright.config.ts` |
| API testing (status codes, schema, filtering, POST) | `tests/api/` |
| CI/CD with nightly runs + HTML report | `.github/workflows/playwright.yml` |
| Test documentation | `docs/` |

## Test coverage

| Area | Test cases |
|---|---|
| Login | 6 |
| Inventory & sorting | 4 |
| Cart | 3 |
| Checkout (E2E) | 3 |
| API | 5 |

Full list with steps and expected results: [`docs/test-cases.md`](docs/test-cases.md)

## Run locally

```bash
npm install
npx playwright install chromium
npm test              # all tests
npm run test:ui       # UI only
npm run test:api      # API only
npm run report        # open HTML report
```

Run smoke tests only: `npx playwright test --grep @smoke`

## Project structure

```
pages/            Page Objects (Login, Inventory, Cart, Checkout)
tests/ui/         UI end-to-end tests
tests/api/        API tests
tests/fixtures.ts Shared fixtures
test-data/        Test data
docs/             Test plan, test cases, bug reports
```

## Author

**Jonn** – QA Automation Engineer (certified)
Available for freelance testing: manual, UI automation, and API testing.
