<template>
  <div class="ui-calendar-table">
    <div
      v-for="day in prependDays"
      :key="`prepend-${day}`"
      class="ui-calendar-placeholder-day"
    />

    <CalendarTableDay
      v-for="day in daysInMonth"
      :key="day"
      :day="day"
      :range="range"
      :date-opened="dateOpened"
      :date-selected="dateSelected"
      class="ui-calendar-day"
      @click.native="onSelect(day)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CalendarTableDay from './CalendarTableDay.vue'

@Component({
  components: {
    CalendarTableDay
  },

  props: {
    range: {
      type: Boolean,
      required: true
    },

    dateOpened: {
      type: Object,
      required: true
    },

    dateSelected: {
      type: Array,
      required: true
    }
  }
})
export default class CalendarTable extends Vue {
  readonly range!: boolean
  readonly dateOpened
  readonly dateSelected

  get daysInMonth () {
    return this.dateOpened.daysInMonth()
  }

  get prependDays () {
    let day = this.dateOpened.date(1).day()

    if (day === 0) {
      day = 7
    }

    return day - 1
  }

  onSelect (day) {
    this.$emit('select', this.dateOpened.date(day).toDate())
  }
}
</script>

<style lang="scss">
  @mixin grid-day {
    display: flex;
    flex-basis: calc(#{100% / 7} - var(--ui-grid-gap));
    flex-grow: 0;
    // IE 11 ignores an calc() function used in flex shorthand declarations
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    max-width: calc(#{100% / 7} - var(--ui-grid-gap));
    height: 32px;
    margin-right: calc(var(--ui-grid-gap) / 2);
    margin-bottom: calc(var(--ui-grid-gap));
    margin-left: calc(var(--ui-grid-gap) / 2);
  }

  .ui-calendar-table {
    @include ui-grid-gap(4px);

    display: flex;
    flex: 1 0 auto;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 calc(var(--ui-grid-gap) / 2 * -1);
  }

  .ui-calendar-placeholder-day {
    @include grid-day;
  }

  .ui-calendar-day {
    @include grid-day;
  }
</style>
