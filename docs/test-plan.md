# Test Plan – SauceDemo Web App & JSONPlaceholder API

## 1. Objective
Verify that the core purchase flow of SauceDemo works correctly on desktop and mobile, and that the JSONPlaceholder `/posts` endpoints behave as documented.

## 2. Scope
**In scope**
- Login (valid, invalid, locked-out, empty fields, unauthorized access)
- Product listing and sorting
- Cart add / remove / persistence
- Checkout form validation and order completion
- REST API: GET list, GET by id, filtering, POST, 404 handling

**Out of scope**
- Performance and load testing
- Security / penetration testing
- Payment gateway (the demo app has none)

## 3. Approach
| Type | Method | Tool |
|---|---|---|
| Functional UI | Automated E2E | Playwright (TypeScript) |
| API | Automated | Playwright `request` |
| Exploratory | Manual, time-boxed sessions | Browser + DevTools |
| Regression | Automated, nightly via CI | GitHub Actions |

## 4. Environments
- Desktop Chrome (1280×720)
- Mobile Chrome emulation (Pixel 7)

## 5. Entry & exit criteria
**Entry:** application reachable, test data available.
**Exit:** all smoke tests (`@smoke`) pass; no open Critical/High bugs on the purchase flow.

## 6. Defect severity
| Severity | Definition |
|---|---|
| Critical | Blocks purchase or login for all users |
| High | Major feature broken, no workaround |
| Medium | Feature broken, workaround exists |
| Low | Cosmetic / UI text issue |

## 7. Deliverables
- Automated test suite (this repository)
- HTML test report (CI artifact)
- Test case document (`test-cases.md`)
- Bug reports (`bug-reports/`)

## 8. Risks
- Demo sites are third-party and may change selectors or go offline → mitigated by Page Objects (one place to update) and CI retries.
