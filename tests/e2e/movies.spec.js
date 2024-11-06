const { test } = require('../../support');
import { executeSQL } from '../../support/database';
const data = require('../../support/fixtures/movies.json');

test('should add a new movie', async ({ page }) => {
  const movie = data.create;
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`);

  await page.login.visit();
  await page.login.submitForm('admin@zombieplus.com', 'pwd123');
  await page.movies.isLoggedIn();

  await page.movies.add(movie.title, movie.overview, movie.company, movie.release_year);
  await page.toast.containsText('Cadastro realizado com sucesso!');
});