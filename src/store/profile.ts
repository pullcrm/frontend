function createState () {
  return {
    profile: null
  }
}

const actions = {
  async fetch ({ commit }) {
    const profile = await this._vm.$api.users.profile()

    commit('SET_PROFILE', profile)
  }
}

const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
  }
}

const getters = {
  role (_state, _getters, _rootState, rootGetters) {
    return rootGetters['approaches/current']?.role
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
