<template>
  <div class="settings-page-layout">
    <UiContainer>
      <UiTitle
        class="settings-page-layout__title"
      >
        Настройки компании
      </UiTitle>

      <UiNavigation
        class="settings-page-layout__navigation"
        :navigation="navigation"
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

@Component({})
export default class SettingsLayout extends Vue {
  get navigation () {
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

  &__navigation {
    margin-bottom: 24px;
  }
}
</style>
