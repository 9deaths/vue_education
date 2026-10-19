/** Интерфейс параметров фильтрации товаров. */
export interface ProductFilters {
  minPrice: number | null
  maxPrice: number | null
  category: string
  brand: string
  inStock: boolean
}

/** Создаёт фильтры со значениями по умолчанию. */
export function createFilters(): ProductFilters {
  return {
    minPrice: null,
    maxPrice: null,
    category: '',
    brand: '',
    inStock: false,
  }
}
