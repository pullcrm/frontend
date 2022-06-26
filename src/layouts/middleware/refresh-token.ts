import jwtDecode from 'jwt-decode'
import { Cookies } from 'quasar'
import { api } from '~/boot/api'
import { ACCESS_TOKEN, AUTH_TOKEN_COOKIE_DAYS, REFRESH_TOKEN } from '~/constants'

export default async function ({ redirect, ssrContext, currentRoute }: any) {
  if (!currentRoute.query.refreshToken)
    return

  const authStore = useAuthStore()

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  try {
    const accessToken: string = cookies.get(ACCESS_TOKEN)
    const refreshToken: string = cookies.get(REFRESH_TOKEN)

    const { role, companyId, userId } = jwtDecode(accessToken) as any

    const result = await api.auth.refreshToken({
      role,
      userId,
      companyId,
      refreshToken,
    })

    cookies.set(ACCESS_TOKEN, result.accessToken, {
      path: '/',
      expires: AUTH_TOKEN_COOKIE_DAYS,
    })
    cookies.set(REFRESH_TOKEN, result.refreshToken, {
      path: '/',
      expires: AUTH_TOKEN_COOKIE_DAYS,
    })

    authStore.accessToken = result.accessToken
    authStore.refreshToken = result.refreshToken

    await authStore.authorize()

    redirect({ name: 'dashboard' })
  }
  catch {
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(REFRESH_TOKEN)

    return redirect({ name: 'login' })
  }
}
