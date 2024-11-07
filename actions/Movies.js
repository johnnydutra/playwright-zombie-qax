import { expect } from '@playwright/test';

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async accessForm() {
    await this.page.locator('a[href$="/register"]').click();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }

  async add(movie) {
    await this.accessForm();
    await this.page.getByLabel('Titulo do filme').fill(movie.title);
    await this.page.getByLabel('Sinopse').fill(movie.overview);
    await this.page.locator('#select_company_id .react-select__indicator').click();
    await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click();
    await this.page.locator('#select_year .react-select__indicator').click();
    await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click();
    await this.page.locator('input[name="cover"]').setInputFiles('./support/fixtures' + movie.cover);
    if (movie.featured) await this.page.locator('.featured .react-switch').click();
    await this.submitForm();
  }

  async alertHasText(text) {
    const alert = this.page.locator('span[class$="alert"]');
    await expect(alert).toHaveText(text);
  }

  async remove(movie) {
    await this.page.getByRole('row', { name: movie.title }).getByRole('button').click();
    await this.page.click('.confirm-removal');
  }

  async search(term) {
    await this.page.getByPlaceholder('Busque pelo nome').fill(term);
    await this.page.locator('.actions button').click();
  }
}