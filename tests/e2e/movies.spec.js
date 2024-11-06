const { expect, test } = require('../../support');
import { executeSQL } from '../../support/helpers/database';
const data = require('../../support/fixtures/movies.json');

test.beforeAll( () => {
  executeSQL('DELETE FROM movies');
});

test('should add a new movie', async ({ page }) => {
  const movie = data.create;

  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.add(movie);
  await page.toast.containsText('Cadastro realizado com sucesso!');
});

test('should not add new movie with unfilled mandatory fields', async ({ page }) => {
  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.accessForm();
  await page.movies.submitForm();

  await page.movies.alertHasText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ]);
});

test('should not add a new movie with duplicated title', async ({ page, request }) => {
  const movie = data.duplicate;




  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.add(movie);
  await page.toast.containsText('Cadastro realizado com sucesso!');
});