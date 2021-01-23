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

import dayjs from '@/utils/dayjs'

const TIME = 1000 * 60 /* 1 minute */

@Component({})
export default class ActiveTime extends Vue {
  startEt = 10
  endAt = 20

  position = 0
  time = null

  mounted () {
    this.startTimer()

    const interval = setInterval(this.startTimer, TIME)

    this.$on('hook:beforeDestroy', () => {
      clearInterval(interval)
    })
  }

  startTimer () {
    const nowHour = Number(dayjs(new Date()).format('HH'))
    const nowMinutes = Number(dayjs(new Date()).format('mm'))

    if (nowHour < this.startEt || nowHour >= this.endAt) {
      this.time = null

      return
    }

    const position = ((nowHour - this.startEt) * 10) + (nowMinutes / 60 * 10)

    this.time = dayjs(new Date()).format('HH:mm')
    this.position = Math.floor(position)
  }
}
</script>

<style lang="scss">
.schedule-active-time {
  position: absolute;
  top: 68px;
  right: 0;
  bottom: 32px;
  left: 0;
  z-index: 9;
  pointer-events: none;

  &__inner {
    position: absolute;
    top: 100px;
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
