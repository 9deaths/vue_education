import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types/product'

/** Глобальное хранилище корзины. */
export const useCartStore = defineStore('cart', () => {
  /** Массив товаров в корзине. */
  const items = ref<CartItem[]>([])

  /** Признак того, что заказ оплачен (для страницы успеха). */
  const paid = ref(false)

  /** Общее количество единиц товара в корзине. */
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))

  /** Общая сумма в корзине. */
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))

  /** Пуста ли корзина. */
  const isEmpty = computed(() => items.value.length === 0)

  /** Добавляет единицу конкретного товара в корзину. */
  function increment(product: Product) {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity++
    }
    else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  /** Убирает единицу конкретного товара из корзины. */
  function decrement(product: Product) {
    const item = items.value.find((i) => i.id === product.id)
    if (!item) {
      return
    }

    if (item.quantity > 1) {
      item.quantity--
    }
    else {
      items.value = items.value.filter((i) => i.id !== product.id)
    }
  }

  /** Устанавливает точное количество товара (0 или меньше — удаляет позицию). */
  function setQuantity(product: Product, quantity: number) {
    if (quantity <= 0) {
      remove(product)
      return
    }

    const item = items.value.find((i) => i.id === product.id)
    if (item) {
      item.quantity = quantity
    }
  }

  /** Полностью удаляет товар из корзины. */
  function remove(product: Product) {
    items.value = items.value.filter((i) => i.id !== product.id)
  }

  /** Очищает корзину. */
  function clear() {
    items.value = []
  }

  /** Возвращает количество конкретного товара в корзине. */
  function getQuantity(product: Product) {
    return items.value.find((i) => i.id === product.id)?.quantity ?? 0
  }

  /** Отмечает заказ как оплаченный перед переходом на страницу успеха. */
  function markPaid() {
    paid.value = true
  }

  /** Завершает заказ: очищает корзину, если оплата подтверждена. */
  function completeOrder(): boolean {
    if (!paid.value) {
      return false
    }

    paid.value = false
    items.value = []
    return true
  }

  return {
    items,
    count,
    total,
    isEmpty,
    increment,
    decrement,
    setQuantity,
    remove,
    clear,
    getQuantity,
    markPaid,
    completeOrder,
  }
})
