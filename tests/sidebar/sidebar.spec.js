const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { ProductsPage } = require('../../pages/productsPage');
const { Sidebar } = require('../../pages/sidebar');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Menu Hamburger menampilkan Sidebar', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await sidebar.openSidebar();
});

test('Tombol close menutup Sidebar', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await sidebar.openSidebar();
  await sidebar.closeSidebar();
});

test('Menu All Items navigasi ke halaman Products', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const sidebar = new Sidebar(page);

  await productsPage.addFirstProductToCart();
  await productsPage.goToCart();
  await sidebar.openSidebar();
  await sidebar.clickAllItems();
});

test('User dapat Logout', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await sidebar.openSidebar();
  await sidebar.clickLogout();
});