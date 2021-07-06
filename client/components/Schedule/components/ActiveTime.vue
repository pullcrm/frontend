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

    const interval = setInterval(() => this.startTimer(from, to), TIME)

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

<style lang="scss" src="./ActiveTime.scss"></style>
