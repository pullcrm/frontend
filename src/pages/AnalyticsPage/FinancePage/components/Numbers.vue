<template>
  <div class="analytics-finance-page-numbers">
    <div class="ui-grid">
      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4'
        ]"
        theme="blue"
        icon="solid/shopping-cart-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Продажи
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ total }}
        </UiTitle>
      </NumberBlock>

      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4'
        ]"
        theme="green"
        icon="solid/wallet-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Доход
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ income | price }}
        </UiTitle>
      </NumberBlock>

      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_4'
        ]"
        theme="yellow"
        icon="solid/receipt-fill"
      >
        <UiText
          size="m"
          responsive
        >
          Средний чек
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ average | price }}
        </UiTitle>
      </NumberBlock>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NumberBlock from '@/components/NumberBlock/NumberBlock.vue'

@Component({
  components: {
    NumberBlock
  }
})
export default class Numbers extends Vue {
  get financeStats () {
    return this.$store.state.analytics.financeStats
  }

  get total () {
    return this.financeStats.total
  }

  get income () {
    return this.financeStats.income
  }

  get average () {
    return this.financeStats.average
  }
}
</script>
