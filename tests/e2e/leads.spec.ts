const { test, expect } = require('../../support');
import { executeSQL } from '../../support/helpers/database';
import { faker } from '@faker-js/faker';

test.beforeAll(async () => {
  await executeSQL('DELETE FROM leads');
});

test('should signup a lead into the wait list', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.popup.hasText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.');
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

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.popup.hasText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.');
});

test('should not signup lead with invalid email', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Johnny Test', 'johnnytest.com');
  await page.leads.alertHasText('Email incorreto');
});

test('should not signup with blank name', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'johnny@test.com');
  await page.leads.alertHasText('Campo obrigatório');
});

test('should not signup with blank email', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Johnny Test', '');
  await page.leads.alertHasText('Campo obrigatório');
});

test('should not signup with blank form', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');
  await page.leads.alertHasText(['Campo obrigatório', 'Campo obrigatório']);
});