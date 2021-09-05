import { Plugin } from '@nuxt/types'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'

import { getCookie } from '~/utils/cookies'

const authPlugin: Plugin = async ({ req, typedStore }) => {
  if (process.server) {
    const cookies = req.headers.cookie

    const accessToken = getCookie(cookies, ACCESS_TOKEN)
    const refreshToken = getCookie(cookies, REFRESH_TOKEN)

    typedStore.commit('auth/SET_TOKENS', { accessToken, refreshToken })
  }

  typedStore.dispatch('auth/authorize')
}

export default authPlugin
