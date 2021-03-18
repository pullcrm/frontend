<template>
  <div class="ui-calendar">
    <Month
      v-model="dateOpened"
      class="ui-calendar__month"
      @input="resetDateFocused"
    />

    <DaysOfWeek
      class="ui-calendar__days-of-week"
    />

    <CalendarTable
      :range="isRange"
      :date-opened="dateOpened"
      :date-selected="dateSelected"
      @select="select"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import Month from './Month.vue'
import DaysOfWeek from './DaysOfWeek.vue'
import CalendarTable from './CalendarTable.vue'

@Component({
  components: {
    Month,
    DaysOfWeek,
    CalendarTable
  },

  props: {
    value: {
      type: [Date, Array],
      required: true
    }
  }
})
export default class Calendar extends Vue {
  readonly value: Date | Date[]

  dateOpened

  dateFocused = []

  constructor () {
    super()

    if (Array.isArray(this.value)) {
      this.dateOpened = dayjs(this.value[0])
    } else {
      this.dateOpened = dayjs(this.value)
    }
  }

  get isRange () {
    return Array.isArray(this.value)
  }

  get dateSelected () {
    if (this.dateFocused.length > 0) {
      return this.dateFocused.map(date => dayjs(date))
    }

    if (Array.isArray(this.value)) {
      return this.value.map(date => dayjs(date))
    }

    return [dayjs(this.value)]
  }

  resetDateFocused () {
    this.dateFocused = []
  }

  select (value) {
    if (this.isRange) {
      this.dateFocused.push(value)

      if (this.dateFocused.length === 2) {
        this.$emit('input', this.dateFocused.sort((a, b) => a - b))

        this.dateFocused = []
      }

      return
    }

    this.$emit('input', value)
  }
}
</script>

<style lang="scss" src="./Calendar.scss"></style>
