import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ typedStore, route }) => {
  if (typedStore.state.isSiteLoaded === false) {
    typedStore.commit('location/SET_RENDERED_ROUTE_PATH', route.fullPath)
  }

  typedStore.commit('location/ADD', {
    path: route.path,
    name: route.name,
    query: route.query,
    params: route.params,
    fullPath: route.fullPath
  })
}

export default middleware
