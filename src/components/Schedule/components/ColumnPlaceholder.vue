<template>
  <div class="schedule-column-placeholder">
    <div class="schedule-column-placeholder__placeholder" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ScheduleColumnPlaceholder extends Vue {}
</script>

<style lang="scss">
  .schedule-column-placeholder {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: $SCHEDULE_APPOINTMENT_WIDTH;

    &__placeholder {
      flex: 1;
      background-color: $ui-gray-brand;
      background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    }
  }
</style>
