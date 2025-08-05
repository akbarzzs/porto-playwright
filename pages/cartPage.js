class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('#shopping_cart_container');
    this.removeButton = page.locator('.cart_button');
    this.productTitle = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('#checkout');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async clickRemove() {
    await this.removeButton.first().click();
  }

  async clickProductTitle() {
    await this.productTitle.first().click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  getFirstCartItem() {
    return this.page.locator('.cart_item').first();
  }

  getCartList() {
    return this.page.locator('.cart_item');
  }
}

module.exports = { CartPage };