<template>
  <AnalyticsLayout
    class="analytics-page-appointments"
  >
    <div class="analytics-page-appointments__header">
      <UiPopover
        size="m"
        placement="bottom_start"
      >
        <UiText
          size="m"
          left-icon="outlined/calendar"
          right-icon="outlined/caret-down"
        >
          {{ date[0] | formatDate('D') }} - {{ date[1] | formatDate('D MMMM YYYY') }}
        </UiText>

        <template #body>
          <UiCalendar v-model="date" />
        </template>
      </UiPopover>
    </div>

    <Numbers
      class="analytics-page-appointments__numbers"
    />

    <LineChart
      :appointments-list="appointmentsList"
    />
  </AnalyticsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import AnalyticsLayout from '../components/Layout.vue'

import Numbers from './components/Numbers.vue'
import LineChart from './components/LineChart.vue'

@Component({
  components: {
    Numbers,
    LineChart,
    AnalyticsLayout
  }
})
export default class Appointments extends Vue {
  appointmentsList = []

  dateFrom = new Date()
  dateTo = new Date()

  constructor () {
    super()

    // this.appointmentsList = JSON.parse(this.$localStorage.getItem('pricesHistory') || '[]')

    let index = 1

    while (index <= 30) {
      this.appointmentsList.push({
        label: `${index}`,
        total: (Math.random() * 100).toFixed(0)
      })

      index++
    }

    // this.$localStorage.setItem('pricesHistory', JSON.stringify(this.appointmentsList))
  }

  get date () {
    return [this.dateFrom, this.dateTo]
  }

  set date (val) {
    this.dateFrom = val[0]
    this.dateTo = val[1]
  }
}
</script>

<style lang="scss" src="./Appointments.scss"></style>
