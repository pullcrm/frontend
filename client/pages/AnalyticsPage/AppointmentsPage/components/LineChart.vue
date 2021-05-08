<template>
  <div class="analytics-appointments-page-line-chart">
    <Chart
      :chart="chart"
      class="analytics-appointments-page-line-chart__chart"
    >
      <template #point="{ point }">
        <div class="analytics-appointments-page-line-chart__point">
          <UiText
            class="_blue"
            size="m"
            left-icon="solid/circle-fill"
            responsive
          >
            Всего

            <template #append>
              {{ point.value }}
            </template>
          </UiText>

          <UiText
            class="_green"
            size="m"
            left-icon="solid/circle-fill"
            responsive
          >
            Выполнено

            <template #append>
              {{ point.info.completed }}
            </template>
          </UiText>

          <UiText
            class="_orange"
            size="m"
            left-icon="solid/circle-fill"
            responsive
          >
            Офлайн

            <template #append>
              {{ point.info.offline }}
            </template>
          </UiText>

          <UiText
            class="_purple"
            size="m"
            left-icon="solid/circle-fill"
            responsive
          >
            Онлайн

            <template #append>
              {{ point.info.online }}
            </template>
          </UiText>
        </div>
      </template>
    </Chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import LineChart from '~/services/line-chart'

import dayjs from '~/utils/dayjs'

import Chart from '~/components/Chart/Chart.vue'

@Component({
  components: {
    Chart
  },

  props: {
    appointmentsList: {
      type: Array,
      required: true
    }
  }
})
export default class AppointmentLineChart extends Vue {
  readonly appointmentsList!: any[]

  chart:
    | LineChart
    | null
    = null

  constructor () {
    super()

    this.chart = new LineChart(this.list, {
      width: 768,
      height: 420
    })
  }

  get list () {
    return this.appointmentsList.map((item) => {
      return {
        value: item.amount,
        label: dayjs(item.step).format('DD'),
        info: item
      }
    })
  }
}
</script>

<style lang="scss" src="./LineChart.scss"></style>
