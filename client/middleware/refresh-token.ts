import { Middleware } from '@nuxt/types'

import jwtDecode from 'jwt-decode'

import { ACCESS_TOKEN, AUTH_TOKEN_COOKIE_DAYS, REFRESH_TOKEN } from '~/constants'

const middleware: Middleware = async ({ typedStore, api, route, redirect, cookies }) => {
  try {
    if (route.meta.some((record) => record.public)) return
    if (!route.query.refreshToken) return

    const accessToken = cookies.get(ACCESS_TOKEN)
    const refreshToken = cookies.get(REFRESH_TOKEN)

    const { role, companyId, userId } = jwtDecode(accessToken)

    const result = await api.auth.refreshToken({
      role,
      userId,
      companyId,
      refreshToken
    })

    cookies.set(ACCESS_TOKEN, result.accessToken, {
      days: AUTH_TOKEN_COOKIE_DAYS
    })
    cookies.set(REFRESH_TOKEN, result.refreshToken, {
      days: AUTH_TOKEN_COOKIE_DAYS
    })

    typedStore.commit('auth/SET_TOKENS', result)
    typedStore.dispatch('auth/authorize')

    redirect({ name: 'dashboard' })
  } catch {
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(REFRESH_TOKEN)

    return redirect({ name: 'login' })
  }
}

export default middleware
