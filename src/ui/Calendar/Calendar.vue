<template>
  <div class="ui-calendar">
    <Month
      v-model="openDate"
      class="ui-calendar__month"
    />

    <DaysOfWeek
      class="ui-calendar__days-of-week"
    />

    <div class="ui-calendar__days-of-month">
      <div
        v-for="day in prependDays"
        :key="`prepend-${day}`"
        class="ui-calendar-placeholder-day"
      />

      <UiText
        v-for="day in daysInMonth"
        :key="day"
        class="ui-calendar-day"
        :class="[
          {'_is-today': isToday(day)},
          {'_is-active': isActive(day)}
        ]"
        size="m"
        @click.native="onSelect(day)"
      >
        {{ day }}
      </UiText>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import Month from './Month.vue'
import DaysOfWeek from './DaysOfWeek.vue'

@Component({
  components: {
    Month,
    DaysOfWeek
  },

  props: {
    value: {
      type: Date,
      required: true
    }
  }
})
export default class Calendar extends Vue {
  readonly value: Date

  openDate = dayjs(this.value)
  currentDate = dayjs(new Date())

  get date () {
    return dayjs(this.value)
  }

  get daysInMonth () {
    return this.openDate.daysInMonth()
  }

  get prependDays () {
    let day = this.openDate.date(1).day()

    if (day === 0) {
      day = 7
    }

    return day - 1
  }

  isToday (day) {
    if (this.currentDate.format('YYYY-MM') !== this.openDate.format('YYYY-MM')) {
      return false
    }

    return this.currentDate.date() === day
  }

  isActive (day) {
    if (this.openDate.format('YYYY-MM') !== this.date.format('YYYY-MM')) {
      return false
    }

    return this.date.date() === day
  }

  onSelect (day) {
    this.$emit('input', this.openDate.date(day).toDate())
  }
}
</script>

<style lang="scss" src="./Calendar.scss"></style>
