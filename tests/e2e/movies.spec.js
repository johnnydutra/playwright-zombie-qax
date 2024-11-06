import { test } from '@playwright/test';
import { executeSQL } from '../../support/database';

import { LoginPage } from '../../pages/LoginPage';
import { MoviesPage } from '../../pages/MoviesPage';
import { Toast } from '../../pages/Components';

const data = require('../../support/fixtures/movies.json');

let loginPage;
let moviesPage;
let toast;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
});

test('should add a new movie', async ({ page }) => {
  const movie = data.create;

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`);

  await loginPage.visit();
  await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();

  await moviesPage.add(movie.title, movie.overview, movie.company, movie.release_year);
  await toast.containsText('Cadastro realizado com sucesso!');
});