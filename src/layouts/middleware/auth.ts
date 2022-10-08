import { ProtectStorage } from '~/services/protect-storage'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

export default async function ({ redirect, ssrContext }: any) {
  const storage = new ProtectStorage({ ssrContext })

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
      await storage.remove(ACCESS_TOKEN)
      await storage.remove(REFRESH_TOKEN)

      redirect('/login/')
      return
    }

    throw err
  }
}
