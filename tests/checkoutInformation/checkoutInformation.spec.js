const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutInformationPage } = require('../../pages/checkoutInformation');
const testData = require('../../data/testData.json');

async function loginAndAddToCart(page) {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(
    testData.users.standard.username,
    testData.users.standard.password
  );  
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();
  await cartPage.clickCheckout();

  return new CheckoutInformationPage(page);
}

test('Semua kolom terisi', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.postalCode
  );  
  await checkoutPage.clickContinue();
  await expect(page).toHaveURL(/.*checkout-step-two.html.*/);
});

test('Kolom Last Name & Postal Code saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(
    '', 
    testData.checkout.lastName,
    testData.checkout.postalCode);
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Kolom First Name & Postal Code saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(
    testData.checkout.firstName, 
    '', 
    testData.checkout.postalCode);
  await checkoutPage.clickContinue();
  await checkoutPage.expectErrorVisible();
});

test('Kolom First Name & Last Name saja', async ({ page }) => {
  const checkoutPage = await loginAndAddToCart(page);
  await checkoutPage.fillForm(
    testData.checkout.firstName, 
    testData.checkout.lastName, 
    '');
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
