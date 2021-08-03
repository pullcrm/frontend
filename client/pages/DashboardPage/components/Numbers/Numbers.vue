<template>
  <div
    v-if="simpleStats"
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

import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

@Component({
  components: {
    InfoPanel
  }
})
export default class Numbers extends Vue {
  get simpleStats () {
    return this.$typedStore.state.analytics.simpleStats
  }

  get dayTotal () {
    return this.simpleStats.dayTotal
  }

  get monthTotal () {
    return this.simpleStats.monthTotal
  }

  get monthAverage () {
    return this.simpleStats.monthAverage
  }

  get numbers () {
    return [
      {
        name: 'Доход за сегодня',
        total: this.dayTotal,
        theme: 'blue',
        icon: 'solid/sun-horizon-fill'
      },

      {
        name: 'Доход за текущий месяц',
        total: this.monthTotal,
        theme: 'green',
        icon: 'solid/calendar-fill'
      },

      {
        name: 'Средний чек за месяц',
        total: this.monthAverage,
        theme: 'yellow',
        icon: 'solid/receipt-fill'
      }
    ]
  }
}
</script>

<style lang="scss" src="./Numbers.scss"></style>
