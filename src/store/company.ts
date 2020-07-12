function createState () {
  return {
    company: null
  }
}

const actions = {
  async fetch ({ state, dispatch }) {
    const company = await this.$api.companies.byId(state.company.id)

    dispatch('save', company)
  },

  save ({ commit }, company) {
    commit('SET_COMPANY', company)

    if (company.sms_configuration) {
      commit('sms/SET_SETTINGS', company.sms_configuration, { root: true })
    }
  }
}

const mutations = {
  SET_COMPANY (state, company) {
    state.company = company
  }
}

const getters = {
  current (state) {
    return state.company
  },

  id (state) {
    return state.company?.id
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
