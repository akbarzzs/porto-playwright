const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('button', { hasText: 'Add to cart' });
    this.removeButtons = page.locator('button', { hasText: 'Remove' });
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('select.product_sort_container');
    this.productTitles = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeFirstProductFromCart() {
    await this.removeButtons.first().click();
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  async sortBy(option) {
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption(option);
  }

  async clickFirstProductTitle() {
    await this.productTitles.first().click();
  }

  async verifySorting(by = 'price', direction = 'asc') {
    const prices = await this.page.$$eval('.inventory_item_price', nodes =>
      nodes.map(n => parseFloat(n.textContent.replace('$', '')))
    );
    const names = await this.page.$$eval('.inventory_item_name', nodes =>
      nodes.map(n => n.textContent)
    );

    if (by === 'price') {
      const expected = [...prices].sort((a, b) => direction === 'asc' ? a - b : b - a);
      expect(prices).toEqual(expected);
    } else if (by === 'name') {
      const expected = [...names].sort();
      if (direction === 'desc') expected.reverse();
      expect(names).toEqual(expected);
    }
  }

  getProductList() {
    return this.productTitles;
  }
}

module.exports = { ProductsPage };