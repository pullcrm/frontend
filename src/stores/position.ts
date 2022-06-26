import { defineStore } from 'pinia'
import { normalizeCompany } from '~/logics/company'

export interface IState {
  positions: any[]
  current: any
}

export const usePositionStore = defineStore('position', {
  state: (): IState => ({
    positions: [],
    current: null,
  }),
  getters: {
    hasPositions: (state) => {
      return state.positions.length > 0
    },

    positionsDict: (state) => {
      return state.positions.reduce((dict, position) => {
        return {
          ...dict,
          [position.companyId]: position,
        }
      }, {} as Record<number, any>)
    },

    role: (state) => {
      return state.current.role
    },

    currentId: (state) => {
      return state.current.id
    },

    company: (state) => {
      return normalizeCompany(state.current.company)
    },

    companyId: (state) => {
      return state.current.company.id
    },

    widgetSettings() {
      return this.company.widget_setting
    },
  },
  actions: {
    async fetch() {
      const authStore = useAuthStore()

      const position = this.positionsDict[authStore.companyId]

      if (!position) {
        await authStore.reset()

        window.location.reload()
      }

      this.current = position
    },
  },
})
