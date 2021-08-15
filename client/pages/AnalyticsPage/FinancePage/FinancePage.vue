<template>
  <AnalyticsLayout
    class="analytics-finance-page"
  >
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
          {{ startDate | formatDate('D') }} - {{ endDate | formatDate('D MMMM YYYY') }}
        </UiText>

        <template #body>
          <DataPicker
            v-model="dates"
            range
            :disabled-date="notAfterToday"
            @input="fetch"
          />
        </template>
      </UiPopover>

      <UiField>
        <UiSelect
          v-model="specialist"
          :options="specialists"
          clearable
          label-key="fullName"
          placeholder="Все сотрудники"
          @input="fetch"
        />
      </UiField>
    </div>

    <Numbers
      class="analytics-finance-page__numbers"
    />

    <FinanceTable
      class="analytics-finance-page__table"
    />
  </AnalyticsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'

import DataPicker from '~/components/DatePicker/DatePicker.vue'

import AnalyticsLayout from '../components/AnalyticsLayout.vue'

import Numbers from './components/Numbers.vue'
import FinanceTable from './components/Table.vue'

@Component({
  layout: 'dashboard',

  components: {
    Numbers,
    DataPicker,
    FinanceTable,
    AnalyticsLayout
  },

  async asyncData ({ typedStore }) {
    const startDate = dayjs().subtract(14, 'day')
    const endDate = dayjs()

    await typedStore.dispatch('analytics/fetchFinanceStats', {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    })

    return {
      dates: [
        startDate.toDate(),
        endDate.toDate()
      ]
    }
  },

  head () {
    return {
      title: 'Аналитика финансов - pullcrm'
    }
  }
})
export default class FinancePage extends Vue {
  dates: Date[]
  specialist = null

  get startDate () {
    return this.dates[0]
  }

  get endDate () {
    return this.dates[1]
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
  }

  // TODO: Add validation about maximum days for one pick
  async fetch () {
    await this.$typedStore.dispatch('analytics/fetchFinanceStats', {
      startDate: dayjs(this.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(this.endDate).format('YYYY-MM-DD'),
      specialistId: this.specialist?.id
    })
  }

  notAfterToday (date) {
    return date > new Date(new Date().setHours(0, 0, 0, 0))
  }
}
</script>

<style lang="scss" src="./FinancePage.scss"></style>
