function createState () {
  return {
    balance: null
  }
}

const actions = {
  async balance ({ commit }) {
    const { balance } = await this.$api.sms.balance()

    commit('SET_BALANCE', Number(balance))
  }
}

const mutations = {
  SET_BALANCE (state, balance) {
    state.balance = balance
  }
}

const getters = {
  hasSmsAuthorize (_state, getters) {
    return Boolean(getters.settings)
  },

  settings (_state, _getters, rootState) {
    return rootState.company.company.sms_configuration
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
