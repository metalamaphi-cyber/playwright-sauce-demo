import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('should add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce'); // Assuming your login method
  
  await inventoryPage.addItemToCart();
  
  const count = await inventoryPage.getCartCount();
  expect(count).toBe('1');
});