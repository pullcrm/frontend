import { Plugin } from '@nuxt/types'
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'

const plugin: Plugin = (ctx, inject) => {
  inject('runtimeConfig', ctx.$config)

  ctx.runtimeConfig = ctx.$config
}

declare module '@nuxt/types' {
  interface Context {
    runtimeConfig: NuxtRuntimeConfig
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $runtimeConfig: NuxtRuntimeConfig
  }
}

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $runtimeConfig: NuxtRuntimeConfig
  }
}

export default plugin
