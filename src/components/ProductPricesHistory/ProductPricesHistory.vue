<template>
  <div class="product-prices-history">
    <div class="product-prices-history__range">
      <UiText
        size="xs"
        responsive
      >
        {{ maxAvailablePrice }}
      </UiText>

      <UiText
        v-if="minAvailablePrice !== maxAvailablePrice"
        size="xs"
        responsive
      >
        {{ minAvailablePrice }}
      </UiText>
    </div>

    <Chart
      :chart="chart"
      class="product-prices-history__chart"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PricesChart from '@/services/prices-chart'

import Chart from './Chart/Chart.vue'

@Component({
  components: {
    Chart
  },

  props: {
    pricesHistory: {
      type: Array,
      required: true
    }
  }
})
export default class ProductPricesHistory extends Vue {
  readonly pricesHistory!: any[]

  chart:
    | PricesChart
    | null
    = null

  constructor () {
    super()

    this.chart = new PricesChart(this.prices, {
      width: 768,
      height: 340,
      pointRadius: 7
    })
  }

  get prices () {
    return this.pricesHistory.map((item) => {
      return {
        price: item.total,
        label: item.label
      }
    })
  }

  get minAvailablePrice () {
    return this.chart.minAvailablePrice
  }

  get maxAvailablePrice () {
    return this.chart.maxAvailablePrice
  }
}
</script>

<style lang="scss" src="./ProductPricesHistory.scss"></style>
