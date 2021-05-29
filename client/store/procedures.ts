import { normalizeProcedureParams, normalizeCategories } from '~/logics/procedures'

function createState () {
  return {
    procedures: [],
    categories: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const [procedures, categories] = await Promise.all([
      this.$api.procedures.all(),
      this.$api.categories.all()
    ])

    commit('SET_PROCEDURES', procedures)
    commit('SET_CATEGORIES', categories)
  },

  async updateProcedure ({ dispatch }, procedure) {
    await this.$api.procedures.update(
      procedure.id, normalizeProcedureParams(procedure)
    )

    await dispatch('fetch')
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
  }
}

const getters = {
  total (state) {
    return state.procedures.length
  },

  categories (state) {
    return normalizeCategories(state.categories, state.procedures)
  },

  categoriesDict (state) {
    return state.categories.reduce((acc, category) => {
      return {
        ...acc,
        [category.id]: category
      }
    }, {})
  },

  isEmpty (state) {
    return state.procedures.length === 0
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
