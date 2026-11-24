<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink :to="{ name: 'home' }" class="header__logo-wrap">
        <span class="header__logo">Магазин</span>
        <span class="header__tooltip">Вернуться на главную</span>
      </RouterLink>

      <RouterLink :to="{ name: 'home' }" class="header__catalog">
        <span class="header__catalog-title">Каталог</span>
        <span class="header__catalog-arrow" aria-hidden="true"></span>
      </RouterLink>
    </div>

    <RouterLink :to="{ name: 'cart' }" class="header__cart">
      <span class="header__icon">🛒</span>
      <span class="header__count">{{ cartStore.count }}</span>
      <span class="header__total">{{ cartStore.total }} ₽</span>
    </RouterLink>
  </header>
</template>

<style scoped src="./AppHeader.css"></style>
