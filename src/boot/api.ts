import { boot } from 'quasar/wrappers'

import { factory as createApi } from '~/services/api'
import RpcClient from '~/services/rpc-client'

type Api = ReturnType<typeof createApi>

const user = process.env.RPC_USER
const password = process.env.RPC_PASSWORD

const apiClientOptions = {
  auth: (user && password)
    ? `${user}:${password}`
    : undefined,
  headers: {
    // 'user-agent': window.navigator.userAgent,
    'accept-encoding': 'gzip',
  },
}

// Initialize the api client
const apiClient = new RpcClient({
  endpoint: `${process.env.RPC_URL}/`,
  endpointUpload: `${process.env.RPC_UPLOAD_URL}/`,
  endpointBalanceCheckout: `${process.env.RPC_BALANCE_CHECKOUT}/`,
  onRefreshToken: async () => {
    const authStore = useAuthStore()

    await authStore.onRefreshToken()
  },
  ...apiClientOptions,
})

const api = createApi(apiClient.call)

export default boot((ctx) => {
  const { app, store } = ctx

  // Inject the api into the context
  app.config.globalProperties.$api = api
  app.provide('api', api)

  store.use(() => ({ $api: api }))
  store.use(() => ({ $apiClient: apiClient }))
})

export { api, apiClient }

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: Api
    $apiClient: RpcClient
  }
}

declare module 'pinia' {
  interface PiniaCustomProperties {
    $api: Api
    $apiClient: RpcClient
  }
}

// declare module 'vuex/types' {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   interface Store<S> {
//     $api: Api,
//     $apiClient: RpcClient
//   }
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     $api: Api,
//     $apiClient: RpcClient
//   }
// }

// declare module '@nuxt/types' {
//   interface Context {
//     api: Api,
//     apiClient: RpcClient
//   }
// }
