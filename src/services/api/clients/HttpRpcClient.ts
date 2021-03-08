// import { btoa } from 'isomorphic-base64'
import store from '@/store'

import { ApiRpcError } from '../errors'

import GET from './method/get'
import POST from './method/post'
import FORM from './method/form'

import { IRpcClient } from '.'

interface IConstructorParams {
  endpoint: HttpRpcClient['endpoint'],
  user?: HttpRpcClient['user']
  password?: HttpRpcClient['password']
}

export default class HttpRpcClient implements IRpcClient {
  endpoint: string
  user?: string
  password?: string
  GET: any
  POST: any
  PUT: any
  DELETE: any
  FORM: any
  accessToken?: string

  constructor ({ endpoint, password, user }: IConstructorParams) {
    this.GET = GET
    this.POST = POST
    this.PUT = POST
    this.DELETE = POST
    this.FORM = FORM
    this.endpoint = endpoint
    this.user = user
    this.password = password
  }

  setAccessToken (token: string) {
    this.accessToken = token
  }

  call = async (method: string, params: any, type = 'POST') => {
    const response = await this[type]({
      type,
      params,
      method,
      endpoint: this.endpoint,
      headers: this.headers
    })

    const rpcResponse: any = await response.json()

    // TODO: refactor condition
    if (rpcResponse.message === 'Expired access token') {
      await store.dispatch('auth/refreshToken')

      location.reload()
    }

    if (rpcResponse.error || !response.ok) {
      const code = rpcResponse?.error?.code ?? rpcResponse.status
      const data = rpcResponse?.error?.data ?? rpcResponse

      throw new ApiRpcError({
        method,
        params,
        code,
        data
      })
    }

    return rpcResponse
  }

  private get headers () {
    const headers: Record<string, string> = {
      'Accept-Encoding': 'gzip'
    }

    // if (this.user) {
    //   headers.Authorization = 'Basic ' + btoa(`${this.user}:${this.password}`)
    // }

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    return headers
  }
}
