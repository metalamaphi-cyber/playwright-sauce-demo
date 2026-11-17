import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('End-to-end: Login, Add to Cart, and Checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  await inventoryPage.addItemToCart();
  await inventoryPage.goToCart();

  await checkoutPage.startCheckout();
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});