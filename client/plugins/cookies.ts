import { Plugin } from '@nuxt/types'

import { Cookies } from '~/utils/cookies'

const plugin: Plugin = (ctx, inject) => {
  const { req, res } = ctx

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSetCookieBrowser = (cookie) => {
    document.cookie = cookie
  }

  const onSetCookieServer = () => {
    const state = []

    return function (cookie) {
      state.push(cookie)

      res.setHeader('Set-Cookie', state)
    }
  }

  const cookies = process.client
    ? new Cookies(() => document.cookie, onSetCookieBrowser)
    : new Cookies(() => req.headers.cookie, onSetCookieServer())

  // Inject the cookies into the context
  ctx.cookies = cookies
  inject('cookies', cookies)
}

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $cookies: Cookies
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: Cookies
  }
}

declare module '@nuxt/types' {
  interface Context {
    cookies: Cookies
  }
}

export default plugin
