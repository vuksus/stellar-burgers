import { test, expect } from '@playwright/test';

test('test add constructor', async ({ page }) => {
  await page.goto('/');

  const ingredientBun = page.locator('li:has-text("Краторная булка N-200i")');
  const ingredientMain = page.locator('li:has-text("Биокотлета из марсианской Магнолии")');
  const ingredientSouce = page.locator('li:has-text("Соус Spicy-X")');

  await expect(ingredientBun).toBeVisible();
  await expect(ingredientMain).toBeVisible();
  await expect(ingredientSouce).toBeVisible();

  const addButtonBun = ingredientBun.locator('text=Добавить');

  await addButtonBun.click();

  await expect(page.locator('.constructor-element.constructor-element_pos_top')).toContainText('Краторная булка N-200i');
  await expect(page.locator('.constructor-element.constructor-element_pos_bottom')).toContainText('Краторная булка N-200i');

  const addButtonMain = ingredientMain.locator('text=Добавить');

  await addButtonMain.click();

  await expect(page.locator('.constructor-element').nth(1)).toContainText('Биокотлета из марсианской Магнолии');
  
  const addButtonSouce = ingredientSouce.locator('text=Добавить');

  await addButtonSouce.click();

  await expect(page.locator('.constructor-element').nth(2)).toContainText('Соус Spicy-X');
});
