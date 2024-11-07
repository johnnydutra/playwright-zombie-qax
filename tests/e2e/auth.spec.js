const { test } = require('../../support');

test('should login as admin', async ({ page }) => {
  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
});

test('should not login with incorrect password', async ({ page }) => {
  await page.auth.visit();
  await page.auth.submitForm('admin@zombieplus.com', 'abc123');
  
  const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
  await page.popup.hasText(message);
});

test('should not login with invalid email', async ({ page }) => {
  await page.auth.visit();
  await page.auth.submitForm('johnnytest.com', 'abc123');
  await page.auth.checkInputAlert('Email incorreto');
});

test('should not login with blank email', async ({ page }) => {
  await page.auth.visit();
  await page.auth.submitForm('', 'abc123');
  await page.auth.checkInputAlert('Campo obrigatório');
});

test('should not login with blank password', async ({ page }) => {
  await page.auth.visit();
  await page.auth.submitForm('johnny@test.com', '');
  await page.auth.checkInputAlert('Campo obrigatório');
});

test('should not login with blank form', async ({ page }) => {
  await page.auth.visit();
  await page.auth.submitForm('', '');
  await page.auth.checkInputAlert(['Campo obrigatório', 'Campo obrigatório']);
});