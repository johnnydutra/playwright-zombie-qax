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

test('should not login with invalid email', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('johnnytest.com', 'abc123');
  await loginPage.checkInputAlert('Email incorreto');
});

test('should not login with blank email', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('', 'abc123');
  await loginPage.checkInputAlert('Campo obrigatório');
});

test('should not login with blank password', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('johnny@test.com', '');
  await loginPage.checkInputAlert('Campo obrigatório');
});

test('should not login with blank form', async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitForm('', '');
  await loginPage.checkInputAlert(['Campo obrigatório', 'Campo obrigatório']);
});