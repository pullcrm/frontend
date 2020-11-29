<template>
  <div class="schedule-calendar">
    <Timeline
      class="schedule-calendar__timeline"
    />

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

<style lang="scss" src="./Calendar.scss"></style>
