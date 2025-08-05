const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const testData = require('../../data/testData.json');

test('Login berhasil', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.standard.username,
    testData.users.standard.password
  ); 
  await loginPage.expectLoginSuccess();
});

test('Salah username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.invalid_standard.username,
    testData.users.standard.password);
  await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

test('Salah password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.standard.username,
    testData.users.invalid_standard.password);
  await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

test('Tanpa username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    '',
    testData.users.standard.password);
  await loginPage.expectErrorMessage('Epic sadface: Username is required');
});

test('Tanpa password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.standard.username,
    '');
  await loginPage.expectErrorMessage('Epic sadface: Password is required');
});

test('Tanpa username & password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    '',
    '');
  await loginPage.expectErrorMessage('Epic sadface: Username is required');
});