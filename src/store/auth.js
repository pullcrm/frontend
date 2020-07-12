import storage from '@/utils/data-storage'

const ACCESS_TOKEN = 'ACCESS_TOKEN_PULL_CRM'
const REFRESH_TOKEN = 'REFRESH_TOKEN_PULL_CRM'

function createState () {
  return {
    accessToken: null,
    refreshToken: null
  }
}

const actions = {
  async fetchToken ({ commit, dispatch }) {
    try {
      const accessToken = storage.getItem(ACCESS_TOKEN)
      const refreshToken = storage.getItem(REFRESH_TOKEN)

      if (accessToken && refreshToken) {
        commit('SET_TOKENS', { accessToken, refreshToken })

        this._vm.$apiClient.setAccessToken(accessToken)

        await dispatch('profile/fetch', null, { root: true })

        return accessToken
      }
    } catch {
      dispatch('reset')

      location.reload()
    }
  },

  async saveTokens ({ commit }, { accessToken, refreshToken }) {
    storage.removeItem(ACCESS_TOKEN)
    storage.removeItem(REFRESH_TOKEN)

    storage.setItem(ACCESS_TOKEN, accessToken)
    storage.setItem(REFRESH_TOKEN, refreshToken)

    this._vm.$apiClient.setAccessToken(accessToken)

    commit('SET_TOKENS', { accessToken, refreshToken })
  },

  async fetchRefreshToken ({ state, dispatch, rootGetters }) {
    const { refreshToken } = state

    if (!refreshToken) return

    const { id } = rootGetters['company/current']
    const { name } = rootGetters['profile/role']

    const result = await this._vm.$api.auth.refreshToken({ refreshToken, companyId: id, role: name })

    dispatch('saveTokens', { ...result, refreshToken })
  },

  async login ({ dispatch }, params) {
    const tokens = await this._vm.$api.auth.login(params)

    dispatch('saveTokens', tokens)
  },

  reset ({ commit }) {
    storage.removeItem(ACCESS_TOKEN)
    storage.removeItem(REFRESH_TOKEN)

    commit('SET_TOKENS', { accessToken: null, refreshToken: null })
  },

  logout ({ dispatch }) {
    // this._vm.$api.auth.logout()

    dispatch('reset')

    location.reload()
  }
}

const mutations = {
  SET_TOKENS (state, { accessToken, refreshToken }) {
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  }
}

const getters = {
  hasToken (state) {
    return Boolean(state.accessToken)
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
