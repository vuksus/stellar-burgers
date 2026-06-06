import { test, expect } from '@playwright/test';

test('test create order', async ({ page }) => {
  await page.routeFromHAR('tests/hars/user.har', {
    url: '**/api/auth/login', 
    update: false
  });

  await page.routeFromHAR('tests/hars/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/login');

  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password');

  await page.click('button:has-text("Войти")');

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(20000);

  const ingredientBun = page.locator('li:has-text("Краторная булка N-200i")');
  await ingredientBun.waitFor({ state: 'visible', timeout: 15000 });
  const ingredientMain = page.locator('li:has-text("Биокотлета из марсианской Магнолии")');
  await ingredientMain.waitFor({ state: 'visible', timeout: 15000 });
  const ingredientSouce = page.locator('li:has-text("Соус Spicy-X")');
  await ingredientSouce.waitFor({ state: 'visible', timeout: 15000 });

  const addButtonBun = ingredientBun.locator('text=Добавить');
  const addButtonMain = ingredientMain.locator('text=Добавить');
  const addButtonSouce = ingredientSouce.locator('text=Добавить');

  await addButtonBun.click();
  await addButtonMain.click();
  await addButtonSouce.click();

  const placeOrder = page.locator('button:has-text("Оформить заказ")');

  await placeOrder.click();

  const modal = page.locator('#modals');

  const orderNumber = modal.locator('h2');

  await expect(orderNumber).toContainText(/\d{4}/)

  const buttonClose = modal.locator('button');

  await buttonClose.click();

  await expect(orderNumber).not.toBeVisible();

  const main = page.locator('main');
  const constructor = main.locator('section').nth(1);

  await expect(constructor.getByText('Выберите булки').nth(0)).toBeVisible();
  await expect(constructor.getByText('Выберите начинку')).toBeVisible();
  await expect(constructor.getByText('Выберите булки').nth(1)).toBeVisible();
})
