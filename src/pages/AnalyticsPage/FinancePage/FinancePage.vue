<script lang="ts" setup>
import Numbers from './components/Numbers.vue'
import FinanceTable from './components/Table.vue'
import DatePicker from '~/components/DatePicker/DatePicker.vue'
import dayjs from '~/utils/dayjs'
import { formatDate } from '~/utils/date-time'

useMeta({
  title: 'Аналітика фінансів - pullcrm',
})

const toastsStore = useToastsStore()
const analyticsStore = useAnalyticsStore()
const specialistsStore = useSpecialistsStore()

const specialist = ref<any | null>(null)

const dates = ref<Date[]>(analyticsStore.dates as Date[])

const startDate = computed(() => {
  return dates.value[0]
})

const endDate = computed(() => {
  return dates.value[1]
})

const specialists = computed(() => {
  return specialistsStore.specialists
})

// TODO: Add validation about maximum days for one pick
async function fetch() {
  await analyticsStore.fetchFinanceStats({
    startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
    endDate: dayjs(endDate.value).format('YYYY-MM-DD'),
    specialistId: specialist.value?.id,
  })
}

function notAfterToday(date: Date) {
  return date > new Date(new Date().setHours(0, 0, 0, 0))
}
</script>

<template>
  <div class="analytics-finance-page">
    <div class="analytics-finance-page__header">
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

      <UiField>
        <UiSelect
          v-model="specialist"
          :options="specialists"
          clearable
          label-key="fullName"
          placeholder="Всі співробітники"
          @update:model-value="fetch"
        />
      </UiField>
    </div>

    <Numbers
      class="analytics-finance-page__numbers"
    />

    <FinanceTable
      class="analytics-finance-page__table"
    />
  </div>
</template>

<style lang="scss" src="./FinancePage.scss"></style>
