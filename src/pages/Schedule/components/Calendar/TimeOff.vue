<template>
  <div
    class="schedule-calendar-timeoff"
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
    item: {
      type: Object,
      required: true
    }
  }
})
export default class TimeOff extends Vue {
  readonly item

  get from () {
    return slugFromTime(this.item.startTime)
  }

  get to () {
    return slugFromTime(this.item.endTime)
  }

  get employeeId () {
    return this.item.employeeId
  }

  get gridArea () {
    return {
      gridRow: `${this.from} / ${this.to}`,
      gridColumn: `employee-${this.employeeId}-start / employee-${this.employeeId}-end`
    }
  }

  edit () {
    this.$store.dispatch('popup/show', {
      name: 'time-off-edit',
      props: { timeOff: this.item }
    })
  }
}
</script>

<style lang="scss">
  .schedule-calendar-timeoff {
    z-index: 7;
    background-color: $body-color;
    background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    border-bottom: 1px solid $ui-black-40;
  }
</style>
