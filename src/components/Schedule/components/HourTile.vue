<template>
  <div
    class="schedule-hour-tile"
    :class="[
      {'_is-minute': isMinute}
    ]"
    :style="gridArea"
    @click="openPoppover"
    @drop.prevent="dropZoneDropHandler"
    @dragover.prevent
    @dragenter.prevent="dropZoneEnterHandler"
    @dragleave.prevent="dropZoneLeaveHandler"
  >
    <UiIcon
      class="schedule-hour-tile__icon"
      size="xs"
      name="plus/plus"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TIME_STEP } from '@/constants'

// TODO: Replace all @/utils/date-time to @/utils/daysjs
import { toDate } from '@/utils/date-time'
import { slugFromTime } from '@/utils/time'

@Component({
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

  get hasSmsAuthorize (): Boolean {
    return this.$store.getters['sms/hasSmsAuthorize']
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

  openPoppover () {
    const element = this.$el.querySelector('.schedule-hour-tile__icon')

    this.$emit('popper', element, this.hour)
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
        smsRemindNotify: this.hasSmsAuthorize ? Boolean(appointment.smsIdentifier) : null
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
      border-color: #eaeaea;
    }

    &:last-child {
      border: none;
    }
  }
</style>
