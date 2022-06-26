import { defineStore } from 'pinia'
import { formatDate } from '~/utils/date-time'

import { normalizeTimeOffs } from '~/logics/time-offs'

export interface IState {
  date: string
  timeOffs: any[]
  isLoading: boolean
}

export const useScheduleStore = defineStore('schedule', {
  state: (): IState => ({
    date: formatDate(new Date(), 'YYYY-MM-DD'),
    timeOffs: [],

    isLoading: false,
  }),
  getters: {
    normalizeTimeOffs: (state) => {
      return normalizeTimeOffs(state.timeOffs)
    },
  },
  actions: {
    async fetch() {
      const appointmentsStore = useAppointmentsStore()

      this.isLoading = true

      this.reset()

      await Promise.all([
        this.fetchTimeOffs(),
        appointmentsStore.fetch(),
        appointmentsStore.fetchQueue(),
      ])

      this.isLoading = false
    },

    async fetchTimeOffs() {
      const timeOffs = await this.$api.timeOff.all({
        date: this.date,
      })

      this.timeOffs = timeOffs
    },

    reset() {
      const appointmentsStore = useAppointmentsStore()

      this.timeOffs = []

      appointmentsStore.appointments = []
    },
  },
})

//   SET_DATE(state, date) {
//     state.date = date
//   },
