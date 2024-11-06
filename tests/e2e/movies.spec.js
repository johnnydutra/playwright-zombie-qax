const { test } = require('../../support');
import { executeSQL } from '../../support/helpers/database';
const data = require('../../support/fixtures/movies.json');

test('should add a new movie', async ({ page }) => {
  const movie = data.create;
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`);

  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.add(movie.title, movie.overview, movie.company, movie.release_year);
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