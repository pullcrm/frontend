function createState () {
  return {
    specialists: []
  }
}

const actions = {
  async fetch ({ commit }) {
    let specialists = await this.$api.specialist.all()

    specialists = specialists.map(item => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`
    }))

    commit('SET_SPECIALISTS', specialists)
  },

  async onUploadAvatar ({ dispatch }, file) {
    if (!file) return

    try {
      const result = await dispatch('files/create', file, { root: true })

      return result
    } catch (err) {
      if (err.status === 400) {
        dispatch('toasts/show', {
          type: 'error',
          title: 'У файла большой размер, к загрузке доступны файлы меньше 500Кб'
        }, { root: true })
      }

      throw err
    }
  }
}

const mutations = {
  SET_SPECIALISTS (state, specialists) {
    state.specialists = specialists
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  mutations
}
