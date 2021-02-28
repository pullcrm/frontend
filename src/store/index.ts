import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import popup from './popup'
import toasts from './toasts'
import widget from './widget'
import company from './company'
import schedule from './schedule'
import companies from './companies'
import analytics from './analytics'
import procedures from './procedures'
import specialists from './specialists'
import drugAndDrop from './drug-and-drop'
import appointments from './appointments'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IState {
  //
}

Vue.use(Vuex)

export default new Vuex.Store<IState>({
  modules: {
    sms,
    auth,
    popup,
    toasts,
    widget,
    company,
    schedule,
    companies,
    analytics,
    procedures,
    specialists,
    drugAndDrop,
    appointments
  },

  state: {},

  actions: {},

  mutations: {},

  getters: {}
})
