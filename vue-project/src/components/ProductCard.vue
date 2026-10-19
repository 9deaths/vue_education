<script setup lang="ts">
import { computed } from 'vue'
import { increment, decrement, getQuantity } from '../composables/useCart'

/** Параметры компонента товара.*/
const props = defineProps(['product'])

/** Количество конкретного товара в корзине на данный момент.*/
const quantity = computed(() => getQuantity(props.product.id))
</script>

<template>
  <div class="card">
    <img class="card__image" :src="product.image" :alt="product.title" />
    <div class="card__body">
      <h3 class="card__title">{{ product.title }}</h3>
      <p class="card__meta">{{ product.brand }} · {{ product.category }}</p>
      <p class="card__price">{{ product.price }} ₽</p>
      <p class="card__rating">★ {{ product.rating }}</p>

      <div v-if="!product.inStock" class="card__out">
        Нет в наличии
      </div>

      <div v-else-if="quantity === 0" class="card__actions">
        <button class="card__button" @click="increment(product)">Купить</button>
      </div>

      <div v-else class="card__counter">
        <button class="card__counter-btn" @click="decrement(product.id)">−</button>
        <span class="card__counter-value">{{ quantity }}</span>
        <button class="card__counter-btn" @click="increment(product)">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/styles/card.css"></style>