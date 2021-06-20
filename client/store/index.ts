import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import popup from './popup'
import toasts from './toasts'
import widget from './widget'
import location, { IState as ILocationState } from './location'
import schedule from './schedule'
import position from './position'
import analytics from './analytics'
import procedures from './procedures'
import specialists from './specialists'
import drugAndDrop from './drug-and-drop'
import appointments from './appointments'

export interface IModules {
  location: ILocationState,
  // FIXME: Get rid of the any type
  sms: any,
  auth: any,
  popup: any,
  toasts: any,
  widget: any,
  schedule: any,
  position: any,
  analytics: any,
  procedures: any,
  specialists: any,
  drugAndDrop: any,
  appointments: any
}

export interface IState extends IModules {
  loading: boolean,
  profile: any | null,
  isSiteLoaded: boolean
}

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store<IState>({
    // @ts-ignore
    state: {
      loading: false,
      profile: null,
      isSiteLoaded: false
    },

    actions: {
      async profile ({ dispatch, commit }) {
        try {
          const { specialists: positions, ...profile } = await this.$api.profile.get()

          commit('SET_PROFILE', profile)
          commit('position/SET_POSITIONS', positions, { root: true })
        } catch (err) {
          if (err.status === 401) {
            await dispatch('auth/reset', null, { root: true })

            window.location.reload()
          }

          throw err
        }
      }
    },

    mutations: {
      SET_PROFILE (state, profile) {
        state.profile = profile
      },

      SITE_LOADED (state) {
        state.isSiteLoaded = true
      },

      SET_LOADING (state, loading) {
        state.loading = loading
      }
    },

    getters: {},

    modules: {
      sms,
      auth,
      popup,
      toasts,
      widget,
      location,
      schedule,
      position,
      analytics,
      procedures,
      specialists,
      drugAndDrop,
      appointments
    }
  })
}

export default store
