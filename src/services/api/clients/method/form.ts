import fetch from 'isomorphic-unfetch'

export default function ({ endpoint, method, params, headers }) {
  return fetch(`${endpoint}${method}`, {
    method: 'POST',
    body: params,
    headers
  })
}
