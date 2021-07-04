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
        responsive
        :appointment="appointment"
      />

      <TimeOff
        v-for="timeOff in timeOffs"
        :key="`time-off-${timeOff.id}`"
        :time-off="timeOff"
      />

      <HourTile
        v-if="hoveredTime"
        ref="hourTile"
        :time="hoveredTime"
        :specialist="specialist"
        class="schedule-column__hour-tile"
      />

      <div
        class="schedule-column__cursor"
        @click="openMenu"
        @dblclick="addAppointment"
        @mousemove="onMousemove"
        @mouseleave="onMouseleave"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SCHEDULE_APPOINTMENT_HEIGHT } from '~/constants'

import { slugFromTime } from '~/utils/time'

import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'
import Appointment from '~/components/Appointment/Appointment.vue'

import TimeOff from './TimeOff.vue'
import HourTile from './HourTile.vue'

@Component({
  inject: ['getPopperMenu'],

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
    Appointment
  }
})
export default class ScheduleColumn extends Vue {
  readonly timeOffs
  readonly specialist
  readonly appointments

  hoveredTime = null

  readonly getPopperMenu!: () => PopperMenu

  $refs: {
    hourTile: HourTile
  }

  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get gridTemplateRows () {
    return this.workingHours.map((hour, index) => {
      hour = slugFromTime(hour)

      if (index === this.workingHours.length - 1) {
        return `[${hour}-start] 0px [${hour}-end] 0`
      }

      return `[${hour}-start] ${SCHEDULE_APPOINTMENT_HEIGHT}px [${hour}-end] 0`
    }).join(' ')
  }

  get gridStyles () {
    return {
      gridTemplateColumns: '[start] 100% [end] 0',
      gridTemplateRows: this.gridTemplateRows
    }
  }

  openMenu () {
    if (!this.hoveredTime) return

    const popperMenu = this.getPopperMenu()

    if (popperMenu.reference === this.$refs.hourTile.icon) {
      return
    }

    const addAppointment = {
      name: 'Добавить запись',
      icon: 'outlined/plus-circle',
      click: this.addAppointment
    }

    const addTimeOff = {
      name: 'Закрыть запись',
      icon: 'outlined/prohibit',
      click: this.addTimeOff
    }

    popperMenu.open(this.$refs.hourTile.icon, {
      name: `Начало: ${this.hoveredTime}`,
      options: [
        addAppointment,
        addTimeOff
      ],
      placement: 'right'
    })
  }

  addAppointment () {
    if (!this.hoveredTime) return

    this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: {
        type: 'new',
        time: this.hoveredTime,
        specialistId: this.specialist.id
      }
    })
  }

  addTimeOff () {
    this.$typedStore.dispatch('popup/show', {
      name: 'time-off-new',
      props: {
        time: this.hoveredTime,
        specialistId: this.specialist.id
      }
    })
  }

  onMousemove (event) {
    const index = Math.floor(event.offsetY / SCHEDULE_APPOINTMENT_HEIGHT)

    if (event.offsetY > 0 && this.workingHours[index] !== this.hoveredTime) {
      this.getPopperMenu().close()

      this.hoveredTime = this.workingHours[index]
    }
  }

  onMouseleave () {
    if (this.getPopperMenu().isOpened) return

    this.hoveredTime = null
  }
}
</script>

<style lang="scss" src="./Column.scss"></style>
