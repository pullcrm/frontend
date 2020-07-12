import fetch from 'isomorphic-unfetch'

export default function ({ endpoint, method, params, headers }) {
  console.log(headers)
  return fetch(`${endpoint}${method}`, {
    method: "GET",
    body: params,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}
