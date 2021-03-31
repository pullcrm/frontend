import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import popup from './popup'
import toasts from './toasts'
import widget from './widget'
import schedule from './schedule'
import position from './position'
import analytics from './analytics'
import procedures from './procedures'
import specialists from './specialists'
import drugAndDrop from './drug-and-drop'
import appointments from './appointments'

export interface IState {
  profile: any | null
}

Vue.use(Vuex)

export default new Vuex.Store<IState>({
  modules: {
    sms,
    auth,
    popup,
    toasts,
    widget,
    schedule,
    position,
    analytics,
    procedures,
    specialists,
    drugAndDrop,
    appointments
  },

  state: {
    profile: null
  },

  actions: {
    async profile ({ dispatch, commit }) {
      try {
        const { specialists: positions, ...profile } = await this.$api.profile.get()

        commit('SET_PROFILE', profile)
        commit('position/SET_POSITIONS', positions, { root: true })
      } catch (err) {
        if (err.code) {
          await dispatch('auth/reset', null, { root: true })

          location.reload()
        }

        throw err
      }
    }
  },

  mutations: {
    SET_PROFILE (state, profile) {
      state.profile = profile
    }
  },

  getters: {}
})
