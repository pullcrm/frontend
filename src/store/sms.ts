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
    // TODO: Error
    const { remindBeforeInMinutes, remindBefore, remindAfterCreation } = state.settings

    await this.$api.sms.settingUpdate({
      remindBefore,
      remindAfterCreation,
      remindBeforeInMinutes
    })
  },

  async balance ({ commit }) {
    const { balance } = await this.$api.sms.balance()

    commit('SET_BALANCE', Number(balance))
  }
}

const mutations = {
  SET_SETTINGS (state, payload) {
    const {
      login,
      remindBefore,
      remindAfterCreation,
      remindBeforeInMinutes
    } = payload

    state.settings = {
      login,
      remindBeforeInMinutes: remindBeforeInMinutes,
      remindBefore,
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
