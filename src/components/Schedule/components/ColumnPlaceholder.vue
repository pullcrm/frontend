<template>
  <div class="schedule-column-placeholder" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ScheduleColumnPlaceholder extends Vue {}
</script>

<style lang="scss">
  .schedule-column-placeholder {
    flex: 1;
    background-color: $ui-gray-brand;
    background-image: url('~@/assets/svg/disabled-time-pattern.svg');
    background-position: bottom right;
  }
</style>
