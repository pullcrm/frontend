<script lang="ts" setup>
import LineChart from '~/services/line-chart'

import dayjs from '~/utils/dayjs'

import Chart from '~/components/Chart/Chart.vue'

const props = defineProps({
  appointmentsList: {
    type: Array,
    required: true,
  },
})

const list = computed(() => {
  return props.appointmentsList.map((item: any) => {
    return {
      value: item.amount,
      label: dayjs(item.step).format('DD'),
      info: item,
    }
  })
})

const chart = ref<LineChart>(new LineChart(list.value, {
  width: 768,
  height: 420,
}))
</script>

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
            Всього

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
            Виконано

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

<style lang="scss" src="./LineChart.scss"></style>
