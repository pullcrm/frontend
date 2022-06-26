import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import { AUTH_TOKEN_COOKIE_DAYS } from '~/constants'

const ACCESS_TOKEN = 'ACCESS_TOKEN_PULL_CRM'
const REFRESH_TOKEN = 'REFRESH_TOKEN_PULL_CRM'

export interface IState {
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({
    accessToken: null,
    refreshToken: null,
  }),
  getters: {
    hasToken: (state) => {
      return Boolean(state.accessToken)
    },

    companyId: (state) => {
      const { companyId } = jwtDecode(state.accessToken as string) as any

      return companyId
    },
  },
  actions: {
    async login(params: any) {
      const tokens = await this.$api.auth.login(params)

      await this.saveTokens(tokens)
    },

    async saveTokens({ accessToken, refreshToken }: any) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      this.$cookies.set(ACCESS_TOKEN, accessToken, {
        path: '/',
        expires: AUTH_TOKEN_COOKIE_DAYS,
      })

      this.$cookies.set(REFRESH_TOKEN, refreshToken, {
        path: '/',
        expires: AUTH_TOKEN_COOKIE_DAYS,
      })

      this.$apiClient.setToken(accessToken)
    },

    async authorize() {
      if (this.accessToken)
        this.$apiClient.setToken(this.accessToken)
    },

    async refreshTokenByPosition(position: any) {
      const baseStore = useBaseStore()

      try {
        const refreshToken = this.refreshToken

        const { role, company } = position

        const result = await this.$api.auth.refreshToken({
          role: role.name,
          userId: baseStore.profile.id,
          companyId: company.id,
          refreshToken,
        })

        await this.saveTokens(result)
      }
      catch (err: any) {
        if (err.status === 403 || err.status === 401) {
          await this.reset()

          location.reload()
        }

        throw err
      }
    },

    async onRefreshToken() {
      try {
        const { role, companyId, userId } = jwtDecode(this.accessToken as string) as any

        const result = await this.$api.auth.refreshToken({
          role,
          userId,
          companyId,
          refreshToken: this.refreshToken,
        })

        this.saveTokens(result)
      }
      catch (err: any) {
        if (err.status === 403 || err.status === 401) {
          // Add `save toast in cookie` method
          // await dispatch('toasts/show', {
          //   type: 'error',
          //   title: 'Время сессии истекло, пожалуйста, авторизуйтесь снова'
          // }, { root: true })

          await this.reset()

          location.reload()
        }

        throw err
      }
    },

    reset() {
      this.$cookies.remove(ACCESS_TOKEN)
      this.$cookies.remove(REFRESH_TOKEN)

      this.accessToken = null
      this.refreshToken = null
    },

    async logout() {
      // this.$api.auth.logout()

      this.reset()
    },
  },
})
