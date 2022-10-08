<script lang="ts" setup>
import dayjs from '~/utils/dayjs'

import DatePicker from '~/components/DatePicker/DatePicker.vue'

defineEmits(['input'])

const router = useRouter()

const scheduleStore = useScheduleStore()
// const timetableStore = useTimetableStore()

const date = computed<Date>({
  get() {
    return new Date(scheduleStore.date) as Date
  },

  set(val) {
    const date = dayjs(val).format('YYYY-MM-DD')

    router.replace({
      query: { date },
    })

    scheduleStore.date = date
    scheduleStore.fetch()
  },
})

const isToday = computed(() => {
  return dayjs(date.value).isToday()
})

const isTomorrow = computed(() => {
  return dayjs(date.value).isTomorrow()
})

// const timetable = computed(() => {
//   return timetableStore.normalizeTimetable
// })

function setToday() {
  if (isToday.value)
    return

  date.value = new Date()
}

function setTomorrow() {
  if (isTomorrow.value)
    return

  date.value = dayjs().add(1, 'day').toDate()
}

// function getClasses(date: string) {
//   const day = dayjs(date).locale('en').format('dddd').toLowerCase()

//   if (timetable.value[day]?.opened === false)
//     return '_closed'
// }
</script>

<template>
  <div class="schedule-page-queue-schedule-date-picker">
    <!-- :get-classes="getClasses" -->
    <!-- title-format="DD.MM.YYYY" -->
    <DatePicker
      v-model="date"
      class="schedule-page-queue-schedule-date-picker__date-picker"
    />

    <div class="schedule-page-queue-schedule-date-picker__footer">
      <UiText
        tag="a"
        href="#"
        size="m"
        :class="[
          'schedule-page-queue-schedule-date-picker__button',
          { 'active': isToday },
        ]"
        data-test="date-picker-today"
        @click.prevent="setToday"
      >
        Сьогодні
      </UiText>

      <UiText
        tag="a"
        href="#"
        size="m"
        :class="[
          'schedule-page-queue-schedule-date-picker__button',
          { 'active': isTomorrow },
        ]"
        data-test="date-picker-tomorrow"
        @click.prevent="setTomorrow"
      >
        Завтра
      </UiText>
    </div>
  </div>
</template>

<style lang="scss" src="./ScheduleDatePicker.scss"></style>
