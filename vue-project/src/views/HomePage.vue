<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import SearchForm from '../components/SearchForm.vue'
import FilterPanel from '../components/FilterPanel.vue'
import { createFilters } from '../composables/useFilters'

/** Массив товаров. */
const products = ref<any[]>([])

/** Флаг загрузки товаров. */
const loading = ref(true)

/** Текст ошибки загрузки. */
const error = ref<string | null>(null)

/** Флаг отображения фильтров. */
const showFilters = ref(false)

/** Строка поиска по названию. */
const searchQuery = ref('')

/** Фильтры товаров. */
const filters = ref(createFilters())

/** Загружаются товары (загрузка происходит сразу не ожидая OnMaunted). */
fetch('/products.json')
  .then((res) => {
    if (!res.ok) throw new Error('Не удалось загрузить товары')
    return res.json()
  })
  .then((data) => {
    products.value = data
  })
  .catch((e: any) => {
    error.value = e.message
  })
  .finally(() => {
    loading.value = false
  })

/** Доступные категории, полученные из списка товаров. */
const categories = computed(() =>
  [...new Set(products.value.map((p) => p.category))].sort(),
)

/** Доступные бренды, полученные из списка товаров. */
const brands = computed(() =>
  [...new Set(products.value.map((p) => p.brand))].sort(),
)

/** Отильтрованные карточки. */
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase().trim())

    const matchesMin = filters.value.minPrice == null || p.price >= filters.value.minPrice
    const matchesMax = filters.value.maxPrice == null || p.price <= filters.value.maxPrice
    const matchesCategory = !filters.value.category || p.category === filters.value.category
    const matchesBrand = !filters.value.brand || p.brand === filters.value.brand
    const matchesStock = !filters.value.inStock || p.inStock

    return matchesSearch && matchesMin && matchesMax
      && matchesCategory && matchesBrand && matchesStock
  })
})
</script>

<template>
  <main class="home">
    <div class="home__toolbar">
      <SearchForm v-model:search="searchQuery" class="home__search" />
      <button class="home__toggle" @click="showFilters = !showFilters">
        {{ showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}
      </button>
    </div>
    <div v-show="showFilters">
      <FilterPanel v-model:filters="filters" :categories="categories" :brands="brands" />
    </div>
    <div v-if="loading" class="home__status">Загрузка…</div>
    <div v-else-if="error" class="home__status home__status--error">{{ error }}</div>
    <div v-else-if="filteredProducts.length === 0" class="home__status">
      Ничего не найдено
    </div>
    <div v-else class="products">
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
    </div>
  </main>
</template>

<style scoped src="../assets/styles/home.css"></style>