import { defineStore } from 'pinia'

export interface IState {
  balance: number | null
}

export const useSmsStore = defineStore('sms', {
  state: (): IState => ({
    balance: null,
  }),
  getters: {
    isAuthorize() {
      return Boolean(this.settings)
    },

    settings: () => {
      const positionStore = usePositionStore()

      return positionStore.company.sms_setting
    },
  },
  actions: {
    async fetchBalance() {
      const { balance } = await this.$api.balance.get()

      this.balance = Number(balance)
    },
  },
})
