const { test } = require('../../support');

test('should login as admin', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('admin@zombieplus.com', 'pwd123');
  await page.movies.isLoggedIn();
});

test('should not login with incorrect password', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('admin@zombieplus.com', 'abc123');
  
  const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
  await page.toast.containsText(message);
});

test('should not login with invalid email', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('johnnytest.com', 'abc123');
  await page.login.checkInputAlert('Email incorreto');
});

test('should not login with blank email', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('', 'abc123');
  await page.login.checkInputAlert('Campo obrigatório');
});

test('should not login with blank password', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('johnny@test.com', '');
  await page.login.checkInputAlert('Campo obrigatório');
});

test('should not login with blank form', async ({ page }) => {
  await page.login.visit();
  await page.login.submitForm('', '');
  await page.login.checkInputAlert(['Campo obrigatório', 'Campo obrigatório']);
});