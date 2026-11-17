import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Sauce Demo Full Suite', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
  });

  // --- LOGIN TESTS ---
  test('Successful login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  // --- THE 6 EXTENDED TEST CASES ---
  test('1. Product Sorting: Price (low to high)', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.sortBy('lohi');
    const firstPrice = await inventoryPage.getFirstItemPrice();
    expect(firstPrice).toBe(7.99);
  });

  test('2. Multi-Item Checkout Total', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    const subtotal = await page.locator('.summary_subtotal_label').textContent();
    expect(subtotal).toContain('39.98');
  });

  test('3. Inventory Item Persistence', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart(); // Using your original method
    await inventoryPage.goToCart();
    await inventoryPage.page.locator('[data-test="continue-shopping"]').click();
    await inventoryPage.goToCart();
    await expect(inventoryPage.page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('4. Negative Checkout: Missing Postal Code', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.lastNameInput.fill('Doe');
    await checkoutPage.continueBtn.click();
    await expect(inventoryPage.page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('5. Remove Item from Inventory', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart();
    expect(await inventoryPage.getCartCount()).toBe('1'); // Using your original method
    await inventoryPage.removeItemByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('6. Problem User: Broken Images', async ({ page }) => {
    await loginPage.login('problem_user', 'secret_sauce');
    const imageSource = await page.locator('.inventory_item_img img').first().getAttribute('src');
    expect(imageSource).toContain('sl-404');
  });
});