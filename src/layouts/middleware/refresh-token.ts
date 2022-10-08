import jwtDecode from 'jwt-decode'
import { ProtectStorage } from '~/services/protect-storage'
import { api } from '~/boot/api'
import { ACCESS_TOKEN, AUTH_TOKEN_COOKIE_DAYS, REFRESH_TOKEN } from '~/constants'

export default async function ({ redirect, ssrContext, currentRoute }: any) {
  if (!currentRoute.query.refreshToken)
    return

  const authStore = useAuthStore()

  const storage = new ProtectStorage({ ssrContext })

  try {
    const accessToken = await storage.get(ACCESS_TOKEN) as string
    const refreshToken = await storage.get(REFRESH_TOKEN) as string

    const { role, companyId, userId } = jwtDecode(accessToken) as any

    const result = await api.auth.refreshToken({
      role,
      userId,
      companyId,
      refreshToken,
    })

    await storage.set(ACCESS_TOKEN, result.accessToken, {
      expires: AUTH_TOKEN_COOKIE_DAYS,
    })

    await storage.set(REFRESH_TOKEN, result.refreshToken, {
      expires: AUTH_TOKEN_COOKIE_DAYS,
    })

    authStore.accessToken = result.accessToken
    authStore.refreshToken = result.refreshToken

    await authStore.authorize()

    redirect({ name: 'dashboard' })
  }
  catch {
    await storage.remove(ACCESS_TOKEN)
    await storage.remove(REFRESH_TOKEN)

    return redirect({ name: 'login' })
  }
}
