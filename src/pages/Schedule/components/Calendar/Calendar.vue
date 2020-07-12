<template>
  <div class="schedule-calendar">
    <div class="schedule-calendar__timeline">
      <Timeline />
    </div>

    <div class="schedule-calendar__table">
      <slot name="table:prepend" />

      <div
        class="schedule-calendar__header"
        :style="{
          minWidth: rowMinWidth
        }"
      >
        <Header />
      </div>

      <div
        class="schedule-calendar__grid"
        :style="{
          minWidth: rowMinWidth
        }"
      >
        <Grid>
          <slot name="grid" />
        </Grid>

        <div class="schedule-calendar__grid-placeholder" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SCHEDULE_APPOINTMENT_WIDTH } from '@/constants'

import Grid from './Grid/Grid.vue'
import Header from './Header.vue'
import Timeline from './Timeline.vue'

@Component({
  components: {
    Grid,
    Header,
    Timeline
  }
})
export default class Calendar extends Vue {
  get specialists () {
    return this.$store.state.employee.specialists
  }

  get rowMinWidth () {
    return `${
      (this.specialists.length * SCHEDULE_APPOINTMENT_WIDTH) + 220 /* widht add more button */
    }px`
  }
}
</script>

<style lang="scss">
  .schedule-calendar {
    display: flex;

    &__table {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow-x: auto;
      border: 1px solid #e0e0e0;
    }

    &__timeline {
      flex-basis: 50px;
      margin-top: 68px;
      margin-right: 12px;
    }

    &__grid {
      display: flex;
      flex: 1;
    }

    &__grid-placeholder {
      flex: 1;
      min-width: 220px;
      background-color: $body-color;
      background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    }
  }
</style>
