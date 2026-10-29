import type { RouteRecordRaw } from 'vue-router'

/** Маршруты оформления и оплаты заказа. */
const checkoutRoutes: RouteRecordRaw[] = [
  { path: '/checkout', name: 'checkout', component: () => import('../../views/CheckoutPage.vue') },
  { path: '/success', name: 'success', component: () => import('../../views/SuccessPage.vue') },
]

export default checkoutRoutes