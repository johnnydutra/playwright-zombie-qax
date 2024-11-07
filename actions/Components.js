import { expect } from '@playwright/test';

export class Popup {
  constructor(page) {
    this.page = page;
  }

  async hasText(text) {
    const popupTextElement = this.page.locator('.swal2-html-container');
    await expect(popupTextElement).toContainText(text);
  }
}