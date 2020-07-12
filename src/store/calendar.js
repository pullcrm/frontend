import { slugFromTime, fromToTimelineLength, timeIndexOnTimeline } from '@/utils/time.js'

import { CALENDAR_POINT_SIZE_WIDTH } from '@/constants'

import { hours } from '@/data'

function createState () {
  return {
    dragElement: null,
    dragZone: null,
    dragZoneOver: false
  }
}

const actions = {
  //
}

const mutations = {
  SET_DRAG_ELEMENT (state, { timeStart, timeEnd, layerX }) {
    state.dragElement = {
      timeStart,
      timeEnd,
      layerX
    }
  },

  SET_DRAG_ZONE (state, { row, column }) {
    state.dragZone = { row, column }
  },

  RESET_DRAG (state) {
    state.dragElement = null
    state.dragZone = null
  },

  SET_DRAG_ZONE_OVER (state, value) {
    if (state.dragZoneOver !== value) {
      state.dragZoneOver = value
    }
  }
}

const getters = {
  hours () {
    return hours.map(hour => slugFromTime(hour))
  },

  isDragged (state) {
    return state.dragElement && state.dragZone
  },

  drugElementTileStart (state, localGetters) {
    if (localGetters.isDragged) {
      return Math.ceil(state.dragElement.layerX / CALENDAR_POINT_SIZE_WIDTH)
    }
  },

  drugElementTimeStart (state, localGetters) {
    if (localGetters.isDragged) {
      return slugFromTime(state.dragElement.timeStart)
    }
  },

  drugElementTimeEnd (state, localGetters) {
    if (localGetters.isDragged) {
      return slugFromTime(state.dragElement.timeEnd)
    }
  },

  drugElementLength (_state, localGetters) {
    if (localGetters.isDragged) {
      return fromToTimelineLength({
        from: localGetters.drugElementTimeStart,
        to: localGetters.drugElementTimeEnd,
        hours: localGetters.hours
      }) - 1
    }
  },

  nextDrugElementTileStart (state, localGetters) {
    if (localGetters.drugElementTileStart > 1) {
      const startIndex = timeIndexOnTimeline({ hours: localGetters.hours, time: state.dragZone.column })

      return localGetters.hours[startIndex - localGetters.drugElementTileStart + 1]
    }

    return state.dragZone.column
  },

  nextDrugElementTileEnd (_state, localGetters) {
    const startIndex = timeIndexOnTimeline({ hours: localGetters.hours, time: localGetters.nextDrugElementTileStart })

    return localGetters.hours[startIndex + localGetters.drugElementLength]
  }
}

export default {
  namespaced: true,
  state: createState,
  actions,
  getters,
  mutations
}
