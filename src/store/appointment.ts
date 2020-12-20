// TODO: Move to popups/Appointment/... and remove file
import { normalizeAppointmentParams } from '@/logics/appointment'

function createState () {
  return {}
}

const actions = {
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

const mutations = {}

const getters = {}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
