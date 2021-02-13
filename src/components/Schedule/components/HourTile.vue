<template>
  <div
    class="schedule-hour-tile"
    :class="[
      {'_is-minute': isMinute}
    ]"
    :style="gridArea"
    @click="openMenu"
    @dblclick="addAppointment"
    @drop.prevent="dropZoneDropHandler"
    @dragover.prevent
    @dragenter.prevent="dropZoneEnterHandler"
    @dragleave.prevent="dropZoneLeaveHandler"
  >
    <div
      ref="icon"
      class="schedule-hour-tile__icon"
    >
      <UiIcon
        size="xxs"
        name="outlined/plus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

// TODO: Replace all @/utils/date-time to @/utils/dayjs
import { toDate } from '@/utils/date-time'
import { slugFromTime } from '@/utils/time'

import PopperMenu from '@/components/PopperMenu/PopperMenu.vue'

@Component({
  inject: ['getPopperMenu'],

  props: {
    hour: {
      type: String,
      required: true
    },

    specialistId: {
      type: Number,
      required: true
    }
  }
})
export default class HourTile extends Vue {
  readonly hour: string
  readonly specialistId: number

  readonly getPopperMenu!: () => PopperMenu

  $refs: {
    icon: HTMLElement
  }

  get isSMSAuthorize (): Boolean {
    return this.$store.getters['sms/isAuthorize']
  }

  get isMinute () {
    return Number(this.hour.split(':')[1]) % 2 === 0
  }

  get gridArea () {
    const row = slugFromTime(this.hour)

    return {
      gridRow: `${row}-start / ${row}-end`,
      gridColumn: 'start / end'
    }
  }

  openMenu () {
    const popperMenu = this.getPopperMenu()

    if (popperMenu.reference === this.$refs.icon) {
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

    popperMenu.open(this.$refs.icon, {
      options: [{
        name: `Начало: ${this.hour}`,
        items: [addAppointment, addTimeOff]
      }],
      placement: 'right'
    })
  }

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        time: this.hour,
        specialistId: this.specialistId
      }
    })
  }

  addTimeOff () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-new',
      props: {
        time: this.hour,
        specialistId: this.specialistId
      }
    })
  }

  dropZoneEnterHandler () {
    const steps = (this.$store.getters['drugAndDrop/totalDuration'] / TIME_STEP) - 1
    const time = this.$time.shiftTimeDownBySteps(this.hour, steps)

    if (this.$store.getters['drugAndDrop/getSlotByTime'](time, this.specialistId) === false) {
      return
    }

    this.$store.commit('drugAndDrop/SET_TIME', time)
    this.$store.commit('drugAndDrop/SET_SPECIALIST_ID', this.specialistId)

    setTimeout(() => {
      this.$store.commit('drugAndDrop/SET_OVERED', true)
    }, 0)
  }

  dropZoneLeaveHandler (event) {
    if (event.relatedTarget !== null) {
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
      this.$store.commit('drugAndDrop/SET_OVERED', false)
    }
  }

  async dropZoneDropHandler () {
    try {
      this.$store.commit('schedule/SET_LOADING', true)

      const appointmentId = this.$store.state.drugAndDrop.appointmentId
      const appointment = this.$store.getters['appointments/appointmentById'](appointmentId)

      const { time: startTime, specialistId } = this.$store.state.drugAndDrop

      await this.$store.dispatch('appointments/update', {
        ...appointment,
        date: toDate(appointment.date),
        startTime,
        specialistId,
        hasRemindSMS: this.isSMSAuthorize ? Boolean(appointment.smsIdentifier) : null
      })

      await this.$store.dispatch('schedule/fetch')
    } finally {
      this.$store.commit('schedule/SET_LOADING', false)
    }
  }
}
</script>

<style lang="scss">
  .schedule-hour-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid $ui-black-40;
    cursor: pointer;

    &__icon {
      color: $ui-black-100;
      opacity: 0;
      transition: $ui-transition;
    }

    @include ui-hover {
      &:hover {
        .schedule-hour-tile {
          &__icon {
            opacity: 1;
          }
        }
      }
    }

    &._is-minute {
      border-color: $ui-black-20;
    }

    &:last-child {
      border: none;
    }
  }
</style>
