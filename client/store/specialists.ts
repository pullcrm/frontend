function createState () {
  return {
    specialists: []
  }
}

const actions = {
  async fetch ({ commit }) {
    let specialists = await this.$api.specialist.all({
      sort: 'rate',
      order: 'asc'
    })

    specialists = specialists.map(item => ({
      ...item,
      fullName: `${item.user.firstName} ${item.user.lastName}`
    }))

    commit('SET_SPECIALISTS', specialists)
  },

  async onUploadAvatar ({ dispatch }, form) {
    try {
      return await this.$api.files.create(form)
    } catch (err) {
      if (err.status === 400) {
        await dispatch('toasts/show', {
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

const getters = {
  specialistsDict (state) {
    return state.specialists.reduce((dict, item) => {
      return {
        ...dict,
        [item.id]: item
      }
    }, {})
  },

  byId: (_state, localGetters) => (specialistId) => {
    return localGetters.specialistsDict[specialistId]
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
