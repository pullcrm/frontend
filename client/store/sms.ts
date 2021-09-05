import { Module } from 'vuex/types'

import { IState as IRootState } from '.'

export interface IState {
  balance: number | null,
  hasSmsError: boolean
}

const SmsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      balance: null,
      hasSmsError: false
    }
  },

  actions: {
    async balance ({ commit }) {
      try {
        const { balance } = await this.$api.sms.balance()

        commit('SET_BALANCE', Number(balance))
      } catch (err) {
        if (err.status === 500) {
          return commit('SET_HAS_SMS_ERROR', true)
        }

        throw err
      }
    }
  },

  mutations: {
    SET_BALANCE (state, balance) {
      state.balance = balance
    },

    SET_HAS_SMS_ERROR (state, hasSmsError) {
      state.hasSmsError = hasSmsError
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
