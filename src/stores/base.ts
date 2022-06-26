import { defineStore } from 'pinia'

export interface IState {
  loading: boolean
  profile: any | null
  isSiteLoaded: boolean
  companyTypes: any[]
  cities: any[]
}

export const useBaseStore = defineStore('base', {
  state: (): IState => ({
    loading: false,
    profile: null,
    isSiteLoaded: false,
    companyTypes: [],
    cities: [],
  }),
  getters: {
    // doubleCount: state => state.counter * 2,
  },
  actions: {
    async fetchProfile() {
      const positionStore = usePositionStore()

      const { specialists: positions, ...profile } = await this.$api.profile.get()

      this.profile = profile

      positionStore.positions = positions
    },

    async fetchCompanyTypes() {
      const companyTypes = await this.$api.companyTypes.all()

      this.companyTypes = companyTypes
    },

    async fetchCities() {
      const cities = await this.$api.cities.all()

      this.cities = cities
    },
  },
})
