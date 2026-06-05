import { test, expect } from '@playwright/test';

test('test mock api', async ({ page }) => {
  await page.route('**/api/ingredients', async route => {

    await route.fulfill({
      status: 200,
      body: JSON.stringify(require('../mock-data/ingredients.json')),
    });
  });

  await page.goto('/');

  await expect(page.locator('text=test_bun')).toBeVisible();
});
