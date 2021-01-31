const actions = {
  async create (_, file) {
    const formData = new FormData()

    formData.append('file', file)

    return await this.$api.files.create(formData)
  }
}

export default {
  namespaced: true,
  actions
}
