import jwtDecode from 'jwt-decode'

const ACCESS_TOKEN = 'ACCESS_TOKEN_PULL_CRM'
const REFRESH_TOKEN = 'REFRESH_TOKEN_PULL_CRM'

function createState () {
  return {
    accessToken: null,
    refreshToken: null
  }
}

const actions = {
  async login ({ dispatch }, params) {
    const tokens = await this.$api.auth.login(params)

    await dispatch('saveTokens', tokens)
  },

  async fetchToken ({ commit, dispatch }) {
    try {
      const accessToken = this.$localStorage.getItem(ACCESS_TOKEN)
      const refreshToken = this.$localStorage.getItem(REFRESH_TOKEN)

      if (accessToken && refreshToken) {
        commit('SET_TOKENS', { accessToken, refreshToken })

        this.$apiClient.setAccessToken(accessToken)

        return accessToken
      }
    } catch {
      await dispatch('reset')

      location.reload()
    }
  },

  async fetchCompanyToken ({ state, dispatch }, companyInfo) {
    try {
      const refreshToken = state.refreshToken

      const { role, company, profile } = companyInfo

      const result = await this.$api.auth.refreshToken({
        role: role.name,
        userId: profile.id,
        companyId: company.id,
        refreshToken
      })

      await dispatch('saveTokens', { ...result, refreshToken })
    } catch (err) {
      if (err.status === 403) {
        await dispatch('reset')

        location.reload()
      }

      throw err
    }
  },

  async onRefreshToken ({ state, dispatch }) {
    try {
      const refreshToken = state.refreshToken

      const { role, companyId, userId } = jwtDecode(state.accessToken)

      const result = await this.$api.auth.refreshToken({
        role,
        userId,
        companyId,
        refreshToken
      })

      await dispatch('saveTokens', { ...result, refreshToken })
    } catch (err) {
      if (err.status === 403) {
        await dispatch('reset')

        location.reload()
      }

      throw err
    }
  },

  async saveTokens ({ commit }, { accessToken, refreshToken }) {
    this.$localStorage.setItem(ACCESS_TOKEN, accessToken)
    this.$localStorage.setItem(REFRESH_TOKEN, refreshToken)

    this.$apiClient.setAccessToken(accessToken)

    commit('SET_TOKENS', { accessToken, refreshToken })
  },

  reset ({ commit }) {
    console.log(this.$localStorage)
    this.$localStorage.removeItem(ACCESS_TOKEN)
    this.$localStorage.removeItem(REFRESH_TOKEN)

    commit('SET_TOKENS', { accessToken: null, refreshToken: null })
  },

  async logout ({ dispatch }) {
    // this.$api.auth.logout()

    await dispatch('reset')
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
  },

  companyId (state) {
    const { companyId } = jwtDecode(state.accessToken)

    return companyId
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}