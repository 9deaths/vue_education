<script setup lang="ts">
import { createFilters, type ProductFilters } from '../composables/useFilters'

/** Список доступных категорий. */
defineProps<{
  categories: string[]
  brands: string[]
}>()

/** Модель параметров фильтрации товаров.*/
const filters = defineModel<ProductFilters>('filters', {
  default: createFilters,
})

/** Сбрасывает все фильтры.*/
function reset() {
  filters.value = createFilters()
}
</script>

<template>
  <div class="filters">
    <h3 class="filters__title">Фильтры</h3>

    <div class="filters__row">
      <label class="filters__field">
        <span>Цена от</span>
        <input v-model.number="filters.minPrice" type="number" min="0" />
      </label>
      <label class="filters__field">
        <span>Цена до</span>
        <input v-model.number="filters.maxPrice" type="number" min="0" />
      </label>
    </div>

    <label class="filters__field">
      <span>Категория</span>
      <select v-model="filters.category">
        <option value="">Все</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </label>

    <label class="filters__field">
      <span>Бренд</span>
      <select v-model="filters.brand">
        <option value="">Все</option>
        <option
          v-for="brand in brands"
          :key="brand"
          :value="brand"
        >
          {{ brand }}
        </option>
      </select>
    </label>

    <label class="filters__checkbox">
      <input v-model="filters.inStock" type="checkbox" />
      <span>Только в наличии</span>
    </label>

    <button type="button" class="filters__reset" @click="reset">
      Сбросить
    </button>
  </div>
</template>

<style scoped src="../assets/styles/filters.css"></style>