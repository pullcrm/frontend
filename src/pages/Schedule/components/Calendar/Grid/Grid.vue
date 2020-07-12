<template>
  <div
    class="schedule-calendar-grid"
    :style="gridStyles"
  >
    <LineHorizontal
      v-for="(hour) in hours"
      :key="`column-${hour}`"
      :name="hour"
    />

    <LineVertical
      v-for="({ id }, index) in specialists"
      :key="`employee-${id}`"
      :index="index"
      :name="`employee-${id}`"
    />

    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SCHEDULE_APPOINTMENT_HEIGHT } from '@/constants'

import { WORKING_HOURS_SLUG } from '@/logics/hours'

import LineVertical from './LineVertical.vue'
import LineHorizontal from './LineHorizontal.vue'

@Component({
  components: {
    LineVertical,
    LineHorizontal
  }
})
export default class Grid extends Vue {
  readonly hours: string[] = WORKING_HOURS_SLUG

  get specialists () {
    return this.$store.state.employee.specialists
  }

  get gridTemplateColumns () {
    return this.specialists.map(({ id }) => `[employee-${id}-start] 280px [employee-${id}-end] 0`).join(' ')
  }

  get gridTemplateRows () {
    return this.hours.map(hour => `[${hour}-start] ${SCHEDULE_APPOINTMENT_HEIGHT}px [${hour}-end] 0`).join(' ')
  }

  get gridStyles () {
    return {
      gridTemplateColumns: this.gridTemplateColumns,
      gridTemplateRows: this.gridTemplateRows,
      height: `${this.hours.length * SCHEDULE_APPOINTMENT_HEIGHT}px`
    }
  }
}
</script>

<style lang="scss">
  .schedule-calendar-grid {
    display: grid;
    grid-auto-rows: $SCHEDULE_APPOINTMENT_WIDTH;
    user-select: none;
  }
</style>
