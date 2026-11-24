import { test, expect } from '@playwright/test'

test('открывает каталог товаров', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('.header__logo')).toHaveText('Магазин')
  await expect(page.locator('.card').first()).toBeVisible()
})
