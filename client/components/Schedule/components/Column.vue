<template>
  <div class="schedule-column">
    <slot name="append" />

    <div
      class="schedule-column__grid"
      :style="gridStyles"
    >
      <Appointment
        v-for="appointment in appointments"
        :key="`appointment-${appointment.id}`"
        :appointment="appointment"
      />

      <TimeOff
        v-for="timeOff in timeOffs"
        :key="`time-off-${timeOff.id}`"
        :time-off="timeOff"
      />

      <HourTile
        v-for="(hour, index) in workingHours"
        :key="`hour-tile-${index}`"
        :hour="hour"
        :specialist-id="specialist.id"
      />

      <DropPlaceholder
        :specialist-id="specialist.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SCHEDULE_APPOINTMENT_HEIGHT } from '~/constants'

import Appointment from '~/components/Appointment/Appointment.vue'

import TimeOff from './TimeOff.vue'
import HourTile from './HourTile.vue'
import DropPlaceholder from './DropPlaceholder.vue'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    },

    appointments: {
      type: Array,
      required: true
    },

    timeOffs: {
      type: Array,
      required: true
    }
  },

  components: {
    TimeOff,
    HourTile,
    Appointment,
    DropPlaceholder
  }
})
export default class ScheduleColumn extends Vue {
  readonly timeOffs
  readonly specialist
  readonly appointments

  get workingHours () {
    return this.$time.workingHours
  }

  get gridTemplateRows () {
    return this.workingHours.map(hour => {
      // TODO: Remove `time-` from grid name
      hour = `time-${hour.replace(':', '-')}`

      return `[${hour}-start] ${SCHEDULE_APPOINTMENT_HEIGHT}px [${hour}-end] 0`
    }).join(' ')
  }

  get gridStyles () {
    return {
      gridTemplateColumns: '[start] 100% [end] 0',
      gridTemplateRows: this.gridTemplateRows
    }
  }
}
</script>

<style lang="scss">
  .schedule-column {
    &__grid {
      display: grid;
      user-select: none;
    }
  }
</style>
