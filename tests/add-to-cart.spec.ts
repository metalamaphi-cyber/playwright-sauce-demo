import { test, expect } from '@playwright/test';

test.describe('Add to Cart', () => {

  test.beforeEach(async ({ page }) => {
    // Always login first
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Confirm we are on inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should add Sauce Labs Backpack to cart', async ({ page }) => {
    // Click Add to Cart button
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Button should change to "Remove"
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Cart badge should show 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should add multiple items to cart', async ({ page }) => {
    // Add Backpack
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Add Bike Light
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Add Bolt T-Shirt
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  });

});