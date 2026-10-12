import { ref, computed } from 'vue'

/** Массив товаров в корзине. */
const items = ref<{ id: number; title: string; price: number; quantity: number }[]>([])

/** Количество товаров в корзине. */
export const count = computed(() =>
  items.value.reduce((s, i) => s + i.quantity, 0)
)

/** Общая сумма в корзине.*/
export const total = computed(() =>
  items.value.reduce((s, i) => s + i.price * i.quantity, 0)
)

/** Добавляет единицу конкретного товар в корзину. */
export function increment(product: { id: number; title: string; price: number }) {
  const existing = items.value.find((i) => i.id === product.id)
  if (existing) {
    existing.quantity++
  }
  else {
    items.value.push({ ...product, quantity: 1 })
  }
}

/** Убирает единицу конкретного товара в корзине. */
export function decrement(id: number) {
  const item = items.value.find((i) => i.id === id)
  if (!item) {
    return
  }

  if (item.quantity > 1) {
    item.quantity--
  }
  else {
    items.value = items.value.filter((i) => i.id !== id)
  }
}

/** Возвращает количество конкретного товара в корзине. */
export function getQuantity(id: number) {
  return items.value.find((i) => i.id === id)?.quantity ?? 0
}