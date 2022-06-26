<script lang="ts" setup>
import uniq from 'lodash/uniq'

import DatePickerItem from './DatePickerItem.vue'
import dayjs from '~/utils/dayjs'

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },

  daysCount: {
    type: Number,
    required: true,
  },
})

defineEmits(['update:date-selected'])

const days = ref<any[]>([])

onMounted(() => {
  let date = dayjs(props.date)

  while (days.value.length < props.daysCount) {
    days.value.push(date)

    date = date.add(1, 'day')
  }
})

const title = computed(() => {
  return uniq(
    days.value.map(day => day.format('MMMM YYYY')),
  ).join(' - ')
})
</script>

<template>
  <div class="full-widget-date-picker">
    <UiText
      size="m"
      class="full-widget-date-picker__title"
    >
      {{ title }}
    </UiText>

    <UiCarousel class="full-widget-date-picker__carousel">
      <UiCarouselItem
        v-for="(day, index) in days"
        :key="index"
      >
        <DatePickerItem
          :day="day"
          class="full-widget-date-picker__item"
          @click="$emit('update:date-selected', day)"
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

<style lang="scss" src="./DatePicker.scss"></style>
