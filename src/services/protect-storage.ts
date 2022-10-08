import { Cookies } from 'quasar'
import { Storage } from '@capacitor/storage'

class ProtectStorage {
  protected cookies: typeof Cookies

  protected storage: typeof Storage
  protected isCapacitor = false

  constructor({ ssrContext }: any) {
    this.isCapacitor = process.env.MODE === 'capacitor'

    this.storage = Storage

    this.cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies
  }

  async get(key: string) {
    if (this.isCapacitor) {
      const { value } = await this.storage.get({
        key,
      })

      return value
    }

    return this.cookies.get(key)
  }

  set(key: string, value: string, options?: object) {
    if (this.isCapacitor) {
      return this.storage.set({
        key,
        value,
      })
    }

    return this.cookies.set(key, value, {
      path: '/',
      sameSite: 'Lax',
      ...options,
    })
  }

  remove(key: string) {
    if (this.isCapacitor) {
      return this.storage.remove({
        key,
      })
    }

    return this.cookies.remove(key)
  }
}

export { Cookies, ProtectStorage }
