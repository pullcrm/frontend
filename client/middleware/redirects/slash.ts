import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ route, typedStore }) => {
  if (typedStore.state.isSiteLoaded) {
    return
  }

  if (route.meta.some(record => record.slashRedirect === false)) {
    return
  }

  const [path, query] = route.fullPath.split('?')

  if (!/\/$/.test(path)) {
    const urlWithSlash = [`${path}/`, query].filter(Boolean).join('?')

    window.location.href = urlWithSlash
  }
}

export default middleware
