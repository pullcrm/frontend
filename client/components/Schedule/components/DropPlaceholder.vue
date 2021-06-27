<template>
  <div
    v-if="isVisible"
    class="schedule-drop-placeholder"
    :class="[
      { '_overed': isOvered }
    ]"
    :style="gridArea"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getTimePoints, slugFromTime } from '~/utils/time'

import { getProceduresDuration } from '~/logics/appointment'

@Component({
  props: {
    specialistId: {
      type: Number,
      required: true
    }
  }
})
export default class DropPlaceholder extends Vue {
  readonly specialistId: number

  get isVisible (): boolean {
    return this.$typedStore.state.drugAndDrop.specialistId === this.specialistId
  }

  get isOvered () {
    return this.$typedStore.state.drugAndDrop.isOvered
  }

  get time (): string {
    return this.$typedStore.state.drugAndDrop.time
  }

  get appointmentId (): number {
    return this.$typedStore.state.drugAndDrop.appointmentId
  }

  get totalDuration (): number {
    const appointment = this.$typedStore.getters['appointments/appointmentById'](this.appointmentId)

    return getProceduresDuration(appointment)
  }

  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get timePoints () {
    return getTimePoints(this.workingHours, {
      timeStart: this.time,
      totalTime: this.totalDuration
    })
  }

  get fromTime () {
    return this.timePoints[0]
  }

  get toTime () {
    return this.timePoints[this.timePoints.length - 1]
  }

  get gridArea () {
    return {
      gridRow: `${slugFromTime(this.fromTime)}-start / ${slugFromTime(this.toTime)}-end`,
      gridColumn: 'start / end'
    }
  }
}
</script>

<style lang="scss">
  .schedule-drop-placeholder {
    z-index: 5;
    padding: 8px;
    border: 2px dashed $ui-blue-brand;
    pointer-events: none;

    &._overed {
      background: rgba($ui-blue-brand, 0.1);
    }
  }
</style>
