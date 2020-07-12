<template>
  <div class="calendar-grid">
    <div class="calendar-grid__inner">
      <Timeline />

      <div
        class="calendar-grid__css-grid"
        :style="gridStyles"
      >
        <slot />

        <GridTimeLinesVertical
          v-for="(hour, index) in hours"
          :key="`column-${hour}`"
          :index="index"
          :column-name="hour"
        />

        <GridTimeLinesHorizontal
          v-for="({ slug }) in staffs.slice(0, -1)"
          :key="`row-${slug}`"
          :row-name="slug"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { CALENDAR_POINT_SIZE_WIDTH, CALENDAR_POINT_SIZE_HEIGHT } from '@/constants'

import Timeline from './Timeline.vue'
import GridTimeLinesVertical from './GridTimeLinesVertical.vue'
import GridTimeLinesHorizontal from './GridTimeLinesHorizontal.vue'

@Component({
  components: {
    Timeline,
    GridTimeLinesVertical,
    GridTimeLinesHorizontal
  }
})
export default class CalendarGrid extends Vue {
  get hours () {
    return this.$store.getters.hours
  }

  get staffs () {
    return this.$store.state.staffs
  }

  get columnsCount () {
    return this.hours.length
  }

  get rowsCount () {
    return this.staffs.length
  }

  get gridTemplateRows () {
    return this.staffs.map(({ slug }) => `[${slug}-start] ${CALENDAR_POINT_SIZE_HEIGHT}px [${slug}-end] 0`).join(' ')
  }

  get gridTemplateColumns () {
    return this.hours.map(hour => `[${hour}-start] ${CALENDAR_POINT_SIZE_WIDTH}px [${hour}-end] 0`).join(' ')
  }

  get gridStyles () {
    return {
      width: `${(this.columnsCount * CALENDAR_POINT_SIZE_WIDTH) + 49}px`,
      gridTemplateColumns: this.gridTemplateColumns,
      gridTemplateRows: this.gridTemplateRows
    }
  }
}
</script>

<style lang="scss">
  .calendar-grid {
    flex: 1;
    width: 100%;
    overflow: hidden;
    border: 1px solid $border-color;

    &__inner {
      overflow-x: scroll;
    }

    &__css-grid {
      display: grid;
      grid-auto-rows: $CALENDAR_POINT_SIZE_HEIGHT;
      padding-left: 49px;
      user-select: none;
    }
  }
</style>
