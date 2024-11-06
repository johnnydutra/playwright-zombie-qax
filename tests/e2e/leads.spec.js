const { test, expect } = require('../../support');
import { faker } from '@faker-js/faker';

test('should signup a lead into the wait list', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containsText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');
});

test('should not signup a lead with duplicated email', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  });
  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containsText('O endereço de e-mail fornecido já está registrado em nossa fila de espera');
});

test('should not signup lead with invalid email', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Johnny Test', 'johnnytest.com');
  await page.landing.alertHasText('Email incorreto');
});

test('should not signup with blank name', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', 'johnny@test.com');
  await page.landing.alertHasText('Campo obrigatório');
});

test('should not signup with blank email', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Johnny Test', '');
  await page.landing.alertHasText('Campo obrigatório');
});

test('should not signup with blank form', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');
  await page.landing.alertHasText(['Campo obrigatório', 'Campo obrigatório']);
});