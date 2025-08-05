const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { ProductDetailPage } = require('../../pages/productDetailPage');
const { CartPage } = require('../../pages/cartPage');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.clickFirstProductTitle();
});

test('Produk dapat ditambahkan ke dalam keranjang', async ({ page }) => {
  const detailProductPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);

  await detailProductPage.addToCart();
  await detailProductPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(cartPage.getFirstCartItem()).toBeVisible();
});

test('Produk dapat dihapus dari keranjang', async ({ page }) => {
  const detailProductPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);

  await detailProductPage.addToCart();
  await detailProductPage.removeFromCart();
  await detailProductPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(cartPage.getCartList()).toHaveCount(0);
});

test('Tombol Back to Products navigasi ke halaman Products', async ({ page }) => {
  const detailProductPage = new ProductDetailPage(page);
  const productsPage = new ProductsPage(page);

  await detailProductPage.goBackToProducts();
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(productsPage.getProductList().first()).toBeVisible();
});
