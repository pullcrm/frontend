import { SPECIALIST } from '~/constants/roles'

import { normalizeSpecialists } from '~/logics/specialist'

function createState () {
  return {
    specialists: []
  }
}

const actions = {
  // TODO: Refactor
  async fetch ({ commit, rootGetters }) {
    let specialists = []

    const { name: role } = rootGetters['position/role']

    if (role === SPECIALIST) {
      const specialist = await this.$api.specialist.get(
        rootGetters['position/currentId']
      )

      specialists = [specialist]
    } else {
      specialists = await this.$api.specialist.all({
        sort: 'order',
        order: 'asc'
      })
    }

    commit('SET_SPECIALISTS', normalizeSpecialists(specialists))
  },

  async onUploadAvatar ({ dispatch }, form) {
    try {
      return await this.$apiClient.upload(form)
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

  total (state) {
    return state.specialists.length
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
