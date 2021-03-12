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
          left-icon="outlined/calendar"
          right-icon="outlined/caret-down"
        >
          {{ startDate | formatDate('D') }} - {{ endDate | formatDate('D MMMM YYYY') }}
        </UiText>

        <template #body>
          <UiCalendar
            v-model="dates"
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

import store from '@/store'

import dayjs from '@/utils/dayjs'

import AnalyticsLayout from '../components/Layout.vue'

import Numbers from './components/Numbers.vue'
import FinanceTable from './components/Table.vue'

@Component({
  components: {
    Numbers,
    FinanceTable,
    AnalyticsLayout
  },

  async beforeRouteEnter (_to, _from, next) {
    const startDate = dayjs().date(1)
    const endDate = dayjs().date(dayjs().daysInMonth())

    await store.dispatch('analytics/fetchFinanceStats', {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    })

    next((vm: FinancePage) => {
      vm.dates = [startDate.toDate(), endDate.toDate()]
    })
  }
})
export default class FinancePage extends Vue {
  dates = [new Date(), new Date()]
  specialist = null

  get startDate () {
    return this.dates[0]
  }

  get endDate () {
    return this.dates[1]
  }

  get specialists () {
    return this.$store.state.specialists.specialists
  }

  async fetch () {
    await store.dispatch('analytics/fetchFinanceStats', {
      startDate: dayjs(this.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(this.endDate).format('YYYY-MM-DD'),
      specialistId: this.specialist?.id
    })
  }
}
</script>

<style lang="scss" src="./FinancePage.scss"></style>
