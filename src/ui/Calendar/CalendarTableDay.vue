<template>
  <UiText
    class="ui-calendar-table-day"
    :class="[
      {'_is-today': isToday},
      {'_is-focus': isFocus},
      {'_is-active': isActive},
      {'_is-first': isFirst},
      {'_is-last': isLast},
    ]"
    size="m"
  >
    {{ day }}
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

@Component({
  props: {
    day: {
      type: Number,
      required: true
    },

    range: {
      type: Boolean,
      required: true
    },

    dateSelected: {
      type: Array,
      required: true
    },

    dateOpened: {
      type: Object,
      required: true
    }
  }
})
export default class CalendarTableDay extends Vue {
  readonly day!: number
  readonly range!: boolean
  readonly dateOpened
  readonly dateSelected

  todayDate = dayjs(new Date())

  get isToday () {
    if (this.todayDate.format('YYYY-MM') !== this.dateOpened.format('YYYY-MM')) {
      return false
    }

    return this.todayDate.date() === this.day
  }

  get isOpenDayOfMouth () {
    return this.dateSelected.some(date => {
      return date.format('YYYY-MM') === this.dateOpened.format('YYYY-MM')
    })
  }

  get fromDate () {
    return this.dateSelected[0]
  }

  get toDate () {
    return this.dateSelected[this.dateSelected.length - 1]
  }

  get isFirst () {
    if (this.isOpenDayOfMouth === false) {
      return false
    }

    return this.fromDate.date() === this.day
  }

  get isLast () {
    if (this.isOpenDayOfMouth === false) {
      return false
    }

    return this.toDate.date() === this.day
  }

  get isFocus () {
    if (this.isOpenDayOfMouth === false) {
      return false
    }

    if (this.range === false) {
      return false
    }

    if (this.dateSelected.length !== 2) {
      return false
    }

    return this.fromDate.date() <= this.day && this.day <= this.toDate.date()
  }

  get isActive () {
    if (this.isOpenDayOfMouth === false) {
      return false
    }

    return this.dateSelected.some(date => date.date() === this.day)
  }
}
</script>

<style lang="scss">
  .ui-calendar-table-day {
    color: $ui-black-100;
    background-color: rgba($ui-black-10, 0);
    border-radius: 100px;
    cursor: pointer;

    &:hover {
      background-color: $ui-black-20;
    }

    &._is-today {
      background-color: $ui-black-20;
    }

    &._is-active {
      color: $ui-white;
      background-color: $ui-brand-blue;
    }

    &._is-focus {
      position: relative;

      &::before {
        position: absolute;
        top: 0;
        right: calc(var(--ui-grid-gap) / 2 * -1);
        bottom: 0;
        left: calc(var(--ui-grid-gap) / 2 * -1);
        z-index: -1;
        background: $ui-blue-10;
        content: '';
      }

      &._is-first {
        &::before {
          left: 0;
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
      }

      &._is-last {
        &::before {
          right: 0;
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      }
    }
  }
</style>
