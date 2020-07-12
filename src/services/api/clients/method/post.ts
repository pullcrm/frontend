import fetch from 'isomorphic-unfetch'

export default function ({ endpoint, method, params, headers, type }) {
  params = JSON.stringify(params)

  return fetch(`${endpoint}${method}`, {
    method: type,
    body: params,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}
