import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('successful login with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('locked out user should see error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});