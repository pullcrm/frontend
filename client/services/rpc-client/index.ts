import fetch from 'isomorphic-unfetch'
import { btoa } from 'isomorphic-base64'

import store from '~/store'

import {
  HttpError,
  HttpUploadError
} from './errors'

interface IConstructorParams {
  endpoint: RpcClient['endpoint'],
  endpointUpload?: RpcClient['endpointUpload'],
  auth?: RpcClient['auth'],
  headers?: RpcClient['defaultHeaders'],
  store: RpcClient['store']
}

export default class RpcClient {
  endpoint: string
  endpointUpload?: string

  auth?: string
  token?: string
  defaultHeaders?: Record<string, string>

  store: ReturnType<typeof store>

  /**
   * Constructor
   */
  constructor (params: IConstructorParams) {
    const {
      auth,
      store,
      headers,
      endpoint,
      endpointUpload
    } = params

    this.endpoint = endpoint
    this.endpointUpload = endpointUpload

    this.auth = auth
    this.defaultHeaders = headers

    this.store = store
  }

  setToken (token: string) {
    this.token = token
  }

  /**
   * Call
   */
  call = async (method: string, params: object = {}, type = 'POST') => {
    const headers = {
      ...this.headers,
      'Content-Type': 'application/json'
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
      headers
    })

    if (method !== 'token' && response.status === 401) {
      await this.store.dispatch('auth/refreshToken')

      return this.call(method, params, type)
    }

    if (!response.ok) {
      throw new HttpError({
        method,
        params,
        status: response.status
      })
    }

    const rpcResponse = await response.json()

    return rpcResponse
  }

  /**
   * Upload
   */
  upload = async (form: FormData) => {
    const response = await fetch(this.endpointUpload, {
      method: 'POST',
      body: form,
      headers: this.headers
    })

    if (!response.ok) {
      throw new HttpUploadError({
        status: response.status
      })
    }

    return await response.json()
  }

  /**
   * Get headers
   */
  private get headers () {
    return {
      Authorization: this.auth ? 'Basic ' + btoa(`${this.auth}`) : null,
      ...this.defaultHeaders,
      ...(this.token && { Authorization2: `Bearer ${this.token}` })
    }
  }

  /**
   * Get query params
   */
  private getQueryParams (params) {
    if (!params) {
      return ''
    }

    return '?' + Object.keys(params)
      .filter(key => params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&')
  }
}
