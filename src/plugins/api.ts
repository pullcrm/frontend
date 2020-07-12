import { IRpcClient } from '@/services/api/clients'
import { factory as apiFactory } from '@/services/api'
import HttpRpcClient from '@/services/api/clients/HttpRpcClient'

type Api = ReturnType<typeof apiFactory>

export default {
  install (Vue) {
    const endpoint = 'http://www.pullcrm.com/api/'

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
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
    $apiClient: IRpcClient
  }
}
