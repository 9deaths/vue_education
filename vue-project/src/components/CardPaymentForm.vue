<script setup lang="ts">
import { computed, reactive, useTemplateRef } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatCardNumber, isValidCardNumber, isValidExpiry } from '../utils/luhn'

/** Событие успешной оплаты. */
const emit = defineEmits<{ paid: [] }>()

const store = useCartStore()

/** Ссылки на поля для управления фокусом. */
const numberEl = useTemplateRef<HTMLInputElement>('numberEl')
const expiryEl = useTemplateRef<HTMLInputElement>('expiryEl')
const cvcEl = useTemplateRef<HTMLInputElement>('cvcEl')
const holderEl = useTemplateRef<HTMLInputElement>('holderEl')

const form = reactive({
  cardNumber: '',
  expiry: '',
  cvc: '',
  holder: '',
})

/** Флаги изменения полей. */
const touched = reactive({
  cardNumber: false,
  expiry: false,
  cvc: false,
  holder: false,
})

/** Текущие ошибки формы. */
const errors = computed<Record<string, string>>(() => {
  const result: Record<string, string> = {}
  const digits = form.cardNumber.replace(/\s/g, '')

  if (!digits) {
    result.cardNumber = 'Введите номер карты'
  }
  else if (digits.length < 16) {
    result.cardNumber = 'Номер должен содержать 16 цифр'
  }
  else if (!isValidCardNumber(digits)) {
    result.cardNumber = 'Номер карты неверный'
  }

  if (!form.expiry) {
    result.expiry = 'Введите срок действия'
  }
  else if (!isValidExpiry(form.expiry)) {
    result.expiry = 'Неверный срок (MM/ГГ)'
  }

  if (form.cvc.length < 3) {
    result.cvc = 'Введите CVC'
  }

  if (form.holder.trim().length < 3) {
    result.holder = 'Введите имя держателя'
  }

  return result
})

/** Валидна ли вся форма. */
const isValid = computed(() => Object.keys(errors.value).length === 0)

/** Форматирует номер карты и переводит фокус на следущее поле. */
function onNumberInput() {
  form.cardNumber = formatCardNumber(form.cardNumber)
  if (form.cardNumber.replace(/\s/g, '').length === 16) {
    expiryEl.value?.focus()
  }
}

/** Форматирует срок и переводит фокус на следущее поле. */
function onExpiryInput() {
  const digits = form.expiry.replace(/\D/g, '').slice(0, 4)
  form.expiry = digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  if (form.expiry.length === 5) {
    cvcEl.value?.focus()
  }
}

/** Ограничивает CVC тремя цифрами и переводит фокус на следущее поле. */
function onCvcInput() {
  form.cvc = form.cvc.replace(/\D/g, '').slice(0, 3)
  if (form.cvc.length === 3) {
    holderEl.value?.focus()
  }
}

/** Возвращает фокус на предыдущее поле. */
function focusPrev(event: KeyboardEvent, prev: HTMLInputElement | null, value: string) {
  if (event.key === 'Backspace' && value === '' && prev) {
    prev.focus()
  }
}

/** Отправка формы: показываем ошибки и переходим только при валидности. */
function submit() {
  touched.cardNumber = true
  touched.expiry = true
  touched.cvc = true
  touched.holder = true

  if (isValid.value) {
    emit('paid')
  }
}
</script>

<template>
  <form class="card-form" novalidate @submit.prevent="submit">
    <label class="card-form__field">
      <span>Номер карты</span>
      <input
        ref="numberEl"
        v-model="form.cardNumber"
        type="text"
        inputmode="numeric"
        autocomplete="cc-number"
        placeholder="0000 0000 0000 0000"
        maxlength="19"
        @input="onNumberInput"
        @keydown="focusPrev($event, null, form.cardNumber)"
        @blur="touched.cardNumber = true"
      />
      <span v-if="touched.cardNumber && errors.cardNumber" class="card-form__error">
        {{ errors.cardNumber }}
      </span>
    </label>

    <div class="card-form__row">
      <label class="card-form__field">
        <span>Срок</span>
        <input
          ref="expiryEl"
          v-model="form.expiry"
          type="text"
          inputmode="numeric"
          autocomplete="cc-exp"
          placeholder="MM/ГГ"
          maxlength="5"
          @input="onExpiryInput"
          @keydown="focusPrev($event, numberEl, form.expiry)"
          @blur="touched.expiry = true"
        />
        <span v-if="touched.expiry && errors.expiry" class="card-form__error">
          {{ errors.expiry }}
        </span>
      </label>

      <label class="card-form__field">
        <span>CVC</span>
        <input
          ref="cvcEl"
          v-model="form.cvc"
          type="text"
          inputmode="numeric"
          autocomplete="cc-csc"
          placeholder="123"
          maxlength="3"
          @input="onCvcInput"
          @keydown="focusPrev($event, expiryEl, form.cvc)"
          @blur="touched.cvc = true"
        />
        <span v-if="touched.cvc && errors.cvc" class="card-form__error">
          {{ errors.cvc }}
        </span>
      </label>
    </div>

    <label class="card-form__field">
      <span>Имя держателя</span>
      <input
        ref="holderEl"
        v-model="form.holder"
        type="text"
        autocomplete="cc-name"
        placeholder="IVAN IVANOV"
        @blur="touched.holder = true"
      />
      <span v-if="touched.holder && errors.holder" class="card-form__error">
        {{ errors.holder }}
      </span>
    </label>

    <button class="card-form__submit" type="submit">
      Оплатить {{ store.total }} ₽
    </button>
  </form>
</template>

<style scoped src="./CardPaymentForm.css"></style>
