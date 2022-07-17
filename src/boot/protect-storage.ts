import { boot } from 'quasar/wrappers'
import { ProtectStorage } from '~/services/protect-storage'

// @ts-expect-error
export default boot(({ app, store, ssrContext }) => {
  const storage = new ProtectStorage({ ssrContext })

  app.provide('$protectStorage', storage)
  app.config.globalProperties.$protectStorage = storage

  store.use(() => ({ $protectStorage: storage }))
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $protectStorage: ProtectStorage
  }
}

declare module 'pinia' {
  interface PiniaCustomProperties {
    $protectStorage: ProtectStorage
  }
}
