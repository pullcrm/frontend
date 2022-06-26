import { generateId } from '~/utils/generate-id'

export interface IRpcError {
  code: number
  data: string
  message: string
}

export interface IRpcRequest<M, P> {
  id: number
  method: M
  params: P
  jsonrpc: string
}

export interface IRpcResponse<T = any> {
  id: number
  error?: IRpcError
  result?: T
}

export function createRpcRequest<M, P>(method: M, params: P): IRpcRequest<M, P> {
  return {
    jsonrpc: '2.0',
    id: generateId(),
    method,
    params,
  }
}
