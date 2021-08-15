import { Module } from 'vuex/types'

import jwtDecode from 'jwt-decode'

import { IState as IRootState } from '.'

export interface IState {
  accessToken: string | null,
  refreshToken: string | null
}

const ACCESS_TOKEN = 'ACCESS_TOKEN_PULL_CRM'
const REFRESH_TOKEN = 'REFRESH_TOKEN_PULL_CRM'

const AuthModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      accessToken: null,
      refreshToken: null
    }
  },

  actions: {
    async login ({ dispatch }, params) {
      const tokens = await this.$api.auth.login(params)

      await dispatch('saveTokens', tokens)
    },

    async fetchToken ({ commit }) {
      const accessToken = this.$localStorage.getItem(ACCESS_TOKEN)
      const refreshToken = this.$localStorage.getItem(REFRESH_TOKEN)

      if (accessToken && refreshToken) {
        commit('SET_TOKENS', { accessToken, refreshToken })

        this.$apiClient.setToken(accessToken)
      }
    },

    async refreshTokenByPosition ({ state, rootState, dispatch }, position) {
      try {
        const refreshToken = state.refreshToken

        const { role, company } = position

        const result = await this.$api.auth.refreshToken({
          role: role.name,
          userId: rootState.profile.id,
          companyId: company.id,
          refreshToken
        })

        await dispatch('saveTokens', result)
      } catch (err) {
        if (err.status === 403 || err.status === 401) {
          await dispatch('reset')

          location.reload()
        }

        throw err
      }
    },

    async refreshToken ({ state, dispatch }) {
      try {
        const { role, companyId, userId } = jwtDecode(state.accessToken)

        const result = await this.$api.auth.refreshToken({
          role,
          userId,
          companyId,
          refreshToken: state.refreshToken
        })

        await dispatch('saveTokens', result)
      } catch (err) {
        if (err.status === 403 || err.status === 401) {
          // Add `save toast in cookie` method
          // await dispatch('toasts/show', {
          //   type: 'error',
          //   title: 'Время сессии истекло, пожалуйста, авторизуйтесь снова'
          // }, { root: true })

          await dispatch('reset')

          location.reload()
        }

        throw err
      }
    },

    async saveTokens ({ commit }, { accessToken, refreshToken }) {
      this.$localStorage.setItem(ACCESS_TOKEN, accessToken)
      this.$localStorage.setItem(REFRESH_TOKEN, refreshToken)

      this.$apiClient.setToken(accessToken)

      commit('SET_TOKENS', { accessToken, refreshToken })
    },

    reset ({ commit }) {
      this.$localStorage.removeItem(ACCESS_TOKEN)
      this.$localStorage.removeItem(REFRESH_TOKEN)

      commit('SET_TOKENS', { accessToken: null, refreshToken: null })
    },

    async logout ({ dispatch }) {
      // this.$api.auth.logout()

      await dispatch('reset')
    }
  },

  mutations: {
    SET_TOKENS (state, { accessToken, refreshToken }) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    }
  },

  getters: {
    hasToken (state) {
      return Boolean(state.accessToken)
    },

    companyId (state) {
      const { companyId } = jwtDecode(state.accessToken)

      return companyId
    }
  }
}

export default AuthModule
