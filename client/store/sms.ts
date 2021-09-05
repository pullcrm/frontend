import { Module } from 'vuex/types'

import { IState as IRootState } from '.'

const BALANCE_TIMEOUT = 1 * 1000 * 60 * 5

export interface IState {
  balance: number | null,
  balancePromise: Promise<any> | null,
  hasSmsError: boolean
}

const SmsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      balance: null,
      balancePromise: null,
      hasSmsError: false
    }
  },

  actions: {
    async balance ({ commit, state }) {
      try {
        if (!state.balancePromise) {
          const balancePromise = this.$api.sms.balance()

          if (process.client) {
            commit('SET_BALANCE_PROMISE', balancePromise)

            setTimeout(() => {
              commit('SET_BALANCE_PROMISE', null)
            }, BALANCE_TIMEOUT)
          }
        }

        const { balance } = await state.balancePromise

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

    SET_BALANCE_PROMISE (state, balancePromise) {
      state.balancePromise = balancePromise
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
