import { test, expect } from '@playwright/test'

/** Возвращает будущий срок действия карты в формате MM/ГГ. */
function futureExpiry(years = 3): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() + years)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear() % 100).padStart(2, '0')
  return `${month}/${year}`
}

test('успешное оформление заказа с оплатой банковской картой', async ({ page }) => {
  await page.goto('/')

  const cards = page.locator('.card')
  await expect(cards.first()).toBeVisible()

  /** Складываем в корзину два товара. */
  await cards.nth(0).getByRole('button', { name: 'Купить' }).click()
  await cards.nth(1).getByRole('button', { name: 'Купить' }).click()
  await expect(page.locator('.header__count')).toHaveText('2')

  /** Переходим в корзину. */
  await page.locator('.header__cart').click()
  await expect(page).toHaveURL(/\/cart$/)

  const items = page.locator('.cart__item')
  await expect(items).toHaveCount(2)

  /** Удаляем первый товар полностью. */
  await items.nth(0).locator('.cart__remove').click()
  await expect(items).toHaveCount(1)

  /** Увеличиваем количество оставшегося товара. */
  const remaining = items.first()
  await remaining.locator('.cart__counter-btn').last().click()
  await expect(remaining.locator('.cart__qty')).toHaveValue('2')

  /** Переходим на страницу оплаты. */
  await page.locator('.cart__checkout').click()
  await expect(page).toHaveURL(/\/checkout$/)

  /** Вводим корректные реквизиты карты. */
  await page.getByPlaceholder('0000 0000 0000 0000').fill('4111111111111111')
  await page.getByPlaceholder('MM/ГГ').fill(futureExpiry())
  await page.getByPlaceholder('123').fill('123')
  await page.getByPlaceholder('IVAN IVANOV').fill('IVAN IVANOV')
  await page.locator('.card-form__submit').click()

  /** Проверяем страницу успешной оплаты. */
  await expect(page).toHaveURL(/\/success$/)
  await expect(page.locator('.success__title')).toContainText('оплачен')

  /** Возвращаемся в каталог — корзина пуста. */
  await page.locator('.success__link').click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('.header__count')).toHaveText('0')
  await expect(cards.first().locator('.card__button')).toBeVisible()
})
