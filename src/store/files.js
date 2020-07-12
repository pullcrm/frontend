function createState () {
  return {}
}

const actions = {
  async fetch (_, file) {
    const formData = new FormData()

    formData.append('file', file)

    return this.$api.files.create(formData)
  }
}

const mutations = {}

const getters = {}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
