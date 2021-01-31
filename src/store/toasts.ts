import { generateId } from '@/utils/generate-id'

function createState () {
  return {
    toasts: []
  }
}

const actions = {
  show ({ commit }, { type = 'success', timeout = 5000, ...payload }) {
    if (['success', 'warning', 'info', 'error'].includes(type)) {
      const toast = {
        id: generateId(),
        type,
        props: {
          text: payload.text,
          title: payload.title,
          theme: type,
          timeout
        }
      }

      commit('SHOW', toast)
    }
  },

  close ({ commit }, toastId) {
    commit('CLOSE', toastId)
  }
}

const mutations = {
  SHOW (state, toast) {
    state.toasts = [...state.toasts.splice(0, 2), toast]
  },

  CLOSE (state, toastId) {
    state.toasts = state.toasts.filter((toast) => toast.id !== toastId)
  }
}

const getters = {
  has: (_state, localGetters) => (toastId) => {
    const toast = localGetters.byId(toastId)

    return Boolean(toast)
  },

  byId: (state) => (toastId) => {
    return state.toasts.find((toast) => toast.id === toastId)
  }
}

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations
}
