<template>
  <AnalyticsLayout
    class="analytics-page-appointments"
  >
    <div class="analytics-page-appointments__header">
      <UiText
        size="m"
        left-icon="outlined/calendar"
        right-icon="outlined/caret-down"
      >
        1 фев – 28 фев 2021
      </UiText>
    </div>

    <Numbers
      class="analytics-page-appointments__numbers"
    />

    <ProductPricesHistory
      :prices-history="pricesHistory"
    />
  </AnalyticsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ProductPricesHistory from '@/components/ProductPricesHistory/ProductPricesHistory.vue'

import AnalyticsLayout from '../components/Layout.vue'

import Numbers from './components/Numbers.vue'

@Component({
  components: {
    Numbers,
    AnalyticsLayout,
    ProductPricesHistory
  }
})
export default class Appointments extends Vue {
  pricesHistory = []

  constructor () {
    super()

    let index = 1

    while (index < 30) {
      this.pricesHistory.push({
        label: `${index} февраля`,
        total: index === 5 ? 0 : (Math.random() * 1000).toFixed(0)
      })

      index++
    }
  }
}
</script>

<style lang="scss" src="./Appointments.scss"></style>
