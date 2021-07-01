import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ redirect, typedStore }) => {
  await typedStore.dispatch('auth/fetchToken')

  if (typedStore.state.auth.accessToken) {
    return redirect({ name: 'dashboard' })
  }
}

export default middleware
