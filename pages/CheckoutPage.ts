import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async startCheckout() {
    await this.checkoutBtn.click();
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
    await this.continueBtn.click();
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }
}