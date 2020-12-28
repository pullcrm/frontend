import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import files from './files'
import popup from './popup'
import toasts from './toasts'
import company from './company'
import profile from './profile'
import schedule from './schedule'
import employee from './employee'
import approaches from './approaches'
import procedures from './procedures'
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
    profile,
    company,
    schedule,
    employee,
    procedures,
    approaches,
    drugAndDrop,
    appointments
  },

  state: {},

  mutations: {},

  actions: {},

  getters: {}
})
