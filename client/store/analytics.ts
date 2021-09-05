import { Module } from 'vuex/types'

import { normalizeAppointmentsStats, normalizeAnalyticsStats } from '~/logics/analytics'

import { IState as IRootState } from '.'

export interface IState {
  simpleStats: any | null,
  financeStats: any | null,
  appointmentsStats: any | null
}

const AnalyticsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      simpleStats: null,
      financeStats: null,
      appointmentsStats: null
    }
  },

  actions: {
    async fetchSimpleStats ({ dispatch, commit }, { date }) {
      const [day, month] = await Promise.all([
        dispatch('fetchForDay', date),
        dispatch('fetchForMonth', date)
      ])

      commit('SET_SIMPLE_STATS', {
        dayTotal: day.total,
        monthTotal: month.total,
        monthAverage: month.average
      })
    },

    async fetchAppointmentsStats ({ commit }, { startDate, endDate }) {
      const stats = await this.$api.analytics.calendar({
        startDate,
        endDate
      })

      commit('SET_APPOINTMENTS_STATS', normalizeAppointmentsStats(stats))
    },

    async fetchFinanceStats ({ commit }, { startDate, endDate, specialistId }) {
      const stats = await this.$api.analytics.finance({
        endDate,
        startDate,
        specialistId
      })

      commit('SET_FINANCE_STATS', normalizeAnalyticsStats(stats))
    },

    async fetchForMonth (_, date) {
      const daysInMonth = date.daysInMonth()

      return await this.$api.analytics.simple({
        startDate: date.format('YYYY-MM-01'),
        endDate: date.format(`YYYY-MM-${daysInMonth}`)
      })
    },

    async fetchForDay (_, date) {
      return await this.$api.analytics.simple({
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD')
      })
    }
  },

  mutations: {
    SET_SIMPLE_STATS (state, simpleStats) {
      state.simpleStats = simpleStats
    },

    SET_APPOINTMENTS_STATS (state, appointmentsStats) {
      state.appointmentsStats = appointmentsStats
    },

    SET_FINANCE_STATS (state, financeStats) {
      state.financeStats = financeStats
    }
  },

  getters: {
    appointmentsList (state) {
      return state.appointmentsStats?.appointments
    }
  }
}

export default AnalyticsModule
