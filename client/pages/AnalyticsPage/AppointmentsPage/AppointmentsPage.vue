<template>
  <AnalyticsLayout
    class="analytics-appointments-page"
  >
    <div class="analytics-appointments-page__header">
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
    </div>

    <Numbers
      class="analytics-appointments-page__numbers"
    />

    <LineChart
      :key="lineChartKey"
      :appointments-list="appointmentsList"
    />
  </AnalyticsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'

import AnalyticsLayout from '../components/AnalyticsLayout.vue'

import Numbers from './components/Numbers.vue'
import LineChart from './components/LineChart.vue'

@Component({
  components: {
    Numbers,
    LineChart,
    AnalyticsLayout
  },

  async asyncData ({ typedStore }) {
    const startDate = dayjs().date(1)
    const endDate = dayjs().date(dayjs().daysInMonth())

    await typedStore.dispatch('analytics/fetchAppointmentsStats', {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    })

    return {
      dates: [
        startDate.toDate(),
        endDate.toDate()
      ]
    }
  }
})
export default class AppointmentsPage extends Vue {
  dates: Date[]

  get startDate () {
    return this.dates[0]
  }

  get endDate () {
    return this.dates[1]
  }

  get appointmentsList () {
    return this.$typedStore.getters['analytics/appointmentsList']
  }

  get lineChartKey () {
    return this.appointmentsList.map(item => item.step).join('')
  }

  async fetch () {
    await this.$typedStore.dispatch('analytics/fetchAppointmentsStats', {
      startDate: dayjs(this.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(this.endDate).format('YYYY-MM-DD')
    })
  }
}
</script>

<style lang="scss" src="./AppointmentsPage.scss"></style>
