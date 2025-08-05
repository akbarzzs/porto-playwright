const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutInformationPage } = require('../../pages/checkoutInformation');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'akbar';
const LAST_NAME = 'tampan';
const POSTAL_CODE = '12345';

async function loginAndAddToCart(page) {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();
  await cartPage.clickCheckout();

  return new CheckoutInformationPage(page);
}

test('Semua kolom terisi', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(FIRST_NAME, LAST_NAME, POSTAL_CODE);
  await checkoutPage.clickContinue();
  await expect(page).toHaveURL(/.*checkout-step-two.html.*/);
});

test('Kolom Last Name & Postal Code saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm('', LAST_NAME, POSTAL_CODE);
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Kolom First Name & Postal Code saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(FIRST_NAME, '', POSTAL_CODE);
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Kolom First Name & Last Name saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(FIRST_NAME, LAST_NAME, '');
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Tidak ada kolom yang diisi', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Tombol Cancel navigasi ke halaman Cart', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.clickCancel();
  await expect(page).toHaveURL(/.*cart.html/);
});
