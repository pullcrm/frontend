import { Cookies } from 'quasar'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

export default async function ({ redirect, ssrContext }: any) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  const baseStore = useBaseStore()
  const authStore = useAuthStore()

  try {
    if (baseStore.profile)
      return

    if (authStore.accessToken) {
      await baseStore.fetchProfile()

      return
    }

    redirect('/login/')
  }
  catch (err: any) {
    if (err.status === 401) {
      redirect({ name: 'dashboard', query: { refreshToken: 'true' } })
      return
    }

    if (err.status === 403) {
      cookies.remove(ACCESS_TOKEN)
      cookies.remove(REFRESH_TOKEN)

      redirect('/login/')
      return
    }

    throw err
  }
}
