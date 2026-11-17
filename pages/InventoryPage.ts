import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddToCartBtn: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    // Classic locators for your first tests
    this.backpackAddToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Classic methods (restored to fix your errors)
   */
  async addItemToCart() {
    await this.backpackAddToCartBtn.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }

  /**
   * New features for extended test cases
   */
  async addItemByName(name: string) {
    await this.page.locator('.inventory_item', { hasText: name }).locator('button').click();
  }

  async removeItemByName(name: string) {
    await this.page.locator('.inventory_item', { hasText: name }).locator('button').click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstItemPrice() {
    const priceText = await this.page.locator('.inventory_item_price').first().textContent();
    return parseFloat(priceText!.replace('$', ''));
  }

  async goToCart() {
    await this.cartLink.click();
  }
}