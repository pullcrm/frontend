/**
 * RpcError
 */
export class RpcError extends Error {
  code: number
  data: string
  token: string
  method: string
  params: object

  sentryCategory: string
  sentryFingerprint: any[]

  constructor ({ method, params, error, token }) {
    super()

    this.name = 'RpcError'
    this.code = error.code
    this.data = error.data
    this.token = token ? token.slice(0, 6) : null
    this.params = params
    this.method = method
    this.message = `Method "${method}" returned code ${error.code} because ${error.message}.`

    this.sentryCategory = 'rpcClient'
    this.sentryFingerprint = [method, error.code]
  }
}

/**
 * RpcUploadError
 */
export class RpcUploadError extends Error {
  code: number
  data: string
  token: string

  sentryCategory: string

  constructor ({ error, token }) {
    super()

    this.name = 'RpcUploadError'
    this.code = error.code
    this.data = error.data
    this.token = token ? token.slice(0, 6) : null

    this.sentryCategory = 'rpcClient'
  }
}

/**
 * HttpError
 */
export class HttpError extends Error {
  method: string
  params: object
  status: number

  sentryCategory: string
  sentryFingerprint: any[]

  constructor ({ method, params, status }) {
    super()

    this.name = 'HttpError'
    this.method = method
    this.params = params
    this.status = status
    this.message = `Method "${method}" returned status ${status}.`

    this.sentryCategory = 'rpcClient'
    this.sentryFingerprint = [method, status]
  }
}

/**
 * HttpUploadError
 */
export class HttpUploadError extends Error {
  status: number

  sentryCategory: string

  constructor ({ status }) {
    super()

    this.name = 'HttpUploadError'
    this.status = status

    this.sentryCategory = 'rpcClient'
  }
}
