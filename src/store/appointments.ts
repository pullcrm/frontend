import { normalizeAppointmentParams } from '@/logics/appointment'

function createState () {
  return {
    queue: [],
    appointments: []
  }
}

const actions = {
  async fetchAppointments ({ rootState, commit }) {
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
}

const mutations = {
  SET_APPOINTMENTS (state, appointments) {
    state.appointments = appointments.map(item => ({
      ...item,
      startTime: item.startTime.slice(0, 5)
    }))
  },

  SET_QUEUE (state, queue) {
    state.queue = queue.map(item => ({
      ...item,
      startTime: item.startTime?.slice(0, 5) ?? null
    }))
  }
}

const getters = {
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

export default {
  namespaced: true,
  state: createState,
  actions,
  mutations,
  getters
}
