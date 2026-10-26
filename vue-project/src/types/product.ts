/** Товар каталога. */
export interface Product {
  id: number
  title: string
  price: number
  image: string
}

/** Товар каталога с дополнительными полями. */
export interface CatalogProduct extends Product {
  category: string
  brand: string
  rating: number
  inStock: boolean
}

/** Товар в корзине. */
export interface CartItem extends Product {
  quantity: number
}
