<script setup lang="ts">
const search = defineModel<string>('search', { default: '' })
</script>

<template>
  <div class="search">
    <label class="search__label" for="search-input">Поиск товаров</label>
    <input
      id="search-input"
      v-model="search"
      type="text"
      class="search__input"
      placeholder="Введите название товара…"
    />
  </div>
</template>

<style scoped src="../assets/styles/search-form.css"></style>