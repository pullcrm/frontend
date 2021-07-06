import { Plugin } from '@nuxt/types'

import { factory as createApi } from '~/services/api'
import RpcClient from '~/services/rpc-client'

type Api = ReturnType<typeof createApi>

const plugin: Plugin = (ctx, inject) => {
  const { runtimeConfig, typedStore } = ctx

  const user = runtimeConfig.RPC_USER
  const password = runtimeConfig.RPC_PASSWORD

  const apiClientOptions = {
    auth: (user && password)
      ? `${user}:${password}`
      : null,
    headers: {
      'user-agent': window.navigator.userAgent,
      'accept-encoding': 'gzip'
    }
  }

  // Initialize the api client
  const apiClient = new RpcClient({
    store: typedStore,
    endpoint: `${runtimeConfig.RPC_URL}/`,
    endpointUpload: `${runtimeConfig.RPC_UPLOAD_URL}/`,
    ...apiClientOptions
  })

  const api = createApi(apiClient.call)

  // Inject the api into the context
  ctx.api = api
  ctx.apiClient = apiClient
  inject('api', api)
  inject('apiClient', apiClient)
}

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: Api,
    $apiClient: RpcClient
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api,
    $apiClient: RpcClient
  }
}

declare module '@nuxt/types' {
  interface Context {
    api: Api,
    apiClient: RpcClient
  }
}

export default plugin
