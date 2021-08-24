import { normalizeProcedureParams, groupByCategory } from '~/logics/procedures'

function createState () {
  return {
    procedures: [],
    categories: [],

    grouped: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const [procedures, categories] = await Promise.all([
      this.$api.procedures.all({
        limit: 50,
        sort: 'order',
        order: 'asc'
      }),
      this.$api.categories.all()
    ])

    commit('SET_PROCEDURES', procedures)
    commit('SET_CATEGORIES', categories)

    commit(
      'SET_GROUPED', groupByCategory(procedures, categories)
    )
  },

  async updateProcedure (_, procedure) {
    return await this.$api.procedures.update(
      procedure.id, normalizeProcedureParams(procedure)
    )
  },

  async createProcedure ({ dispatch }, procedure) {
    await this.$api.procedures.create(
      normalizeProcedureParams(procedure)
    )

    await dispatch('fetch')
  }
}

const mutations = {
  SET_PROCEDURES (state, procedures) {
    state.procedures = procedures ?? []
  },

  SET_CATEGORIES (state, categories) {
    state.categories = categories ?? []
  },

  SET_GROUPED (state, grouped) {
    state.grouped = grouped
  },

  SET_GROUPED_BY_INDEX (state, { procedures, index }) {
    const group = {
      ...state.grouped[index],
      procedures
    }

    state.grouped.splice(index, 1, group)
  }
}

const getters = {
  total (state) {
    return state.grouped.reduce((acc, { procedures }) => acc + procedures.length, 0)
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
