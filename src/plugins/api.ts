import { IRpcClient } from '@/services/api/clients'
import { factory as apiFactory } from '@/services/api'
import HttpRpcClient from '@/services/api/clients/HttpRpcClient'

import store from '@/store'

type Api = ReturnType<typeof apiFactory>

export default {
  install (Vue) {
    const endpoint = process.env.VUE_APP_RPC_URL || 'https://pullcrm.com/api/'

    const user = 'clients'
    const password = 'guest'

    const client = new HttpRpcClient({
      endpoint,
      password,
      user
    })

    const api = apiFactory(client.call)

    Vue.prototype.$api = api
    Vue.prototype.$apiClient = client

    store.$api = api
    store.$apiClient = client
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $api: Api
    $apiClient: IRpcClient
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
    $apiClient: IRpcClient
  }
}
