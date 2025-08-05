const { expect } = require('@playwright/test');

class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.inventory_item_name');
    this.cancelButton = page.locator('#cancel');
    this.finishButton = page.locator('#finish');
  }

  async clickProductTitle() {
    await this.productTitle.first().click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async expectOnOverviewPage() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html.*/);
  }
}

module.exports = { CheckoutOverviewPage };