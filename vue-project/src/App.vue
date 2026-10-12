<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import ProductCard from './components/ProductCard.vue'

/** Массив товаров в катологе. */
const products = [
  { id: 1, title: 'Смартфон', price: 99990, image: '/img/Смартфон.jpg' },
  { id: 2, title: 'Наушники', price: 12990, image: '/img/Наушники.jpg' },
  { id: 3, title: 'Ноутбук', price: 120550, image: '/img/Ноутбук.jpg' },
]
</script>

<template>
  <AppHeader />
  <div class="products">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>