const { expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeFromCartButton = page.locator('[data-test^="remove"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async expectOnDetailPage() {
    await expect(this.page).toHaveURL(/.*inventory-item.html.*/);
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeFromCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  async goBackToProducts() {
    await this.backToProductsButton.click();
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }
}

module.exports = { ProductDetailPage };