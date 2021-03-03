<template>
  <div class="analytics-page-appointments-numbers">
    <div class="ui-grid">
      <NumberBlock
        v-for="(item, index) in numbers"
        :key="`item-${index}`"
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
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

import NumberBlock from '@/components/NumberBlock/NumberBlock.vue'

@Component({
  components: {
    NumberBlock
  }
})
export default class Numbers extends Vue {
  numbers = [
    {
      name: 'Всего записей',
      total: 78,
      theme: 'blue',
      icon: 'solid/list',
      info: 'test'
    },
    {
      name: 'Выполнено',
      total: 75,
      theme: 'green',
      icon: 'solid/check-circle-fill',
      info: 'test'
    },
    {
      name: 'Офлайн',
      total: 10,
      theme: 'yellow',
      icon: 'solid/device-mobile-camera-fill',
      info: 'test'
    },
    {
      name: 'Онлайн',
      total: 65,
      theme: 'purple',
      icon: 'outlined/globe',
      info: 'test'
    }
  ]
}
</script>
