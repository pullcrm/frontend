import dayjs from '~/utils/dayjs'
import { getWorkingHours } from '~/utils/time'

import { normalizeTimetable } from '~/logics/company'

function createState () {
  return {
    timetable: null
  }
}

const actions = {
  async fetch ({ commit, rootGetters }) {
    const timetable = await this.$api.timetable.get(
      rootGetters['auth/companyId']
    )

    commit('SET_TIMETABLE', timetable)
  }
}

const mutations = {
  SET_TIMETABLE (state, timetable) {
    state.timetable = timetable
  }
}

const getters = {
  normalizeTimetable (state) {
    return normalizeTimetable(state.timetable)
  },

  timeWork (_state, getters, rootState) {
    const { date } = rootState.schedule
    const day = dayjs(date).locale('en').format('dddd').toLowerCase()

    return getters.normalizeTimetable[day]
  },

  workingHours (_state, getters) {
    const { from, to } = getters.timeWork

    return getWorkingHours(from, to)
  }
}

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations
}
