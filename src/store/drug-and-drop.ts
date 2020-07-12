import { getDurationFromTo } from '@/utils/time'

import { setTime } from '@/utils/date-time'

import { SCHEDULE_APPOINTMENT_HEIGHT, TIME_STEP } from '@/constants'

function createState () {
  return {
    dragElement: null,
    dragZone: null,
    dragZoneOver: false
  }
}

const actions = {}

const mutations = {
  SET_DRAG_ELEMENT (state, { appointmentId, layerY, totalTime }) {
    state.dragAppointmentId = appointmentId

    state.dragElement = {
      layerY,
      totalTime,
      appointmentId
    }
  },

  SET_DRAG_ZONE (state, { employeeId, time }) {
    state.dragZone = { employeeId, time }
  },

  SET_DRAG_ZONE_OVER (state, value) {
    if (state.dragZoneOver !== value) {
      state.dragZoneOver = value
    }
  },

  RESET_DRAG (state) {
    state.dragElement = null
    state.dragZone = null
  }
}

const getters = {
  isDragged (state) {
    return Boolean(state.dragElement) && Boolean(state.dragZone)
  },

  dropTimeObject (state) {
    const tilePosition = Math.round(state.dragElement.layerY / SCHEDULE_APPOINTMENT_HEIGHT)
    let date = setTime(new Date(), state.dragZone.time)

    if (tilePosition > 0) {
      date = date.subtract(TIME_STEP * tilePosition, 'm')
    }

    return getDurationFromTo({
      timeStart: date.format('HH:mm'),
      totalTime: state.dragElement.totalTime
    })
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
