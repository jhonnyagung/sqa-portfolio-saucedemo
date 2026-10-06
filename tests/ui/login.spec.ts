import { test, expect } from '../fixtures';
import { USERS, PASSWORD } from '../../test-data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-LOGIN-01: standard user can log in @smoke', async ({ page, loginPage }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-LOGIN-02: locked-out user sees an error', async ({ page, loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await expect(loginPage.error).toContainText('locked out');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('TC-LOGIN-03: wrong password is rejected', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'wrong_password');
    await expect(loginPage.error).toContainText('do not match');
  });

  const emptyFieldCases = [
    { id: 'TC-LOGIN-04', user: '', pass: PASSWORD, message: 'Username is required' },
    { id: 'TC-LOGIN-05', user: USERS.standard, pass: '', message: 'Password is required' },
  ];

  for (const c of emptyFieldCases) {
    test(`${c.id}: shows "${c.message}"`, async ({ loginPage }) => {
      await loginPage.login(c.user, c.pass);
      await expect(loginPage.error).toContainText(c.message);
    });
  }

  test('TC-LOGIN-06: protected page redirects when not logged in', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
