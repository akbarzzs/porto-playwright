const { expect } = require('@playwright/test');

class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }

  async expectOnCompletePage() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html.*/);
  }
}

module.exports = { CheckoutCompletePage };