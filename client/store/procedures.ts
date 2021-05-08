function createState () {
  return {
    procedures: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const procedures = await this.$api.procedures.all()

    commit('SET_PROCEDURES', procedures)
  }
}

const mutations = {
  SET_PROCEDURES (state, procedures) {
    state.procedures = procedures
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  mutations
}