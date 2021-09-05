import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ req, runtimeConfig, typedStore, route }) => {
  if (process.server) {
    const host = String(req.headers.host)
    const userIp = route.query.__ip ?? req.headers['x-real-ip'] ?? req.socket.remoteAddress
    const userAgent = req.headers['user-agent'] ?? ''

    const baseHost = String(runtimeConfig.BASE_HOST)

    typedStore.commit('location/SET_HOST', host)
    typedStore.commit('location/SET_BASE_HOST', baseHost)

    typedStore.commit('location/SET_USER_IP', userIp)
    typedStore.commit('location/SET_USER_AGENT', userAgent)

    typedStore.commit('location/SET_RENDERED_ROUTE_PATH', route.fullPath)
  }

  typedStore.commit('location/ADD', route)
}

export default middleware
