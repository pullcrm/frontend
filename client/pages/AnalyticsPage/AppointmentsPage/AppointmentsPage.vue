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
  layout: 'dashboard',

  components: {
    Numbers,
    LineChart,
    AnalyticsLayout
  },

  async asyncData ({ typedStore }) {
    const startDate = dayjs().subtract(14, 'day')
    const endDate = dayjs()

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
  },

  head () {
    return {
      title: 'Аналитика по записям - pullcrm'
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
    if (this.validateDate() === false) {
      return this.$typedStore.dispatch('toasts/show', {
        title: 'Фильтрация доступна при выборе дат от двух дней',
        type: 'error'
      })
    }

    await this.$typedStore.dispatch('analytics/fetchAppointmentsStats', {
      startDate: dayjs(this.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(this.endDate).format('YYYY-MM-DD')
    })
  }

  validateDate () {
    return dayjs(this.startDate).isSame(dayjs(this.endDate), 'day') === false
  }
}
</script>

<style lang="scss" src="./AppointmentsPage.scss"></style>
