const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { CartPage } = require('../../pages/cartPage');
const { ProductDetailPage } = require('../../pages/productDetailPage');
const { ProductsPage } = require('../../pages/productsPage');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
});

test('Produk dapat dihapus dari Keranjang', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.clickRemove();
  await expect(page).toHaveURL(/.*cart.html/);
});

test('Judul Produk navigasi ke halaman Detail Product', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.clickProductTitle();

  const detailPage = new ProductDetailPage(page);
  await detailPage.expectOnDetailPage();
});


test('Tombol Checkout navigasi ke halaman Checkout', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one.html.*/);
});