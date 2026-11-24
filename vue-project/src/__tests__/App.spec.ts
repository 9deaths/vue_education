import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  it('отображает шапку', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>catalog</div>' } },
        { path: '/cart', name: 'cart', component: { template: '<div>cart</div>' } },
      ],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [createPinia(), router] },
    })

    expect(wrapper.text()).toContain('Магазин')
  })
})
