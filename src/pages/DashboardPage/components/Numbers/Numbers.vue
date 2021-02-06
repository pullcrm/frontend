<template>
  <div
    v-if="numbers.length > 0"
    class="dashboard-page-numbers"
  >
    <UiTitle
      class="dashboard-page-numbers__title"
      size="s"
      responsive
    >
      Обзор
    </UiTitle>

    <div class="ui-grid">
      <NumberItem
        v-for="(item, index) in numbers"
        :key="`item-${index}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4'
        ]"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import NumberItem from './Number.vue'

@Component({
  components: {
    NumberItem
  }
})
export default class Numbers extends Vue {
  numbers = []

  async mounted () {
    await this.fetchAnalyticsSimple()
  }

  async fetchAnalyticsSimple () {
    const date = dayjs()

    const [day, month] = await Promise.all([
      this.$store.dispatch('analytics/fetchForDay', date),
      this.$store.dispatch('analytics/fetchForMonth', date)
    ])

    this.numbers.push({
      name: 'Доход за сегодня',
      value: day.total,
      theme: 'blue',
      icon: 'solid/sun-horizon-fill'
    })

    this.numbers.push({
      name: 'Доход за текущий месяц',
      value: month.total,
      theme: 'green',
      icon: 'solid/calendar-fill'
    })

    this.numbers.push({
      name: 'Средний чек за месяц',
      value: month.average,
      theme: 'yellow',
      icon: 'solid/receipt-fill'
    })
  }
}
</script>

<style lang="scss" src="./Numbers.scss"></style>
