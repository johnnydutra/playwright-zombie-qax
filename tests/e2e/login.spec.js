// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
})

test('should login as admin', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
  await loginPage.isLoggedIn();
});

test('should not login with incorrect password', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('admin@zombieplus.com', 'abc123');
  await loginPage.isLoggedIn();
});