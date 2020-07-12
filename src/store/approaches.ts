import jwtDecode from 'jwt-decode'

function createState () {
  return {
    approaches: [],
    current: null
  }
}

const actions = {
  async fetch ({ commit, dispatch, rootState }) {
    const approaches = await this.$api.approaches.my()

    if (approaches.length === 0) {
      return
    }

    const { companyId } = jwtDecode(rootState.auth.accessToken)

    const current = approaches.find(({ company }) => company.id === companyId) ?? approaches[0]

    commit('SET_CURRENT', current)
    commit('SET_APPROACHES', approaches)

    dispatch('company/save', current.company, { root: true })
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

const getters = {}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
