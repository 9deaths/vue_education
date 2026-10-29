<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const store = useCartStore()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink to="/" class="header__logo-wrap">
        <span class="header__logo">Магазин</span>
        <span class="header__tooltip">Вернуться на главную</span>
      </RouterLink>

      <RouterLink to="/" class="header__catalog">
        <span class="header__catalog-title">Каталог</span>
        <span class="header__catalog-arrow" aria-hidden="true"></span>
      </RouterLink>
    </div>

    <RouterLink to="/cart" class="header__cart">
      <span class="header__icon">🛒</span>
      <span class="header__count">{{ store.count }}</span>
      <span class="header__total">{{ store.total }} ₽</span>
    </RouterLink>
  </header>
</template>

<style scoped src="./AppHeader.css"></style>
