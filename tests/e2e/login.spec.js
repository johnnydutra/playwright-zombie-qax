// @ts-check
import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { Toast } from '../../pages/Components'

let loginPage;
let toast;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  toast = new Toast(page);
})

test('should login as admin', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
  await loginPage.isLoggedIn();
});

test('should not login with incorrect password', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('admin@zombieplus.com', 'abc123');
  
  const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
  await toast.hasText(message);
});