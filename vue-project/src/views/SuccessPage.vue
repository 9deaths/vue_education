<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const store = useCartStore()

/** Завершает заказ и очищает корзину. */
onMounted(() => {
  if (!store.completeOrder()) {
    router.replace('/')
  }
})
</script>

<template>
  <main class="success">
    <h1 class="success__title">Заказ успешно оплачен</h1>
    <p class="success__text">Спасибо за покупку!</p>
    <RouterLink to="/" class="success__link">Вернуться в каталог</RouterLink>
  </main>
</template>

<style scoped src="./SuccessPage.css"></style>
