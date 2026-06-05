import { test, expect } from '@playwright/test';

test('test modal', async ({ page }) => {
    await page.goto('/');

    const ingredient = page.locator('li:has-text("Краторная булка N-200i")');
    const modal = page.locator('#modals');

    await expect(ingredient).toBeVisible();

    await ingredient.click();

    await expect(modal).toContainText('Краторная булка N-200i');

    const closeButton = modal.locator('button');

    await closeButton.click();

    await expect(modal).not.toContainText('Краторная булка N-200i');

    await ingredient.click();

    const header = page.locator('header');
    const textClick = header.locator('p:has-text("Конструктор")')

    await expect(modal).toContainText('Краторная булка N-200i');

    await textClick.click({force: true});

    await expect(modal).not.toContainText('Краторная булка N-200i');
})
