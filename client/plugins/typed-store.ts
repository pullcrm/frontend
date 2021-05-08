import { Plugin } from '@nuxt/types'

import store from '~/store'

const plugin: Plugin = (ctx, inject) => {
  inject('typedStore', ctx.store)

  ctx.typedStore = ctx.store
}

export default plugin

declare module '@nuxt/types' {
  interface Context {
    typedStore: ReturnType<typeof store>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $typedStore: ReturnType<typeof store>
  }
}
