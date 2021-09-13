import { formatDate } from '~/utils/date-time'

import { normalizeTimeOffs } from '~/logics/time-offs'

function createState () {
  return {
    date: formatDate(new Date(), 'YYYY-MM-DD'),
    timeOffs: [],

    isLoading: false
  }
}

const actions = {
  async fetch ({ dispatch, commit }) {
    commit('SET_LOADING', true)

    dispatch('reset')

    await Promise.all([
      dispatch('fetchTimeOffs'),
      dispatch('appointments/fetch', null, { root: true }),
      dispatch('appointments/fetchQueue', null, { root: true })
    ])

    commit('SET_LOADING', false)
  },

  async fetchTimeOffs ({ state, commit }) {
    const timeOffs = await this.$api.timeOff.all({
      date: state.date
    })

    commit('SET_TIME_OFFS', timeOffs)
  },

  reset ({ commit }) {
    commit('SET_TIME_OFFS', [])
    commit('appointments/SET_APPOINTMENTS', [], { root: true })
  }
}

const mutations = {
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
  normalizeTimeOffs (state) {
    return normalizeTimeOffs(state.timeOffs)
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
