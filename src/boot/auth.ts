import { boot } from 'quasar/wrappers'
import { ProtectStorage } from '~/services/protect-storage'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

export default boot(async ({ ssrContext }: any) => {
  const authStore = useAuthStore()

  const storage = new ProtectStorage({ ssrContext })

  const accessToken = await storage.get(ACCESS_TOKEN)
  const refreshToken = await storage.get(REFRESH_TOKEN)

  authStore.accessToken = accessToken
  authStore.refreshToken = refreshToken

  authStore.authorize()
})
