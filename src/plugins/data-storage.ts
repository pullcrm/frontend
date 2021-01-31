import store from '@/store'

import { createStorage } from '@/services/storage'

export default {
  install (Vue) {
    const localStorage = createStorage(() => window.localStorage) as Storage
    const sessionStorage = createStorage(() => window.sessionStorage) as Storage

    Vue.prototype.$localStorage = localStorage
    Vue.prototype.$sessionStorage = sessionStorage

    store.$localStorage = localStorage
    store.$sessionStorage = sessionStorage
  }
}

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
