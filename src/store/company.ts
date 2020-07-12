function createState () {
  return {}
}

const actions = {}

const mutations = {}

const getters = {
  current (_state, _getters, rootState) {
    return rootState.approaches.current?.company
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
