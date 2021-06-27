import { Middleware } from '@nuxt/types'

const middleware: Middleware = (ctx) => {
  const { route, redirect, typedStore } = ctx

  if (typedStore.state.isSiteLoaded) {
    return
  }

  const [path, query] = route.fullPath.split('?')

  if (!/\/$/.test(path)) {
    const urlWithSlash = [`${path}/`, query].filter(Boolean).join('?')

    return redirect(301, encodeURI(urlWithSlash))
  }
}

export default middleware
