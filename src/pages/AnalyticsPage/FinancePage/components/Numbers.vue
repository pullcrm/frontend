<script lang="ts" setup>
import { formatMoney } from '~/utils/money'
import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

const analyticsStore = useAnalyticsStore()

const financeStats = computed(() => {
  return analyticsStore.financeStats
})

const total = computed(() => {
  return financeStats.value.total
})

const income = computed(() => {
  return financeStats.value.income
})

const average = computed(() => {
  return financeStats.value.average
})
</script>

<template>
  <div class="analytics-finance-page-numbers">
    <div class="ui-grid">
      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4',
        ]"
        theme="blue"
        icon="solid/shopping-cart-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Продажі
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ total }}
        </UiTitle>
      </InfoPanel>

      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4',
        ]"
        theme="green"
        icon="solid/wallet-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Дохід
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ formatMoney(income) }}
        </UiTitle>
      </InfoPanel>

      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4',
        ]"
        theme="yellow"
        icon="solid/receipt-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Середній чек
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ formatMoney(income / total) }}
        </UiTitle>
      </InfoPanel>
    </div>
  </div>
</template>
