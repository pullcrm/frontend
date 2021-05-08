import { Plugin } from '@nuxt/types'

import { createStorage } from '~/services/storage'

const plugin: Plugin = (_ctx, inject) => {
  inject('localStorage', createStorage(() => window.localStorage))
  inject('sessionStorage', createStorage(() => window.sessionStorage))
}

export default plugin

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $localStorage: Storage,
    $sessionStorage: Storage
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $localStorage: Storage,
    $sessionStorage: Storage
  }
}
