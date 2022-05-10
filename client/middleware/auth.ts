import { Middleware } from '@nuxt/types'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

const middleware: Middleware = async ({ typedStore, route, redirect, cookies }) => {
  try {
    if (route.meta.some((record) => record.public)) return

    if (typedStore.state.profile) {
      return
    }

    if (typedStore.state.auth.accessToken) {
      await typedStore.dispatch('profile')

      return
    }

    redirect({ name: 'login' })
  } catch (err) {
    if (err.status === 401) {
      return redirect({ name: 'dashboard', query: { refreshToken: 'true' } })
    }

    if (err.status === 403) {
      cookies.remove(ACCESS_TOKEN)
      cookies.remove(REFRESH_TOKEN)

      return redirect({ name: 'login' })
    }

    throw err
  }
}

export default middleware
