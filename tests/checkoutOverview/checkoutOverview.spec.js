const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutInformationPage } = require('../../pages/checkoutInformation');
const { CheckoutOverviewPage } = require('../../pages/checkoutOverview');
const { ProductDetailPage } = require('../../pages/productDetailPage');
const testData = require('../../data/testData.json');

async function navigateToCheckoutOverview(page) {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);

  await loginPage.goto();
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

  return new CheckoutOverviewPage(page);
}

test('Judul Produk navigasi ke halaman Detail Product', async ({ page }) => {
  const overviewPage = await navigateToCheckoutOverview(page);
  await overviewPage.clickProductTitle();

  const detailPage = new ProductDetailPage(page);
  await detailPage.expectOnDetailPage();
});

test('Tombol Cancel navigasi ke halaman Products', async ({ page }) => {
  const overviewPage = await navigateToCheckoutOverview(page);
  await overviewPage.clickCancel();
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('Finish Checkout', async ({ page }) => {
  const overviewPage = await navigateToCheckoutOverview(page);
  await overviewPage.clickFinish();
  await expect(page).toHaveURL(/.*checkout-complete.html/);
});