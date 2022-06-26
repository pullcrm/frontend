<script lang="ts" setup>
import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

const analyticsStore = useAnalyticsStore()

const appointmentsStats = computed(() => {
  return analyticsStore.appointmentsStats
})

const total = computed(() => {
  return appointmentsStats.value.total
})

const completed = computed(() => {
  return appointmentsStats.value.completed
})

const offline = computed(() => {
  return appointmentsStats.value.offline
})

const online = computed(() => {
  return appointmentsStats.value.online
})
</script>

<template>
  <div class="analytics-appointments-page-numbers">
    <div class="ui-grid">
      <InfoPanel
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6',
          'ui-grid-item_laptop_3',
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
          'ui-grid-item_laptop_3',
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
          'ui-grid-item_laptop_3',
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
          'ui-grid-item_laptop_3',
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
