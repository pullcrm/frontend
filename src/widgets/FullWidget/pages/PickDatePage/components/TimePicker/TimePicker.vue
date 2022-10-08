<script lang="ts" setup>
import TimePickerGroup from './TimePickerGroup.vue'
import dayjs from '~/utils/dayjs'

const props = defineProps<{ hours: string[] }>()
defineEmits(['update:time'])
const AFTERNOONS_TIME = 12
const EVENING_TIME = 17

const hoursNormalize = computed(() => {
  return props.hours.map(dayjs)
})

const morningHours = computed(() => {
  return hoursNormalize.value.filter((item: any) => {
    return item.isBefore(dayjs().hour(AFTERNOONS_TIME).minute(0))
  })
})

const afternoonsHours = computed(() => {
  return hoursNormalize.value.filter((item: any) => {
    return (
      item.isAfter(dayjs().hour(AFTERNOONS_TIME).minute(0))
        && item.isBefore(dayjs().hour(EVENING_TIME).minute(0))
    )
  })
})

const eveningHours = computed(() => {
  return hoursNormalize.value.filter((item: any) => {
    return item.isAfter(dayjs().hour(EVENING_TIME).minute(0))
  })
})
</script>

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
      Цього дня немає доступного часу для запису
    </UiText>
  </div>
</template>

<style lang="scss" src="./TimePicker.scss"></style>
