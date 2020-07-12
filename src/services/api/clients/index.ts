export interface IRpcClient {
  token?: string

  setAccessToken (token: string): void

  call (method: string, params: object): Promise<any>
}
