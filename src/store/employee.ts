function createState () {
  return {
    employee: []
  }
}

const actions = {
  async fetch ({ commit }) {
    const employee = await this._vm.$api.employee.all()

    commit('SET_EMPLOYEE', employee)
  }
}

const mutations = {
  SET_EMPLOYEE (state, employee) {
    state.employee = employee
  }
}

const getters = {
  //
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
