const { expect, test } = require('../../support');
import { executeSQL } from '../../support/helpers/database';
const data = require('../../support/fixtures/movies.json');

test.beforeAll(() => {
  executeSQL('DELETE FROM movies');
});

test('should add a new movie', async ({ page }) => {
  const movie = data.create;

  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.add(movie);
  await page.popup.hasText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
});

test('should not add new movie with unfilled mandatory fields', async ({ page }) => {
  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.accessForm();
  await page.movies.submitForm();

  await page.movies.alertHasText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

test('should not add a new movie with duplicated title', async ({ page, request }) => {
  const movie = data.duplicate;

  await request.api.postMovie(movie);

  await page.auth.login('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.movies.add(movie);
  await page.popup.hasText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});