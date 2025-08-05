const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');

test('Login berhasil', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoginSuccess();
});

test('Salah username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standarduser', 'secret_sauce');
  await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

test('Salah password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secretsauce');
  await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

test('Tanpa username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(null, 'secret_sauce');
  await loginPage.expectErrorMessage('Epic sadface: Username is required');
});

test('Tanpa password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', null);
  await loginPage.expectErrorMessage('Epic sadface: Password is required');
});

test('Tanpa username & password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(null, null);
  await loginPage.expectErrorMessage('Epic sadface: Username is required');
});