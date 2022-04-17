import { Module } from 'vuex/types'

import { IState as IRootState } from '.'

export interface IState {
  balance: number | null
}

const SmsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      balance: null
    }
  },

  actions: {
    async balance ({ commit }) {
      const { balance } = await this.$api.balance.get()

      commit('SET_BALANCE', Number(balance))
    }
  },

  mutations: {
    SET_BALANCE (state, balance) {
      state.balance = balance
    }
  },

  getters: {
    isAuthorize (_state, getters) {
      return Boolean(getters.settings)
    },

    settings (_state, _getters, _rootState, rootGetters) {
      return rootGetters['position/company'].sms_setting
    }
  }
}

export default SmsModule
