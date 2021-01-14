import { copyObject } from '@/utils/object'

function createState () {
  return {
    activeName: null,
    activeProps: null,
    question: null,

    smsConfirmation: null
  }
}

const actions = {
  show ({ commit }, arg) {
    if (typeof arg === 'object') {
      const { name, props } = arg

      commit('SHOW', { name, props: copyObject(props) })
    }

    if (typeof arg === 'string') {
      commit('SHOW', { name: arg })
    }
  },

  hide ({ commit }) {
    commit('HIDE')
  },

  smsConfirmation ({ commit }, { title, subTitle, submit }) {
    return new Promise((resolve) => {
      commit('SET_SMS_CONFIRMATION', { title, subTitle, submit, resolve })
    })
  },

  smsConfirmed ({ state, commit }, result) {
    if (!state.smsConfirmation) throw new Error('SMS confirmation was not found')

    state.smsConfirmation.resolve(result)

    commit('SET_SMS_CONFIRMATION', null)
  },

  askQuestion ({ commit }, question) {
    return new Promise((resolve) => {
      commit('SET_QUESTION', { ...question, resolve })
    })
  },

  answerQuestion ({ commit, state }, answer) {
    if (!state.question) throw new Error('Question was not found')

    state.question.resolve(answer)

    commit('SET_QUESTION', null)
  }
}

const mutations = {
  SHOW (state, { name, props }) {
    state.activeName = name
    state.activeProps = props
  },

  HIDE (state) {
    state.activeName = null
    state.activeProps = null
  },

  SET_QUESTION (state, question) {
    state.question = question
  },

  SET_SMS_CONFIRMATION (state, params) {
    state.smsConfirmation = params
  }
}

const getters = {
  isVisible (state) {
    return (name) => {
      return state.activeName === name
    }
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  mutations,
  getters
}
