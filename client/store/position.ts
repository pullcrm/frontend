function createState () {
  return {
    positions: [],
    current: null
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
  }
}

const mutations = {
  SET_POSITIONS (state, positions) {
    state.positions = positions
  },

  SET_CURRENT (state, position) {
    state.current = position
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
  }
}

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations
}
