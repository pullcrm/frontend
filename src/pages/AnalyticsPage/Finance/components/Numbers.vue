<template>
  <div class="analytics-page-finance-numbers">
    <div class="ui-grid">
      <NumberBlock
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
          {{ item.total }}
        </UiTitle>
      </NumberBlock>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { formatMoney } from '@/utils/money'

import NumberBlock from '@/components/NumberBlock/NumberBlock.vue'

@Component({
  components: {
    NumberBlock
  }
})
export default class Numbers extends Vue {
  numbers = [
    {
      name: 'Продажи',
      total: 15,
      theme: 'blue',
      icon: 'solid/shopping-cart-fill',
      info: 'test'
    },
    {
      name: 'Доход',
      total: formatMoney(7245),
      theme: 'green',
      icon: 'solid/wallet-fill',
      info: 'test'
    },
    {
      name: 'Средний чек',
      total: formatMoney(1080),
      theme: 'yellow',
      icon: 'solid/receipt-fill',
      info: 'test'
    }
  ]
}
</script>
