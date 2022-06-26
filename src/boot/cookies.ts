import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'

// @ts-expect-error
export default boot(({ app, store, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  app.provide('$cookies', cookies)
  app.config.globalProperties.$cookies = cookies

  store.use(() => ({ $cookies: cookies }))
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cookies: typeof Cookies
  }
}

declare module 'pinia' {
  interface PiniaCustomProperties {
    $cookies: typeof Cookies
  }
}
