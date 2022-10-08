<script lang="ts" setup>
import Numbers from './components/Numbers.vue'
import LineChart from './components/LineChart.vue'
import DatePicker from '~/components/DatePicker/DatePicker.vue'
import dayjs from '~/utils/dayjs'
import { formatDate } from '~/utils/date-time'

useMeta({
  title: 'Аналітика по записам - pullcrm',
})

const toastsStore = useToastsStore()
const analyticsStore = useAnalyticsStore()

const dates = ref<Date[]>(analyticsStore.dates as Date[])

const startDate = computed(() => {
  return dates.value[0]
})

const endDate = computed(() => {
  return dates.value[1]
})

const appointmentsList = computed(() => {
  return analyticsStore.appointmentsList
})

const lineChartKey = computed(() => {
  return appointmentsList.value.map((item: any) => item.step).join('')
})

// TODO: Add second validation about maximum days for one pick
async function fetch() {
  if (validateDate() === false) {
    return toastsStore.show({
      title: 'Фільтрування доступне при виборі дат від двох днів',
      type: 'error',
    })
  }

  await analyticsStore.fetchAppointmentsStats({
    startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
    endDate: dayjs(endDate.value).format('YYYY-MM-DD'),
  })
}

function validateDate() {
  return dayjs(startDate.value).isSame(dayjs(endDate.value), 'day') === false
}

function notAfterToday(date: Date) {
  return date > new Date(new Date().setHours(0, 0, 0, 0))
}
</script>

<template>
  <div class="analytics-appointments-page">
    <div class="analytics-appointments-page__header">
      <UiPopover
        size="m"
        placement="bottom_start"
      >
        <UiText
          size="m"
          right-icon="outlined/caret-down"
        >
          <template #prepend>
            <UiIcon
              size="s"
              name="outlined/calendar"
            />
          </template>

          {{ formatDate(startDate, 'D') }} - {{ formatDate(endDate, 'D MMMM YYYY') }}
        </UiText>

        <template #body>
          <DatePicker
            v-model="dates"
            range
            :disabled-date="notAfterToday"
            @update:model-value="fetch"
          />
        </template>
      </UiPopover>
    </div>

    <Numbers
      class="analytics-appointments-page__numbers"
    />

    <LineChart
      :key="lineChartKey"
      :appointments-list="appointmentsList"
    />
  </div>
</template>

<style lang="scss" src="./AppointmentsPage.scss"></style>
