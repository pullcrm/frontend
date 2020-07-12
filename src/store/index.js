import Vue from 'vue'
import Vuex from 'vuex'

import sms from './sms'
import auth from './auth'
import files from './files'
import popup from './popup'
import toasts from './toasts'
import company from './company'
import profile from './profile'
import calendar from './calendar'
import employee from './employee'
import approaches from './approaches'
import procedures from './procedures'
import appointment from './appointment'
import drugAndDrop from './drug-and-drop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sms,
    auth,
    files,
    popup,
    toasts,
    profile,
    company,
    calendar,
    employee,
    procedures,
    approaches,
    appointment,
    drugAndDrop
  },

  state: {},

  mutations: {},

  actions: {},

  getters: {}
})
