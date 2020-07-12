import { formatDate } from '@/utils/date-time'

import { WORKING_HOURS } from '@/constants/generated'
import { normalizeTimeOffs } from '@/logics/time-offs'

function createState () {
  return {
    date: formatDate(new Date(), 'YYYY-MM-DD'),
    queue: [],
    timeOffs: [],
    appointments: [],

    isLoad: false
  }
}

const actions = {
  async fetch ({ dispatch, commit }) {
    commit('SET_LOAD', true)

    await Promise.all([
      dispatch('fetchQueue'),
      dispatch('fetchTimeOffs'),
      dispatch('fetchAppointments')
    ])

    commit('SET_LOAD', false)
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

  SET_LOAD (state, load) {
    state.isLoad = load
  }
}

const getters = {
  gridTiles (_state, _localGetters, rootState) {
    return rootState.employee.specialists.reduce((result, { id }) => {
      return [...result, ...WORKING_HOURS.map(time => ({
        employeeId: id,
        time: time
      }))]
    }, [])
  },

  normalizeTimeOffs (state) {
    return normalizeTimeOffs(state.timeOffs)
  },

  appointmentById (state) {
    return (id) => {
      return state.appointments.find(item => item.id === id)
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
