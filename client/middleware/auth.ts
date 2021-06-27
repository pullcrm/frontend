import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ typedStore, route, redirect }) => {
  if (route.meta.some((record) => record.public)) return

  if (typedStore.state.profile) {
    return
  }

  if (!typedStore.state.auth.accessToken) {
    await typedStore.dispatch('auth/fetchToken')
  }

  if (typedStore.state.auth.accessToken) {
    return await typedStore.dispatch('profile')
  }

  redirect({ name: 'login' })
}

export default middleware
