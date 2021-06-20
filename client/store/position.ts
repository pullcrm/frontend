import { normalizeTimetable } from '~/logics/company'

function createState () {
  return {
    positions: [],
    current: null,
    timetable: null
  }
}

const actions = {
  async fetch ({ commit, rootGetters }) {
    const companyId = rootGetters['auth/companyId']

    const position = rootGetters['position/positionsDict'][companyId]

    if (!position) {
      // TODO: Reset tokens or throw error
    }

    commit('SET_CURRENT', position)
  },

  async fetchTimetable ({ commit, rootGetters }) {
    const timetable = await this.$api.timetable.get(
      rootGetters['auth/companyId']
    )

    commit('SET_TIMETABLE', timetable)
  }
}

const mutations = {
  SET_POSITIONS (state, positions) {
    state.positions = positions
  },

  SET_CURRENT (state, position) {
    state.current = position
  },

  SET_TIMETABLE (state, timetable) {
    state.timetable = timetable
  }
}

const getters = {
  hasPositions (state) {
    return state.positions.length > 0
  },

  positionsDict (state) {
    return state.positions.reduce((dict, position) => {
      return {
        ...dict,
        [position.companyId]: position
      }
    }, {} as Record<number, any>)
  },

  role (state) {
    return state.current.role
  },

  currentId (state) {
    return state.current.id
  },

  company (state) {
    return state.current.company
  },

  companyId (state) {
    return state.current.company.id
  },

  normalizeTimetable (state) {
    return normalizeTimetable(state.timetable)
  }
}

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations
}
