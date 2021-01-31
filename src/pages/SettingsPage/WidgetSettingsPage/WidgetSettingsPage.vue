<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <UiTitle
      class="sms-settings-page__title"
      size="l"
      responsive
    >
      Интеграция виджета
    </UiTitle>

    <UiContent>
      <p>
        Виджет позволяет выбрать сотрудника, услугу, доступный день и время для создания записи в рамках вашей компании.
      </p>

      <h3>Базовая разметка виджета для выбраной компании</h3>

      <pre class="sms-settings-page__code">
        <code v-text="htmlCode" />
      </pre>
    </UiContent>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiContent from '@/ui/Content/Content.vue'

import SettingsLayout from '../components/SettingsLayout.vue'

// @ts-ignore
import code from './code.txt'

@Component({
  components: {
    UiContent,
    SettingsLayout
  }
})
export default class WidgetSettingsPage extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }

  get companyId () {
    return this.company.id
  }

  get htmlCode () {
    return code
      .trim()
      .replace('{ companyId }', this.companyId)
  }
}
</script>

<style lang="scss" src="./WidgetSettingsPage.scss"></style>
