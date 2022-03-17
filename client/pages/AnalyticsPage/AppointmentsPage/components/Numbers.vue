<template>
  <div class="analytics-appointments-page-numbers">
    <div class="ui-grid">
      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="blue"
        icon="solid/list"
        info="Включаючи невиконані та скасовані"
      >
        <UiText
          size="m"
          responsive
        >
          Всього записів
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
          'ui-grid-item_laptop_3'
        ]"
        theme="green"
        icon="solid/check-circle-fill"
        info="Тільки оплачені"
      >
        <UiText
          size="m"
          responsive
        >
          Виконано
        </UiText>

        <UiTitle
          size="s"
          responsive
        >
          {{ completed }}
        </UiTitle>
      </InfoPanel>

      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="yellow"
        icon="solid/device-mobile-camera-fill"
        info="Створені менеджером через адмінку"
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
      </InfoPanel>

      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3'
        ]"
        theme="purple"
        icon="outlined/globe"
        info="Створені через віджет"
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
  get appointmentsStats () {
    return this.$typedStore.state.analytics.appointmentsStats
  }

  get total () {
    return this.appointmentsStats.total
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
