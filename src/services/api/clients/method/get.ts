import fetch from 'isomorphic-unfetch'

export default function ({ endpoint, method, params, headers }) {
  let query = ''

  if (params) {
    query = '?' + Object.keys(params)
      .filter(key => params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&')
  }

  return fetch(`${endpoint}${method}${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}
