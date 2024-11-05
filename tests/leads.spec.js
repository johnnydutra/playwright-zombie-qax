// @ts-check
import { test, expect } from '@playwright/test';

test('should signup a lead into the wait list', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('#name').fill('Johnny Test');
  await page.getByPlaceholder('Informe seu email').fill('johnny@test.com');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  const toastText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await expect(
    page.locator('.toast')
  ).toContainText(toastText);

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 });
});

test('should not signup lead with invalid email', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('#name').fill('Johnny Test');
  await page.getByPlaceholder('Informe seu email').fill('johnnytest.com');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto');
});

test('should not signup with blank name', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Informe seu email').fill('johnny@test.com');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('should not signup with blank email', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('#name').fill('Johnny Test');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('should not signup with blank form', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório']);
});