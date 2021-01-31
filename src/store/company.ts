function createState () {
  return {
    role: null,
    company: null,
    profile: null
  }
}

const actions = {
  async fetch ({ getters, commit }) {
    const companyId = getters.companyId

    const company = await this.$api.companies.byId(companyId)

    commit('SET_COMPANY', company)
  }
}

const mutations = {
  SET_COMPANY_INFO (state, companyInfo) {
    const { role, company, profile } = companyInfo

    state.role = role
    state.company = company
    state.profile = profile
  },

  SET_COMPANY (state, company) {
    state.company = company
  }
}

const getters = {
  current (state, _getters) {
    return state.company
  },

  companyId (state) {
    return state.company.id
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
