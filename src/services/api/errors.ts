export class ApiRpcError extends Error {
  method: string
  params: object
  code: number
  data: string
  token: string

  constructor ({ method, params, code, data }) {
    super()

    this.name = 'ApiRpcError'
    this.message = `Method "${method}" returned code ${code} because ${data}.`
    this.method = method
    this.params = params
    this.code = code
    this.data = data
  }
}

export class ApiServerError extends Error {
  method: string
  params: object
  status: number

  constructor ({ method, params, status }) {
    super()

    this.name = 'ApiServerError'
    this.message = `Method "${method}" returned status ${status}.`
    this.method = method
    this.params = params
    this.status = status
  }
}