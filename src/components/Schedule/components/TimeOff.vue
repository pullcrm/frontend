<template>
  <div
    class="schedule-timeoff"
    :style="gridArea"
    @dblclick="edit"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '@/utils/time'

@Component({
  props: {
    timeOff: {
      type: Object,
      required: true
    }
  }
})
export default class TimeOff extends Vue {
  readonly timeOff

  get from () {
    return slugFromTime(this.timeOff.startTime)
  }

  get to () {
    return slugFromTime(this.timeOff.endTime)
  }

  get gridArea () {
    return {
      gridRow: `${this.from} / ${this.to}`,
      gridColumn: 'start / end'
    }
  }

  edit () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-edit',
      props: {
        timeOff: this.timeOff
      }
    })
  }
}
</script>

<style lang="scss">
  .schedule-timeoff {
    z-index: 7;
    background-color: $ui-gray-brand;
    background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    border-bottom: 1px solid $ui-black-40;
  }
</style>
