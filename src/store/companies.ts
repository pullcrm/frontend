import { normalizeCompanyInfo } from '@/logics/companies'

function createState () {
  return {
    companies: [],
  }
}

const actions = {
  async fetch ({ dispatch }) {
    const companies = await this.$api.profile.companies()

    if (companies.length === 0) {
      return
    }

    await dispatch('save', companies.map(item => normalizeCompanyInfo(item)))
  },

  async save ({ commit, rootGetters }, companies) {
    const companyId = rootGetters['auth/companyId']

    let companyInfo = companies[0]

    if (companyId) {
      companyInfo = companies.find(({ company }) => company.id === companyId)
    }

    commit('SET_COMPANIES', companies)
    commit('company/SET_COMPANY_INFO', companyInfo, { root: true })
  }
}

const mutations = {
  SET_COMPANIES (state, companies) {
    state.companies = companies
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  mutations
}
