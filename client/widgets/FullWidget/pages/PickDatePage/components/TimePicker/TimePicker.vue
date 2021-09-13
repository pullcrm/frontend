<template>
  <div class="full-widget-pick-date-page-time-picker">
    <TimePickerGroup
      icon="solid/sun-horizon-fill"
      theme="primary"
      :hours="morningHours"
      class="full-widget-pick-date-page-time-picker__group"
      @pick="$emit('update:time', $event)"
    />

    <TimePickerGroup
      icon="solid/sun-fill"
      theme="primary"
      :hours="afternoonsHours"
      class="full-widget-pick-date-page-time-picker__group"
      @pick="$emit('update:time', $event)"
    />

    <TimePickerGroup
      icon="solid/moon-fill"
      theme="secondary"
      :hours="eveningHours"
      class="full-widget-pick-date-page-time-picker__group"
      @pick="$emit('update:time', $event)"
    />

    <UiText
      v-if="hours.length === 0"
      size="l"
      strong
      class="full-widget-pick-date-page-time-picker__empty"
    >
      В этот день нету доступного времени для записи
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'

import TimePickerGroup from './TimePickerGroup.vue'

const AFTERNOONS_TIME = 12
const EVENING_TIME = 17

@Component({
  inject: ['duration'],

  components: {
    TimePickerGroup
  },

  props: {
    hours: {
      type: Array,
      required: true
    }
  }
})
export default class TimePicker extends Vue {
  readonly hours

  get hoursNormalize () {
    return this.hours.map(dayjs)
  }

  get morningHours () {
    return this.hoursNormalize.filter(item => {
      return item.isBefore(dayjs().hour(AFTERNOONS_TIME).minute(0))
    })
  }

  get afternoonsHours () {
    return this.hoursNormalize.filter(item => {
      return (
        item.isAfter(dayjs().hour(AFTERNOONS_TIME).minute(0)) &&
        item.isBefore(dayjs().hour(EVENING_TIME).minute(0))
      )
    })
  }

  get eveningHours () {
    return this.hoursNormalize.filter(item => {
      return item.isAfter(dayjs().hour(EVENING_TIME).minute(0))
    })
  }
}
</script>

<style lang="scss" src="./TimePicker.scss"></style>
