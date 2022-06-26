import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

export default boot(({ ssrContext }: any) => {
  const authStore = useAuthStore()

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  const accessToken = cookies.get(ACCESS_TOKEN)
  const refreshToken = cookies.get(REFRESH_TOKEN)

  authStore.accessToken = accessToken
  authStore.refreshToken = refreshToken

  authStore.authorize()
})
