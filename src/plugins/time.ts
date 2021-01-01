import Time from '@/services/time/time'

import store from '@/store'

export default {
  install (Vue) {
    const time = new Time({
      open: '10:00',
      close: '20:00'
    })

    Vue.prototype.$time = time

    store.$time = time
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $time: Time
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $time: Time
  }
}
