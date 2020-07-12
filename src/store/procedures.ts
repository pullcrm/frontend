function createState () {
  return {
    procedures: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const procedures = await this._vm.$api.procedures.all()

    commit('SET_PROCEDURES', procedures)
  }
}

const mutations = {
  SET_PROCEDURES (state, procedures) {
    state.procedures = procedures
  }
}

const getters = {
  current (_state, _getters, rootState) {
    return rootState.approaches.current?.company
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
