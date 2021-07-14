import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ typedStore, route }) => {
  typedStore.commit('location/ADD', {
    path: route.path,
    name: route.name,
    query: route.query,
    params: route.params,
    fullPath: route.fullPath
  })
}

export default middleware
