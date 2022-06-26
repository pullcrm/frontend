import { defineStore } from 'pinia'

import { normalizeAnalyticsStats, normalizeAppointmentsStats } from '~/logics/analytics'

export interface IState {
  dates: Date[] | null
  simpleStats: any | null
  financeStats: any | null
  appointmentsStats: any | null
}

export const useAnalyticsStore = defineStore('analytics', {
  state: (): IState => ({
    dates: null,
    simpleStats: null,
    financeStats: null,
    appointmentsStats: null,
  }),
  getters: {
    appointmentsList: (state) => {
      return state.appointmentsStats?.appointments
    },
  },
  actions: {
    async fetchSimpleStats({ date }: any) {
      const [day, month] = await Promise.all([
        this.fetchForDay(date),
        this.fetchForMonth(date),
      ])

      this.simpleStats = {
        dayTotal: day.total,
        monthTotal: month.total,
        monthAverage: month.average,
      }
    },

    async fetchAppointmentsStats({ startDate, endDate }: any) {
      const stats = await this.$api.analytics.calendar({
        startDate,
        endDate,
      })

      this.appointmentsStats = normalizeAppointmentsStats(stats)
    },

    async fetchFinanceStats({ startDate, endDate, specialistId }: any) {
      const stats = await this.$api.analytics.finance({
        endDate,
        startDate,
        specialistId,
      })

      this.financeStats = normalizeAnalyticsStats(stats)
    },

    async fetchForMonth(date: any) {
      const daysInMonth = date.daysInMonth()

      return await this.$api.analytics.simple({
        startDate: date.format('YYYY-MM-01'),
        endDate: date.format(`YYYY-MM-${daysInMonth}`),
      })
    },

    async fetchForDay(date: any) {
      return await this.$api.analytics.simple({
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD'),
      })
    },
  },
})
