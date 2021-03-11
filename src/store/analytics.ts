function createState () {
  return {
    financeStats: [],
    appointmentsStats: null
  }
}

const actions = {
  async fetchAppointmentsStats ({ commit }, { startDate, endDate }) {
    const result = await this.$api.analytics.calendar({
      startDate,
      endDate
    })

    console.log(result)

    commit('SET_APPOINTMENTS_STATS', result)
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
}

const mutations = {
  SET_APPOINTMENTS_STATS (state, appointmentsStats) {
    state.appointmentsStats = appointmentsStats
  }
}

const getters = {
  appointmentsList (state) {
    return state.appointmentsStats.appointments
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
