<script lang="ts" setup>
import dayjs from '~/utils/dayjs'
import { api } from '~/boot/api'
import DatePicker from '~/components/DatePicker/DatePicker.vue'
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
const allowedDatesByCurrentMonth = ref<string[]>([])

const isDisabled = computed(() => {
  return !dates.value?.length
})

const markers = computed(() => {
  return Object.keys(currentTimetable.value).map((date) => {
    return {
      date: new Date(date),
      type: 'line',
      color: '#4dbd71',
      tooltip: [currentTimetable.value[date]]
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
  if (!dates.value?.length) {
    return {
      allowedDates: allowedDatesByCurrentMonth.value,
    }
  }

  if (!isSelectedCurrentTimetable.value) {
    return {
      allowedDates: allowedDatesByCurrentMonth.value,
      disabledDates: Object.keys(currentTimetable.value),
    }
  }

  const selected = formatDate((dates.value as Date[])[0], 'YYYY-MM-DD')
  const { start, end } = currentTimetable.value[selected]

  const allowedDates = Object.keys(currentTimetable.value)
    .filter((date: string) => {
      const record = currentTimetable.value[date]

      return record.start === start && record.end === end
    })

  return { allowedDates }
})

async function fetch(date: dayjs.Dayjs) {
  try {
    isCalendarLoading.value = true

    const result = await api.timetable.find(specialist.value.id, {
      startDate: date.format('YYYY-MM-01'),
      endDate: date.format(`YYYY-MM-${date.daysInMonth()}`),
    })

    const filtered = result.map((item: any) => {
      return {
        date: formatDate(item.startDateTime, 'YYYY-MM-DD'),
        start: formatDate(item.startDateTime, 'HH:mm'),
        end: formatDate(item.endDateTime, 'HH:mm'),
        ...item,
      }
    })

    currentTimetable.value = filtered.reduce((dict, item) => {
      return {
        ...dict,
        [item.date]: item,
      }
    }, {})

    allowedDatesByCurrentMonth.value = Array
      .from({ length: date.daysInMonth() })
      .map((_, index) => {
        return date.date(index + 1).format('YYYY-MM-DD')
      })
  }
  finally {
    isCalendarLoading.value = false
  }
}

onBeforeMount(() => fetch(dayjs(new Date())))

async function onReload() {
  dates.value = null

  await fetch(dayjs(new Date()))
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

async function onUpdateMonthYear({ month, year }: any) {
  dates.value = null

  await fetch(dayjs(new Date()).month(month).year(year))
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
        @update-month-year="onUpdateMonthYear"
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
