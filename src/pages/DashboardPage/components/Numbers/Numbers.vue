<script lang="ts" setup>
import { formatMoney } from '~/utils/money'
import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

const analyticsStore = useAnalyticsStore()

const simpleStats = computed(() => {
  return analyticsStore.simpleStats
})

const dayTotal = computed(() => {
  return simpleStats.value.dayTotal
})

const monthTotal = computed(() => {
  return simpleStats.value.monthTotal
})

const monthAverage = computed(() => {
  return simpleStats.value.monthAverage
})

const numbers = computed(() => {
  return [
    {
      name: 'Дохід за сьогодні',
      total: dayTotal.value,
      theme: 'blue',
      icon: 'solid/sun-horizon-fill',
    },

    {
      name: 'Дохід за поточний місяць',
      total: monthTotal.value,
      theme: 'green',
      icon: 'solid/calendar-fill',
    },

    {
      name: 'Середній чек за місяць',
      total: monthAverage.value,
      theme: 'yellow',
      icon: 'solid/receipt-fill',
    },
  ]
})
</script>

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
      Огляд
    </UiTitle>

    <div class="ui-grid">
      <InfoPanel
        v-for="(item, index) in numbers"
        :key="`item-${index}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4',
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
          {{ formatMoney(item.total) }}
        </UiTitle>
      </InfoPanel>
    </div>
  </div>
</template>

<style lang="scss" src="./Numbers.scss"></style>
