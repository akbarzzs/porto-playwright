const { expect } = require('@playwright/test');

class Sidebar {
  constructor(page) {
    this.page = page;
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.sidebar = page.locator('.bm-menu-wrap');
    this.closeButton = page.locator('#react-burger-cross-btn');
    this.allItems = page.locator('#inventory_sidebar_link');
    this.logout = page.locator('#logout_sidebar_link');
  }

  async openSidebar() {
    await this.hamburgerMenu.click();
    await expect(this.sidebar).toBeVisible();
  }

  async closeSidebar() {
    await this.closeButton.click();
    await expect(this.sidebar).not.toBeVisible();
  }

  async clickAllItems() {
    await this.allItems.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async clickLogout() {
    await this.logout.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }
}

module.exports = { Sidebar };