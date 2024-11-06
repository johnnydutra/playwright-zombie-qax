import { expect } from '@playwright/test';

export class MoviesPage {
  constructor(page) {
    this.page = page;
  }

  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle');
    // await expect(this.page).toHaveURL(/.*admin/);
    const logoutLink = this.page.locator('a[href="/logout"]');
    await expect(logoutLink).toBeVisible();
  }

  async accessForm() {
    await this.page.locator('a[href$="/register"]').click();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }

  async add(title, overview, company, release_year) {
    await this.accessForm();
    await this.page.getByLabel('Titulo do filme').fill(title);
    await this.page.getByLabel('Sinopse').fill(overview);
    await this.page.locator('#select_company_id .react-select__indicator').click();
    await this.page.locator('.react-select__option').filter({ hasText: company }).click();
    await this.page.locator('#select_year .react-select__indicator').click();
    await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();
    await this.submitForm();
  }

  async alertHasText(text) {
    const alert = this.page.locator('span[class$="alert"]');
    await expect(alert).toHaveText(text);
  }
}