const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutInformationPage } = require('../../pages/checkoutInformation');
const { CheckoutOverviewPage } = require('../../pages/checkoutOverview');
const { CheckoutCompletePage } = require('../../pages/checkoutComplete');
const testData = require('../../data/testData.json');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(
    testData.users.standard.username,
    testData.users.standard.password
  );  
  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();
  await cartPage.clickCheckout();
  await checkoutInformationPage.fillForm(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.postalCode
  );  
  await checkoutInformationPage.clickContinue();
  await checkoutOverviewPage.clickFinish();
});

test('Ikon Cart navigasi ke halaman Cart', async ({ page }) => {
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.expectOnCompletePage();
  await checkoutCompletePage.clickCartIcon();
  await expect(page).toHaveURL(/.*cart.html.*/);
});

test('Tombol Back Home navigasi ke halaman Products', async ({ page }) => {
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.expectOnCompletePage();
  await checkoutCompletePage.clickBackHome();
  await expect(page).toHaveURL(/.*inventory.html.*/);
});