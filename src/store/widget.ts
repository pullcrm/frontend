// interface IOrder {
//   date?: any
//   startTime?: string
//   procedure?: any
//   specialist?: any
// }

function createState () {
  return {
    order: {},
    procedures: [],
    specialists: []
  }
}

const actions = {
  async fetch ({ commit }, companyId) {
    const [procedures, specialists] = await Promise.all([
      this.$api.public.proceduresByCompanyId({ companyId }),
      this.$api.public.specialistsByCompanyId({ companyId })
    ])

    commit('SET_PROCEDURES', procedures)
    commit('SET_SPECIALISTS', specialists)
  }
}

const mutations = {
  SET_PROCEDURES (state, procedures) {
    state.procedures = procedures
  },

  SET_SPECIALISTS (state, specialists) {
    state.specialists = specialists
  },

  SET_ORDER_BY_KEY (state, [key, value]) {
    state.order[key] = value
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
