import { Plugin } from '@nuxt/types'

import Time from '~/services/time/time'

const plugin: Plugin = (ctx, inject) => {
  const time = new Time({
    open: '10:00',
    close: '20:00'
  })

  inject('time', time)

  ctx.time = time
}

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $time: Time
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $time: Time
  }
}

declare module '@nuxt/types' {
  interface Context {
    time: Time
  }
}

export default plugin
