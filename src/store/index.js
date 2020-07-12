import api from '@/api'

import auth from './auth'
import profile from './profile'
import calendar from './calendar'
import employee from './employee'
import company from './company'
import approaches from './approaches'
import procedures from './procedures'

import { hours, timesOff } from '@/data'

import { slugFromTime, getFromToList } from '@/utils/time.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    company,
    calendar,
    employee,
    procedures,
    approaches
  },

  state: {
    staffs: [],
    appointments: [],
    timesOff: []
  },

  mutations: {
    SET_STAFFS (state, staffs) {
      state.staffs = staffs
    },

    SET_APPOINTMENTS (state, appointments) {
      state.appointments = appointments
    },

    SET_TIMES_OFF (state, times) {
      state.timesOff = times.map(time => ({ ...time, staff: state.staffs.find(staff => staff.id === time.staffId) }))
    }
  },

  actions: {
    async fetch ({ commit, dispatch }) {
      const [staffs, appointments] = await Promise.all([
        dispatch('fetchStaffs'),
        dispatch('fetchAppointments')
      ])

      const appointmentsMap = appointments.data.map(appnt => {
        return {
          ...appnt,
          times: getFromToList({ from: slugFromTime(appnt.time_start), to: slugFromTime(appnt.time_end), hours }),
          timeStartSlug: slugFromTime(appnt.time_start),
          timeEndSlug: slugFromTime(appnt.time_end)
        }
      })

      commit('SET_STAFFS', staffs.data)
      commit('SET_APPOINTMENTS', appointmentsMap)
      commit('SET_TIMES_OFF', timesOff)
    },

    fetchStaffs () {
      return api.getItems('stafs', {
        fields: '*.*'
      })
    },

    fetchAppointments () {
      return api.getItems('appointments', {
        fields: '*.*'
      })
    }
  },

  getters: {
    hours () {
      return hours.map(hour => slugFromTime(hour))
    },

    tiles (state, localGetters) {
      return state.staffs.reduce((result, { slug }) => {
        return [...result, ...localGetters.hours.map(hour => ({
          row: slug,
          column: hour
        }))]
      }, [])
    },

    employee (state) {
      return state.staffs.map(({ name, avatar, id }) => ({
        id,
        firstName: name,
        lastName: name,
        phone: '0660646333',
        avatar: avatar?.data?.full_url ?? null
      }))
    }
  }
})
