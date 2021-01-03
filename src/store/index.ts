import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import files from './files'
import popup from './popup'
import toasts from './toasts'
import widget from './widget'
import company from './company'
import profile from './profile'
import schedule from './schedule'
import approaches from './approaches'
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
    files,
    popup,
    toasts,
    widget,
    profile,
    company,
    schedule,
    procedures,
    approaches,
    specialists,
    drugAndDrop,
    appointments
  },

  state: {},

  mutations: {},

  actions: {},

  getters: {}
})
