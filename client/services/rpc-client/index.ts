import fetch from 'isomorphic-unfetch'
// import { btoa } from 'isomorphic-base64'

import {
  RpcError,
  RpcUploadError,
  HttpError,
  HttpUploadError
} from './errors'

import { IRpcResponse } from './rpc'

interface IConstructorParams {
  endpoint: RpcClient['endpoint'],
  endpointUpload?: RpcClient['endpointUpload'],
  auth?: RpcClient['auth'],
  headers?: RpcClient['defaultHeaders']
}

export default class RpcClient {
  endpoint: string
  endpointUpload?: string

  auth?: string
  token?: string
  defaultHeaders?: Record<string, string>

  onResponse = (_payload: any) => {}

  /**
   * Constructor
   */
  constructor (params: IConstructorParams) {
    const {
      auth,
      headers,
      endpoint,
      endpointUpload
    } = params

    this.endpoint = endpoint
    this.endpointUpload = endpointUpload

    this.auth = auth
    this.defaultHeaders = headers
  }

  setToken (token: string) {
    this.token = token
  }

  /**
   * Call
   */
  call = async (method: string, params: object = {}, type = 'POST') => {
    const startTime = new Date()

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

    const duration = Date.now() - Number(startTime)

    if (!response.ok) {
      this.onResponse({
        token: this.token,
        method,
        params,
        headers,
        duration,
        startTime
      })

      throw new HttpError({
        method,
        params,
        status: response.status
      })
    }

    const rpcResponse: IRpcResponse = await response.json()

    this.onResponse({
      token: this.token,
      method,
      params,
      headers,
      duration,
      startTime,
      rpcResponse
    })

    if (rpcResponse.error) {
      const error = rpcResponse.error

      throw new RpcError({
        method,
        params,
        error,
        token: this.token
      })
    }

    return rpcResponse
  }

  /**
   * Upload
   */
  upload = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    const response = await fetch(this.endpointUpload, {
      method: 'POST',
      body: formData,
      headers: this.headers
    })

    if (!response.ok) {
      throw new HttpUploadError({
        status: response.status
      })
    }

    const rpcResponse: IRpcResponse = await response.json()

    if (rpcResponse.error) {
      const error = rpcResponse.error

      throw new RpcUploadError({
        error,
        token: this.token
      })
    }

    return rpcResponse.result
  }

  /**
   * Get headers
   */
  private get headers () {
    return {
      ...this.defaultHeaders,
      // Authorization: this.auth ? 'Basic ' + btoa(`${this.auth}`) : null,
      ...(this.token && { Authorization: `Bearer ${this.token}` })
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
