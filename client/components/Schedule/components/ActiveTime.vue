<template>
  <div
    v-if="time"
    class="schedule-active-time"
  >
    <div
      class="schedule-active-time__inner"
      :style="`top: ${position}%;`"
      :data-time="time"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/time'

const TIME = 1000 * 60 /* 1 minute */

@Component({})
export default class ActiveTime extends Vue {
  position = 0
  time = null

  get timeWork () {
    return this.$typedStore.getters['timetable/timeWork']
  }

  mounted () {
    const { from, to } = this.timeWork

    this.startTimer(from, to)

    const interval = setInterval(this.startTimer, TIME)

    this.$on('hook:beforeDestroy', () => {
      clearInterval(interval)
    })
  }

  startTimer (startEt, endAt) {
    const minutesOfDay = (setTime(new Date(), endAt).unix() - setTime(new Date(), startEt).unix()) / 60
    const minutesToNow = (dayjs(new Date()).unix() - setTime(new Date(), startEt).unix()) / 60

    this.position = minutesToNow * 100 / minutesOfDay

    if (this.position < 0 || this.position > 100) {
      this.time = null

      return
    }

    this.time = dayjs(new Date()).format('HH:mm')
  }
}
</script>

<style lang="scss">
.schedule-active-time {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  pointer-events: none;

  &__inner {
    position: absolute;
    right: 0;
    left: 0;
    height: 1px;
    color: #ef4137;
    background: #ff958e;

    &::before {
      position: absolute;
      bottom: -2px;
      left: 0;
      display: flex;
      width: 5px;
      height: 5px;
      background: #ef4137;
      border-radius: 50%;
      content: '';
    }

    &::after {
      @include ui-typo-12;

      position: absolute;
      top: 50%;
      right: calc(100% + 4px);
      color: inherit;
      font-weight: 700;
      transform: translateY(-50%);
      content: attr(data-time);
    }
  }
}
</style>
