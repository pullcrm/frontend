import { defineStore } from 'pinia'

export interface IState {
  loading: boolean
  profile: any | null
}

export const useBaseStore = defineStore('base', {
  state: (): IState => ({
    loading: false,
    profile: null,
  }),
  actions: {
    async fetchProfile() {
      const positionStore = usePositionStore()

      const { specialists: positions, ...profile } = await this.$api.profile.get()

      this.profile = profile

      positionStore.positions = positions
    },
  },
})
