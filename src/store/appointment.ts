import { normalizeAppointmentParams, creationNotifyMessage, remindNotifyMessage } from '@/logics/appointment'

import { makeRandom } from '@/utils/make-random'
import { subtractTime } from '@/utils/date-time'

function createState () {
  return {}
}

const actions = {
  async create ({ dispatch }, payload) {
    const form = normalizeAppointmentParams(payload)

    const { id } = await this.$api.appointments.create(form)

    await Promise.all([
      payload.smsRemindNotify && dispatch('remindNotify', { ...payload, id }),
      payload.smsCreationNotify && dispatch('creationNotify', payload)
    ])
  },

  async update ({ dispatch }, payload) {
    const {
      id,
      phone,
      smsIdentifier,
      smsRemindNotify
    } = payload

    const form = normalizeAppointmentParams(payload)

    await this.$api.appointments.update(id, form)

    await Promise.all([
      smsIdentifier && dispatch('sms/remove', {
        id: smsIdentifier,
        phone
      }, { root: true }),
      smsIdentifier && this.$api.appointments.sms(id, { smsIdentifier: null }),
      smsRemindNotify && dispatch('remindNotify', { ...payload, id })
    ])
  },

  async creationNotify ({ dispatch }, payload) {
    const { phone } = payload

    const randomId = makeRandom(5)

    const params = {
      id: randomId,
      time: '0',
      phone,
      message: creationNotifyMessage(payload)
    }

    const result = await dispatch('sms/send', params, { root: true })

    if (result) {
      // TODO: Add result toast
    }
  },

  async remindNotify ({ dispatch, rootState }, payload) {
    const { id, phone, startTime, date } = payload

    const { beforeTime } = rootState.sms.settings

    const time = `${date.format('DD.MM.YY')} ${subtractTime(startTime, beforeTime)}`
    const randomId = makeRandom(5)

    const params = {
      id: randomId,
      time,
      phone,
      message: remindNotifyMessage(payload, beforeTime)
    }

    const result = await dispatch('sms/send', params, { root: true })

    if (!result) {
      // TODO: Add result toast
      return
    }

    await this.$api.appointments.sms(id, {
      smsIdentifier: randomId
    })
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
