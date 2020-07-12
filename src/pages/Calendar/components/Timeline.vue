<template>
  <div class="calendar-timeline">
    <div class="calendar-timeline__navigation _left" />

    <div
      class="calendar-timeline__inner"
      :style="{
        gridTemplateColumns: `repeat(${columns}, ${CALENDAR_POINT_SIZE_WIDTH}px)`,
        width: `${columns * CALENDAR_POINT_SIZE_WIDTH}px`
      }"
    >
      <div class="calendar-timeline__item" v-for="time in hours" :key="time">
        {{ time }}
      </div>
    </div>

    <div class="calendar-timeline__navigation _right" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { CALENDAR_POINT_SIZE_WIDTH } from '@/constants'

@Component({})
export default class Timeline extends Vue {
  CALENDAR_POINT_SIZE_WIDTH = CALENDAR_POINT_SIZE_WIDTH

  get hours () {
    return this.$store.getters.hours.map(hour => hour.replace('time-', ''))
  }

  get columns () {
    return this.hours.length
  }
}
</script>

<style lang="scss">
  .calendar-timeline {
    display: flex;
    height: 48px;

    &__navigation {
      position: sticky;
      z-index: 2;
      min-width: 50px;
      height: 100%;
      background: #fff url('~@/assets/icons/arrow.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px auto;
      border-right: 1px solid $border-color;
      cursor: pointer;

      &._left {
        left: 0;
        border-bottom: 1px solid $border-color;
      }

      &._right {
        right: 0;
        border-top: 1px solid $border-color;
        transform: rotate(180deg);
      }
    }

    &__inner {
      display: grid;
      width: 100%;
      height: 100%;
      background: $bg-color;
      border-bottom: 1px solid $border-color;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $ui-black;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      transform: translateX(-50%);

      &:first-child {
        opacity: 0;
      }
    }
  }
</style>
