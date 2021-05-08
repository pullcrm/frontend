import { Module } from 'vuex/types'

import { normalizeAppointmentParams } from '~/logics/appointment'

import { IState as IRootState } from '.'

export interface IState {
  queue: any[],
  appointments: any[]
}

const AppointmentsModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      queue: [],
      appointments: []
    }
  },

  actions: {
    async fetch ({ rootState, commit }) {
      const appointments = await this.$api.appointments.all({
        date: rootState.schedule.date
      })

      commit('SET_APPOINTMENTS', appointments)
    },

    async fetchQueue ({ commit }) {
      const queue = await this.$api.appointments.queue()

      commit('SET_QUEUE', queue)
    },

    async create (_, payload) {
      const form = normalizeAppointmentParams(payload)

      await this.$api.appointments.create(form)
    },

    async update (_, payload) {
      const { id } = payload

      const form = normalizeAppointmentParams(payload)

      await this.$api.appointments.update(id, form)
    }
  },

  mutations: {
    SET_APPOINTMENTS (state, appointments) {
      // TODO: Fix startTime on api
      state.appointments = appointments.map(item => ({
        ...item,
        startTime: item.startTime.slice(0, 5)
      }))
    },

    SET_QUEUE (state, queue) {
      // TODO: Fix startTime on api
      state.queue = queue.map(item => ({
        ...item,
        startTime: item.startTime?.slice(0, 5) ?? null
      }))
    }
  },

  getters: {
    appointmentsDict (state) {
      return state.appointments.reduce((dict, appointment) => {
        return {
          ...dict,
          [appointment.id]: appointment
        }
      }, {} as Record<number, any>)
    },

    appointmentById: (_state, localGetters) => (appointmentId: number) => {
      return localGetters.appointmentsDict[appointmentId]
    }
  }
}

export default AppointmentsModule
