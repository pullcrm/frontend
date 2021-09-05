import * as cookie from 'cookie'

interface IGetCookieOptions {
  json?: boolean
}

export function getCookie (cookies: string, name: string, options: IGetCookieOptions = {}) {
  if (!cookies) return null

  const { json } = options
  const parsedCookie = cookie.parse(cookies)[name]

  if (json) {
    try {
      return JSON.parse(parsedCookie)
    } catch (err) {
      if (err instanceof SyntaxError) return null

      throw err
    }
  }

  return parsedCookie || null
}

interface ISetCookieOptions {
  days?: number,
  path?: string,
  domain?: string
}

export function setCookie (name: string, value: string, options: ISetCookieOptions = {}) {
  const { days, path = '/', domain } = options

  return cookie.serialize(name, value, {
    path,
    domain,
    maxAge: days ? 60 * 60 * 24 * days : null
  })
}

interface IRemoveCookieOptions {
  domain?: string
}

export function removeCookie (name: string, options: IRemoveCookieOptions = {}) {
  const { domain } = options

  return setCookie(name, '', {
    domain,
    days: 0
  })
}
