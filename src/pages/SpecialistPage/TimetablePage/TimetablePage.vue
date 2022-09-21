<script lang="ts" setup>
import DatePicker from '~/components/DatePicker/DatePicker.vue'
import { fetchTimetable } from '~/logics/timetable'
import { formatDate } from '~/utils/date-time'

useMeta({
  title: 'Графік роботи спеціаліста - pullcrm',
})

const popupStore = usePopupStore()
const specialistStore = useSpecialistStore()

const specialist = ref(specialistStore.specialist)

const dates = ref<Date[] | null>(null)

const currentTimetable = ref<Record<string, any>>({})

const isCalendarLoading = ref(false)

const isDisabled = computed(() => {
  return !dates.value?.length
})

const markers = computed(() => {
  return Object.keys(currentTimetable.value).map((date) => {
    const records = currentTimetable.value[date]

    return {
      date: new Date(date),
      type: 'line',
      color: '#4dbd71',
      tooltip: records
        .map(({ startDateTime, endDateTime }: any) => ({
          text: `${formatDate(startDateTime, 'HH:mm')} - ${formatDate(endDateTime, 'HH:mm')}`,
          color: '#4dbd71',
        })),
    }
  })
})

const isSelectedCurrentTimetable = computed(() => {
  return (dates.value || []).some(date => currentTimetable.value[formatDate(date, 'YYYY-MM-DD')])
})

const datesAttributes = computed(() => {
  if (!dates.value?.length)
    return {}

  if (!isSelectedCurrentTimetable.value)
    return { disabledDates: Object.keys(currentTimetable.value) }

  const selected = formatDate((dates.value as Date[])[0], 'YYYY-MM-DD')
  const { start, end } = currentTimetable.value[selected][0]

  const allowedDates = Object.keys(currentTimetable.value)
    .filter((date: string) => {
      const record = currentTimetable.value[date][0]

      return record.start === start && record.end === end
    })

  return { allowedDates }
})

async function fetch() {
  isCalendarLoading.value = true

  currentTimetable.value = await fetchTimetable(specialist.value.id)

  isCalendarLoading.value = false
}

onBeforeMount(fetch)

async function onReload() {
  await fetch()

  dates.value = null
}

async function onSubmit() {
  if (isSelectedCurrentTimetable.value) {
    await popupStore.show({
      name: 'timetable-edit',
      props: {
        dates: dates.value,
        timeWork: currentTimetable.value,
        onReload,
      },
    })

    return
  }

  popupStore.show({
    name: 'timetable-new',
    props: {
      dates: dates.value,
      specialistId: specialist.value.id,
      onReload,
    },
  })
}
</script>

<template>
  <div class="specialist-timetable-page">
    <div class="specialist-timetable-page__inner">
      <UiAlert
        type="info"
        left-icon="outlined/warning-circle"
        class="specialist-timetable-page__alert"
      >
        Виберіть день щоб змінити графік роботи. Виберіть декілька днів щоб виконати массові змінити.
      </UiAlert>

      <!-- hide-offset-dates -->
      <DatePicker
        v-model="dates"
        multi-dates
        :markers="markers"
        :readonly="isCalendarLoading"
        v-bind="datesAttributes"
        class="specialist-timetable-page__date-picker"
      />

      <UiButton
        class="specialist-timetable-page__button"
        type="submit"
        size="m"
        theme="blue"
        :disabled="isDisabled"
        @click="onSubmit"
      >
        <template v-if="!dates">
          Виберіть дати
        </template>

        <template v-else-if="isSelectedCurrentTimetable">
          Змінити графік
        </template>

        <template v-else>
          Додати графік
        </template>
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" src="./TimetablePage.scss"></style>
