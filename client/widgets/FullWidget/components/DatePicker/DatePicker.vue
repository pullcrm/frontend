<template>
  <div class="full-widget-date-picker">
    <UiCarousel
      class="full-widget-date-picker__carousel"
    >
      <UiCarouselItem
        v-for="(day, index) in days"
        :key="index"
      >
        <DatePickerItem
          :day="day"
          class="full-widget-date-picker__item"
          @click.native="$emit('update:date-selected', day)"
        />
      </UiCarouselItem>

      <template #control:next>
        <UiIcon
          name="outlined/caret-right"
          size="m"
          inline
        />
      </template>

      <template #control:prev>
        <UiIcon
          name="outlined/caret-left"
          size="m"
          inline
        />
      </template>
    </UiCarousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import 'dayjs/locale/uk'

import dayjs from '~/utils/dayjs'

import DatePickerItem from './DatePickerItem.vue'

@Component({
  props: {
    date: {
      type: Date,
      required: true
    },

    daysCount: {
      type: Number,
      required: true
    }
  },

  components: {
    DatePickerItem
  }
})
export default class DatePicker extends Vue {
  readonly date!: Date
  readonly daysCount!: number

  days = []

  constructor () {
    super()

    let date = dayjs(this.date).locale('uk')

    while (this.days.length < this.daysCount) {
      this.days.push(date)

      date = date.add(1, 'day')
    }
  }
}
</script>

<style lang="scss" src="./DatePicker.scss"></style>
