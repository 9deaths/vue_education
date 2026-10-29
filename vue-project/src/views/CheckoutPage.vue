<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CardPaymentForm from '../components/CardPaymentForm.vue'
import { useCartStore } from '../stores/cart'
import { PaymentMethod } from '../types/payment'

const router = useRouter()
const store = useCartStore()

/** Активный способ оплаты. */
const method = ref<PaymentMethod>(PaymentMethod.Card)

/** Возвращает в корзину и оплаты. */
onMounted(() => {
  if (store.isEmpty) {
    router.replace('/cart')
  }
})

/** Отмечает оплату и переходит на страницу успеха. */
function goToSuccess() {
  store.markPaid()
  router.push('/success')
}
</script>

<template>
  <main class="checkout">
    <h1 class="checkout__title">Оплата</h1>

    <div class="checkout__methods">
      <button
        class="checkout__tab"
        :class="{ 'checkout__tab--active': method === PaymentMethod.Card }"
        type="button"
        @click="method = PaymentMethod.Card"
      >
        Банковская карта
      </button>
      <button
        class="checkout__tab"
        :class="{ 'checkout__tab--active': method === PaymentMethod.Account }"
        type="button"
        @click="method = PaymentMethod.Account"
      >
        Внутренний счёт
      </button>
    </div>

    <CardPaymentForm v-if="method === PaymentMethod.Card" @paid="goToSuccess" />

    <section v-else class="checkout__account">
      <p class="checkout__account-text">Оплата с внутреннего счёта приложения.</p>
      <button class="checkout__pay" type="button" @click="goToSuccess">
        Оплатить со счёта
      </button>
    </section>
  </main>
</template>

<style scoped src="./CheckoutPage.css"></style>
