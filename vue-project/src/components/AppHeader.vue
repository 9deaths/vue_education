<script setup lang="ts">
import { count, total } from '../composables/useCart'
</script>

<template>
  <header class="header">
    <div class="header__logo">Магазин</div>
    <nav class="header__nav">
    </nav>
    <div class="header__cart">
      <span class="header__icon">🛒</span>
      <span class="header__count">{{ count }}</span>
      <span class="header__total">{{ total }} ₽</span>
    </div>
  </header>
</template>