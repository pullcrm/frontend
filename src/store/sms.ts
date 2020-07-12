import { atob } from 'isomorphic-base64'

function createState () {
  return {
    balance: null,
    login: null,
    password: null,
    settings: null
  }
}

const actions = {
  async updateSettings ({ state }) {
    const { beforeTime, remindBeforeTime, remindAfterCreation } = state.settings

    await this.$api.smsc.update({
      beforeTime,
      remindBeforeTime,
      remindAfterCreation
    })
  },

  async balance ({ state, commit }) {
    const { login, password } = state.settings

    const { balance } = await this.$api.smsc.balance({
      login,
      password
    })

    commit('SET_BALANCE', Number(balance))
  },

  async send ({ state }, { phone, message, id, time }) {
    try {
      const { login, password } = state.settings

      await this.$api.smsc.send({
        id,
        time,
        phone,
        login,
        message,
        password
      })

      return true
    } catch {
      return false
    }
  },

  async remove ({ state }, { id, phone }) {
    const { login, password } = state.settings

    return this.$api.smsc.remove({
      id,
      phone,
      login,
      password
    })
  }
}

const mutations = {
  SET_SETTINGS (state, payload) {
    const {
      token,
      beforeTime,
      remindBeforeTime,
      remindAfterCreation
    } = payload

    const [login, password] = atob(token).split(':')

    state.settings = {
      login,
      password,
      beforeTime,
      remindBeforeTime,
      remindAfterCreation
    }
  },

  SET_BALANCE (state, balance) {
    state.balance = balance
  },

  SET_SETTING_BY_KEY (state, { key, value }) {
    state.settings[key] = value
  }
}

const getters = {
  hasSMSAuthorize (state) {
    return state.settings?.login
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
