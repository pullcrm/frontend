import { formatDate } from '@/utils/date-time'

import { normalizeTimeOffs, isCloseDay } from '@/logics/time-offs'

function createState () {
  return {
    date: formatDate(new Date(), 'YYYY-MM-DD'),
    queue: [],
    timeOffs: [],
    appointments: [],

    isLoading: false
  }
}

const actions = {
  async fetch ({ dispatch, commit }) {
    commit('SET_LOADING', true)

    await Promise.all([
      dispatch('fetchQueue'),
      dispatch('fetchTimeOffs'),
      dispatch('fetchAppointments')
    ])

    commit('SET_LOADING', false)
  },

  async fetchAppointments ({ state, commit }) {
    const appointments = await this.$api.appointments.all({
      date: state.date
    })

    commit('SET_APPOINTMENTS', appointments)
  },

  async fetchQueue ({ commit }) {
    const queue = await this.$api.appointments.queue()

    commit('SET_QUEUE', queue)
  },

  async fetchTimeOffs ({ state, commit }) {
    const timeOffs = await this.$api.timeOff.all({
      date: state.date
    })

    commit('SET_TIME_OFFS', timeOffs)
  }
}

const mutations = {
  SET_APPOINTMENTS (state, appointments) {
    state.appointments = appointments.map(item => ({
      ...item,
      startTime: item.startTime.slice(0, 5)
    }))
  },

  SET_QUEUE (state, queue) {
    state.queue = queue.map(item => ({
      ...item,
      startTime: item.startTime?.slice(0, 5) ?? null
    }))
  },

  SET_TIME_OFFS (state, timeOffs) {
    state.timeOffs = timeOffs
  },

  SET_DATE (state, date) {
    state.date = date
  },

  SET_LOADING (state, loading) {
    state.isLoading = loading
  }
}

const getters = {
  appointmentsDict (state) {
    return state.appointments.reduce((dict, appointment) => {
      return {
        ...dict,
        [appointment.id]: appointment
      }
    }, {} as Record<number, any>)
  },

  appointmentById: (_state, localGetters) => (appointmentId: number) => {
    return localGetters.appointmentsDict[appointmentId]
  },

  normalizeTimeOffs (state) {
    return normalizeTimeOffs(state.timeOffs)
  },

  isClosedDay (state) {
    return (specialistId) => {
      return state.timeOffs.some(timeOff => {
        return isCloseDay(timeOff) && timeOff.employeeId === specialistId
      })
    }
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
