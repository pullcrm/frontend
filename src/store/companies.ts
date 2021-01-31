import { normalizeCompanyInfo } from '@/logics/companies'

function createState () {
  return {
    companies: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const companies = await this.$api.profile.companies()

    commit('SET_COMPANIES', companies.map(item => normalizeCompanyInfo(item)))

    return companies
  },

  async selectCompany ({ state, commit, rootGetters, dispatch }) {
    const companyId = rootGetters['auth/companyId']
    const companies = state.companies

    const companyInfo = (
      companyId && companies.find(({ company }) => company.id === companyId
      )) ?? companies[0]

    commit('company/SET_COMPANY_INFO', companyInfo, { root: true })

    await dispatch('auth/fetchCompanyToken', companyInfo, { root: true })
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
