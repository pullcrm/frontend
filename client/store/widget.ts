// interface IOrder {
//   date?: any
//   startTime?: string
//   procedure?: any
//   specialist?: any
// }

function createState () {
  return {
    order: {},
    company: null,
    procedures: [],
    specialists: []
  }
}

const actions = {
  async fetch ({ commit }, companyId) {
    const [company, procedures, specialists] = await Promise.all([
      this.$api.public.companyById(companyId),
      this.$api.public.proceduresByCompanyId({ companyId }),
      this.$api.public.specialistsByCompanyId({
        sort: 'order',
        order: 'asc',
        companyId
      })
    ])

    commit('SET_COMPANY', company)
    commit('SET_PROCEDURES', procedures)
    commit('SET_SPECIALISTS', specialists)
  }
}

const mutations = {
  SET_COMPANY (state, company) {
    state.company = company
  },

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

const getters = {
  specialistsDict (state) {
    return state.specialists.reduce((dict, item) => {
      return {
        ...dict,
        [item.id]: item
      }
    }, {})
  },

  specialistsById: (_state, localGetters) => (specialistId) => {
    return localGetters.specialistsDict[specialistId]
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
