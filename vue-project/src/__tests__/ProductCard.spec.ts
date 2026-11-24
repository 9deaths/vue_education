import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import type { Pinia } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'
import type { CatalogProduct } from '../types/product'

const product: CatalogProduct = {
  id: 1,
  title: 'Смартфон Galaxy X',
  price: 49990,
  image: '/img/Galaxy.jpg',
  category: 'Смартфоны',
  brand: 'Samsung',
  rating: 4.5,
  inStock: true,
}

let pinia: Pinia
let cartStore: ReturnType<typeof useCartStore>

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
  cartStore = useCartStore()
})

/** Монтирует карточку товара с общим стором. */
function mountCard() {
  return mount(ProductCard, {
    props: { product },
    global: { plugins: [pinia] },
  })
}

describe('ProductCard', () => {
  it('показывает товар и кнопку «Купить», если товар не в корзине', () => {
    const wrapper = mountCard()

    expect(wrapper.text()).toContain(product.title)
    expect(wrapper.text()).toContain('49990')
    expect(wrapper.find('.card__button').exists()).toBe(true)
    expect(wrapper.find('.card__counter').exists()).toBe(false)
    expect(cartStore.getQuantity(product)).toBe(0)
  })

  it('показывает количество, уже лежащее в корзине', () => {
    cartStore.increment(product)
    cartStore.increment(product)
    cartStore.increment(product)

    const wrapper = mountCard()

    expect(wrapper.get('.card__counter-value').text()).toBe('3')
    expect(wrapper.find('.card__button').exists()).toBe(false)
  })

  it('добавляет товар по кнопке «Купить»', async () => {
    const wrapper = mountCard()

    await wrapper.get('.card__button').trigger('click')

    expect(cartStore.getQuantity(product)).toBe(1)
    expect(wrapper.get('.card__counter-value').text()).toBe('1')
  })

  it('увеличивает и уменьшает количество кнопками + / −', async () => {
    const wrapper = mountCard()
    await wrapper.get('.card__button').trigger('click')

    const plus = wrapper.get('.card__counter-btn:last-of-type')
    const minus = wrapper.get('.card__counter-btn')

    await plus.trigger('click')
    expect(cartStore.getQuantity(product)).toBe(2)
    expect(wrapper.get('.card__counter-value').text()).toBe('2')

    await minus.trigger('click')
    expect(cartStore.getQuantity(product)).toBe(1)

    await minus.trigger('click')
    expect(cartStore.getQuantity(product)).toBe(0)
    expect(wrapper.find('.card__counter').exists()).toBe(false)
    expect(wrapper.find('.card__button').exists()).toBe(true)
  })

  it('показывает «Нет в наличии» для отсутствующего товара', () => {
    const wrapper = mount(ProductCard, {
      props: { product: { ...product, inStock: false } },
      global: { plugins: [pinia] },
    })

    expect(wrapper.text()).toContain('Нет в наличии')
    expect(wrapper.find('.card__button').exists()).toBe(false)
    expect(wrapper.find('.card__counter').exists()).toBe(false)
  })
})
