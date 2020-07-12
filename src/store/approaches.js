import jwtDecode from 'jwt-decode'

function createState () {
  return {
    approaches: [],
    current: null
  }
}

const actions = {
  async fetch ({ commit, rootState }) {
    const approaches = await this._vm.$api.approaches.my()

    const { companyId } = jwtDecode(rootState.auth.accessToken)
    const current = approaches.find(({ company }) => company.id === companyId)

    if (current) {
      commit('SET_CURRENT', current)
    } else {
      commit('SET_CURRENT', approaches[0])
    }

    commit('SET_APPROACHES', approaches)
  }
}

const mutations = {
  SET_APPROACHES (state, approaches) {
    state.approaches = approaches
  },

  SET_CURRENT (state, approach) {
    state.current = approach
  }
}

const getters = {
  current (state) {
    return state.current ?? state.approaches[0]
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
