const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { ProductDetailPage } = require('../../pages/productDetailPage');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
});

test('Produk dapat ditambahkan ke dalam Keranjang', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);
});

test('Produk dapat dihapus dari Keranjang', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
  await productsPage.removeFirstProductFromCart();
  await productsPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);
});

test('Sorting berdasarkan Item termahal', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortBy('hilo');
  await productsPage.verifySorting('price', 'desc');
});

test('Sorting berdasarkan Item termurah', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortBy('lohi');
  await productsPage.verifySorting('price', 'asc');
});

test('Sorting berdasarkan alfabet A-Z', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortBy('az');
  await productsPage.verifySorting('name', 'asc');
});

test('Sorting berdasarkan alfabet Z-A', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortBy('za');
  await productsPage.verifySorting('name', 'desc');
});

test('Judul Produk navigasi ke halaman Detail Produk', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.clickFirstProductTitle();

  const detailPage = new ProductDetailPage(page);
  await detailPage.expectOnDetailPage();
});