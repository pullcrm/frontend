<template>
  <div class="settings-page-layout">
    <UiContainer>
      <UiTitle
        class="settings-page-layout__title"
      >
        Настройки компании
      </UiTitle>

      <UiTabs
        class="settings-page-layout__tabs"
        :tabs="tabs"
      />
    </UiContainer>

    <UiContainer narrow>
      <UiPanel
        responsive
      >
        <slot />
      </UiPanel>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTabs from '@/ui/Tabs/Tabs.vue'

@Component({
  components: {
    UiTabs
  }
})
export default class SettingsLayout extends Vue {
  get tabs () {
    return [
      {
        name: 'Информация',
        to: { name: 'companySettings' }
      },

      // {
      //   name: 'Время работы',
      //   to: { name: 'smsSettings' }
      // },

      {
        name: 'SMS оповещение',
        to: { name: 'smsSettings' }
      },

      {
        name: 'Интеграция виджета',
        to: { name: 'widgetSettings' }
      }
    ]
  }
}
</script>

<style lang="scss">
.settings-page-layout {
  &__title {
    margin-bottom: 24px;
  }

  &__tabs {
    margin-bottom: 24px;
  }
}
</style>
