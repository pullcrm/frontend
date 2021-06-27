import { Module } from 'vuex/types'

import { IState as IRootState } from '.'

const BALANCE_TIMEOUT = 1 * 1000 * 60

export interface IState {
  balance: number | null,
  balancePromise: Promise<any> | null
}

const SmsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      balance: null,
      balancePromise: null
    }
  },

  actions: {
    async balance ({ commit, state }) {
      if (!state.balancePromise) {
        const balancePromise = this.$api.sms.balance()

        commit('SET_BALANCE_PROMISE', balancePromise)

        setTimeout(() => {
          commit('SET_BALANCE_PROMISE', null)
        }, BALANCE_TIMEOUT)
      }

      const { balance } = await state.balancePromise

      commit('SET_BALANCE', Number(balance))
    }
  },

  mutations: {
    SET_BALANCE (state, balance) {
      state.balance = balance
    },

    SET_BALANCE_PROMISE (state, balancePromise) {
      state.balancePromise = balancePromise
    }
  },

  getters: {
    isAuthorize (_state, getters) {
      return Boolean(getters.settings)
    },

    settings (_state, _getters, _rootState, rootGetters) {
      return rootGetters['position/company'].company_setting
    }
  }
}

export default SmsModule
