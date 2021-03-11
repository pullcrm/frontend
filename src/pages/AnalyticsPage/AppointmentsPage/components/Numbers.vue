<template>
  <div class="analytics-appointments-page-numbers">
    <div class="ui-grid">
      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="blue"
        icon="solid/list"
        info="test"
      >
        <UiText
          size="m"
          responsive
        >
          Всего записей
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
          'ui-grid-item_laptop_3'
        ]"
        theme="green"
        icon="solid/check-circle-fill"
        info="test"
      >
        <UiText
          size="m"
          responsive
        >
          Выполнено
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ completed }}
        </UiTitle>
      </NumberBlock>

      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="yellow"
        icon="solid/device-mobile-camera-fill"
        info="test"
      >
        <UiText
          size="m"
          responsive
        >
          Офлайн
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ offline }}
        </UiTitle>
      </NumberBlock>

      <NumberBlock
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="purple"
        icon="outlined/globe"
        info="test"
      >
        <UiText
          size="m"
          responsive
        >
          Онлайн
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ online }}
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
  get appointmentsStats () {
    return this.$store.state.analytics.appointmentsStats
  }

  get total () {
    return this.appointmentsStats.count
  }

  get completed () {
    return this.appointmentsStats.completed
  }

  get offline () {
    return this.appointmentsStats.offline
  }

  get online () {
    return this.appointmentsStats.online
  }
}
</script>
