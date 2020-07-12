<template>
  <div class="schedule-calendar-timeline">
    <div
      v-for="time in timeHours"
      :key="time"
      class="schedule-calendar-timeline__item"
    >
      <UiText
        size="s"
      >
        {{ time }}
      </UiText>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { WORKING_HOURS } from '@/constants/generated'

@Component({})
export default class Timeline extends Vue {
  get timeHours () {
    return WORKING_HOURS.filter((_, index) => index % 2 === 0)
  }

  get columns () {
    return WORKING_HOURS.length
  }
}
</script>

<style lang="scss">
  .schedule-calendar-timeline {
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: $SCHEDULE_APPOINTMENT_HEIGHT;
      color: $ui-black-100;

      &:not(:last-child) {
        margin-bottom: $SCHEDULE_APPOINTMENT_HEIGHT;
      }
    }
  }
</style>
