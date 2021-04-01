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
      <InfoPanel
        v-for="(item, index) in numbers"
        :key="`item-${index}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4'
        ]"
        v-bind="item"
      >
        <UiText
          size="m"
          responsive
        >
          {{ item.name }}
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ item.total | price }}
        </UiTitle>
      </InfoPanel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import InfoPanel from '@/components/InfoPanel/InfoPanel.vue'

@Component({
  components: {
    InfoPanel
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
      total: day.total,
      theme: 'blue',
      icon: 'solid/sun-horizon-fill'
    })

    this.numbers.push({
      name: 'Доход за текущий месяц',
      total: month.total,
      theme: 'green',
      icon: 'solid/calendar-fill'
    })

    this.numbers.push({
      name: 'Средний чек за месяц',
      total: month.average,
      theme: 'yellow',
      icon: 'solid/receipt-fill'
    })
  }
}
</script>

<style lang="scss" src="./Numbers.scss"></style>
