import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ typedStore, route, redirect }) => {
  if (['companyCreate'].includes(route.name)) {
    return
  }

  if (typedStore.state.position.current) {
    return
  }

  if (typedStore.getters['position/hasPositions'] === false) {
    return redirect({ name: 'companyCreate' })
  }

  await typedStore.dispatch('position/fetch')
}

export default middleware
