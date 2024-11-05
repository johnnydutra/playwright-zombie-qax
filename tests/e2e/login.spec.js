import { test, expect } from '@playwright/test';

test('should login as admin', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/login');
  const loginForm = page.locator('.login-form');
  await expect(loginForm).toBeVisible();
});
