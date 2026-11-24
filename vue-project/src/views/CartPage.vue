<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import type { CartItem } from '../types/product'

const router = useRouter()
const cartStore = useCartStore()

/** Переход к оформлению заказа. */
function checkout() {
  router.push({ name: 'checkout' })
}

/** Обрабатывает изменение количества через поле ввода. */
function onQuantityChange(item: CartItem, event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  cartStore.setQuantity(item, value)
}
</script>

<template>
  <main class="cart">
    <h1 class="cart__title">Корзина</h1>

    <div v-if="cartStore.isEmpty" class="cart__empty">
      <p>Корзина пуста</p>
      <RouterLink :to="{ name: 'home' }" class="cart__link">Перейти в каталог</RouterLink>
    </div>

    <template v-else>
      <ul class="cart__list">
        <li v-for="item in cartStore.items" :key="item.id" class="cart__item">
          <img class="cart__image" :src="item.image" :alt="item.title" />
          <div class="cart__info">
            <h3 class="cart__name">{{ item.title }}</h3>
            <p class="cart__price">{{ item.price }} ₽</p>
          </div>

          <div class="cart__counter">
            <button class="cart__counter-btn" @click="cartStore.decrement(item)">−</button>
            <input
              class="cart__qty"
              type="number"
              min="1"
              :value="item.quantity"
              @change="onQuantityChange(item, $event)"
            />
            <button class="cart__counter-btn" @click="cartStore.increment(item)">+</button>
          </div>

          <p class="cart__sum">{{ item.price * item.quantity }} ₽</p>

          <button class="cart__remove" @click="cartStore.remove(item)">Удалить</button>
        </li>
      </ul>

      <footer class="cart__footer">
        <span class="cart__total">Итого: {{ cartStore.total }} ₽</span>
        <button class="cart__checkout" @click="checkout">Оформить заказ</button>
      </footer>
    </template>
  </main>
</template>

<style scoped src="./CartPage.css"></style>
