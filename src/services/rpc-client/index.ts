import fetch from 'isomorphic-unfetch'
// @ts-expect-error
import { btoa } from 'isomorphic-base64'

import {
  HttpError,
  HttpUploadError,
  RpcError,
} from './errors'

interface IConstructorParams {
  endpoint: RpcClient['endpoint']
  endpointUpload: RpcClient['endpointUpload']
  endpointBalanceCheckout: RpcClient['endpointBalanceCheckout']
  auth?: RpcClient['auth']
  headers?: RpcClient['defaultHeaders']
  onRefreshToken: RpcClient['onRefreshToken']
}

export default class RpcClient {
  endpoint: string
  endpointUpload: string
  endpointBalanceCheckout: string

  auth?: string
  token?: string
  defaultHeaders?: Record<string, string>

  onRefreshToken: () => void

  /**
   * Constructor
   */
  constructor(params: IConstructorParams) {
    const {
      auth,
      headers,
      endpoint,
      endpointUpload,
      endpointBalanceCheckout,
      onRefreshToken,
    } = params

    this.endpoint = endpoint
    this.endpointUpload = endpointUpload
    this.endpointBalanceCheckout = endpointBalanceCheckout

    this.auth = auth
    this.defaultHeaders = headers

    this.onRefreshToken = onRefreshToken
  }

  setToken(token: string) {
    this.token = token
  }

  /**
   * Call
   */
  call = async (method: string, params: object = {}, type = 'POST'): Promise<any> => {
    const headers = {
      ...this.headers,
      'Content-Type': 'application/json',
    }

    const bodyParams = type !== 'GET'
      ? JSON.stringify(params)
      : null

    const queryParams = type === 'GET'
      ? this.getQueryParams(params)
      : ''

    const response = await fetch(`${this.endpoint}${method}${queryParams}`, {
      method: type,
      body: bodyParams,
      headers,
    })

    if (process.env.CLIENT && method !== 'token' && response.status === 401) {
      // TODO: Not working
      await this.onRefreshToken()

      return this.call(method, params, type)
    }

    if (!response.ok) {
      throw new HttpError({
        method,
        params,
        status: response.status,
      })
    }

    const rpcResponse = await response.json()

    if (rpcResponse.error) {
      const error = rpcResponse.error

      throw new RpcError({
        method,
        params,
        error,
        token: this.token,
      })
    }

    return rpcResponse
  }

  /**
   * Upload
   */
  upload = async (form: FormData) => {
    const response = await fetch(this.endpointUpload, {
      method: 'POST',
      body: form,
      headers: this.headers,
    })

    if (!response.ok) {
      throw new HttpUploadError({
        status: response.status,
      })
    }

    return await response.json()
  }

  /**
   * Checkout
   */
  balanceCheckout = async (params: { amount: number }) => {
    const headers = {
      ...this.headers,
      'Content-Type': 'application/json',
    }

    const response = await fetch(this.endpointBalanceCheckout, {
      method: 'POST',
      body: JSON.stringify(params),
      headers,
    })

    if (!response.ok) {
      throw new HttpError({
        method: 'balance/checkout',
        params,
        status: response.status,
      })
    }

    return await response.text()
  }

  /**
   * Get headers
   */
  private get headers() {
    return {
      ...(this.auth && { Authorization: `Basic ${btoa(`${this.auth}`)}` }),
      ...this.defaultHeaders,
      ...(this.token && { Authorization2: `Bearer ${this.token}` }),
    }
  }

  /**
   * Get query params
   */
  private getQueryParams(params: any) {
    if (!params)
      return ''

    return `?${Object.keys(params)
      .filter(key => params[key])
      .map((key) => {
        if (Array.isArray(params[key]))
          return params[key].map((value: any) => `${key}[]=${value}`).join('&')

        return `${key}=${params[key]}`
      })
      .join('&')}`
  }
}
