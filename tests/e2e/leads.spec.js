// @ts-check
import { test } from '@playwright/test';

import { LandingPage } from '../../pages/LandingPage';
import { Toast } from '../../pages/Components';

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test('should signup a lead into the wait list', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Johnny Test', 'johnny@test.com');
  await toast.hasText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');
});

test('should not signup lead with invalid email', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Johnny Test', 'johnnytest.com');
  await landingPage.alertHasText('Email incorreto');
});

test('should not signup with blank name', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'johnny@test.com');
  await landingPage.alertHasText('Campo obrigatório');
});

test('should not signup with blank email', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Johnny Test', '');
  await landingPage.alertHasText('Campo obrigatório');
});

test('should not signup with blank form', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHasText(['Campo obrigatório', 'Campo obrigatório']);
});