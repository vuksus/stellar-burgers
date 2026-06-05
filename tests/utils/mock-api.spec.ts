import { test, expect } from '@playwright/test';

test('test mock api', async ({ page }) => {
  await page.routeFromHAR('tests/hars/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/');

  await expect(page.locator('text=Краторная булка N-200i')).toBeVisible();
});
