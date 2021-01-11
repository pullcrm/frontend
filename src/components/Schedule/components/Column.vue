<template>
  <div class="schedule-column">
    <Specialist
      class="schedule-column__specialist"
      :specialist="specialist"
    />

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
        @popper="popperHourTileToggle"
        @dblclick.native="addAppointment(hour)"
      />

      <DropPlaceholder
        :specialist-id="specialist.id"
      />
    </div>

    <HourTilePopper
      ref="hourTilePopper"
      :specialist="specialist"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SCHEDULE_APPOINTMENT_HEIGHT } from '@/constants'

import Appointment from '@/components/Appointment/Appointment.vue'

import TimeOff from './TimeOff.vue'
import HourTile from './HourTile.vue'
import Specialist from './Specialist.vue'
import HourTilePopper from './HourTilePopper.vue'
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
    Specialist,
    Appointment,
    HourTilePopper,
    DropPlaceholder
  }
})
export default class ScheduleColumn extends Vue {
  readonly timeOffs
  readonly specialist
  readonly appointments

  $refs: {
    hourTilePopper: HourTilePopper
  }

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
      gridTemplateColumns: '[start] 280px [end] 0',
      gridTemplateRows: this.gridTemplateRows,
    }
  }

  async popperHourTileToggle ($element, hour) {
    if (this.$refs.hourTilePopper.hour !== hour) {
      await this.$refs.hourTilePopper.close()
    }

    const reference = $element as HTMLElement

    this.$refs.hourTilePopper.hour = hour
    this.$refs.hourTilePopper.toggle(reference)
  }

  addAppointment (time) {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        time,
        specialistId: this.specialist.id
      }
    })
  }
}
</script>

<style lang="scss">
  .schedule-column {
    min-width: #{$SCHEDULE_APPOINTMENT_WIDTH + 1px};
    max-width: #{$SCHEDULE_APPOINTMENT_WIDTH + 1px};
    border-right: 1px solid $ui-black-40;

    &__specialist {
      @include ui-shadow-4;

      height: 68px;
      border-bottom: 1px solid $ui-black-40;
    }

    &__grid {
      display: grid;
      grid-auto-rows: $SCHEDULE_APPOINTMENT_WIDTH;
      grid-template-columns: [start] 0 [end] $SCHEDULE_APPOINTMENT_WIDTH;
      user-select: none;
    }
  }
</style>
