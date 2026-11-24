import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../stores/cart'

const product = { id: 1, title: 'Тестовый товар', price: 100, image: '/img/test.jpg' }
const secondProduct = { id: 2, title: 'Второй товар', price: 250, image: '/img/test2.jpg' }

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('increment', () => {
    it('добавляет товар в корзину', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)

      expect(cartStore.items).toHaveLength(1)
      expect(cartStore.getQuantity(product)).toBe(1)
    })

    it('увеличивает количество уже добавленного товара', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.increment(product)

      expect(cartStore.items).toHaveLength(1)
      expect(cartStore.getQuantity(product)).toBe(2)
    })
  })

  describe('decrement', () => {
    it('уменьшает количество на единицу', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.increment(product)
      cartStore.decrement(product)

      expect(cartStore.getQuantity(product)).toBe(1)
    })

    it('удаляет позицию при количестве 1', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.decrement(product)

      expect(cartStore.isEmpty).toBe(true)
      expect(cartStore.total).toBe(0)
    })
  })

  describe('setQuantity', () => {
    it('задаёт точное количество', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.setQuantity(product, 5)

      expect(cartStore.getQuantity(product)).toBe(5)
      expect(cartStore.total).toBe(500)
    })

    it('удаляет позицию при нуле', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.setQuantity(product, 0)

      expect(cartStore.isEmpty).toBe(true)
    })
  })

  describe('remove', () => {
    it('удаляет товар из корзины', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.remove(product)

      expect(cartStore.isEmpty).toBe(true)
    })

    it('оставляет остальные товары', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.increment(secondProduct)
      cartStore.remove(product)

      expect(cartStore.items).toHaveLength(1)
      expect(cartStore.getQuantity(product)).toBe(0)
      expect(cartStore.getQuantity(secondProduct)).toBe(1)
    })
  })

  describe('clear', () => {
    it('очищает корзину', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.clear()

      expect(cartStore.items).toHaveLength(0)
    })
  })

  describe('completeOrder', () => {
    it('не очищает корзину, если заказ не оплачен', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)

      expect(cartStore.completeOrder()).toBe(false)
      expect(cartStore.count).toBe(1)
    })

    it('очищает корзину после оплаты', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.markPaid()

      expect(cartStore.completeOrder()).toBe(true)
      expect(cartStore.isEmpty).toBe(true)
    })
  })

  describe('count и total', () => {
    it('считает количество и сумму по одному товару', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.increment(product)

      expect(cartStore.count).toBe(2)
      expect(cartStore.total).toBe(200)
    })

    it('считает итог по нескольким товарам', () => {
      const cartStore = useCartStore()
      cartStore.increment(product)
      cartStore.increment(product)
      cartStore.increment(secondProduct)
      cartStore.setQuantity(secondProduct, 3)

      expect(cartStore.count).toBe(5)
      expect(cartStore.total).toBe(200 + 250 * 3)
    })
  })
})
