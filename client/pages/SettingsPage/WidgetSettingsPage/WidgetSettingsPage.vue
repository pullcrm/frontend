<template>
  <SettingsLayout
    class="widget-settings-page"
  >
    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="widget-settings-page__title"
      >
        Онлайн запис
      </UiTitle>

      <Section
        title="Увімкнути онлайн запис"
        sub-title="Дозволити користувачам записуватися через віджет"
      >
        <template #append>
          <UiSwitch
            :value="settings.isActive"
            size="m"
            @input="setActive"
          />
        </template>
      </Section>

      <UiDivider />

      <UiText
        class="widget-settings-page__time"
        size="l"
        responsive
      >
        <span>Клієнт може записатися на запис не раніше ніж за:</span>

        <UiSelect
          label-key="name"
          :value="minTime"
          :options="durationList"
          required
          :clearable="false"
          placeholder="Вибрати час"
          @input="setMinutesBefore"
        >
          <template #input="{ onFocus }">
            <UiText
              size="m"
              responsive
              right-icon="outlined/caret-down"
              @click.native="onFocus"
            >
              {{ minTime.name }} до початку
            </UiText>
          </template>
        </UiSelect>
      </UiText>
    </UiPanel>

    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="widget-settings-page__title"
      >
        Інтеграція віджету на вашому сайті
      </UiTitle>

      <UiContent
        class="widget-settings-page__code"
      >
        <p>
          Віджет дозволяє вибрати співробітника, послугу, доступний день та час для створення запису у межах вашої компанії.
        </p>

        <p>
          <strong>Скрипт для ініціалізації віджету</strong>
        </p>

        <pre>
          <code v-text="htmlCode" />
        </pre>

        <p>Для відкриття віджету, додайте на сайті тег із посиланням на сайт https://pullcrm.com, це посилання буде відкривати віджет.</p>

        <p>Посилання може мати будь-яку структуру, текст чи вкладеність.</p>

        <pre>
          <code
            v-text="htmlCodeButton"
          />
        </pre>

        <p>
          <strong>Зверніть увагу:</strong>
          Посилання не дозволяється закривати від індексації будь-якими способами, це єдине правило використання віджету.
        </p>
      </UiContent>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_REMIND_DURATIONS } from '~/constants/time'

import { minutesToTime } from '~/utils/time'

import UiContent from '~/ui/Content/Content.vue'

import Section from '../components/Section.vue'
import SettingsLayout from '../components/Layout.vue'

import { code, codeButton } from './code'

@Component({
  layout: 'dashboard',

  components: {
    Section,
    UiContent,
    SettingsLayout
  },

  head () {
    return {
      title: 'Налаштування онлайн запису - pullcrm'
    }
  }
})
export default class WidgetSettingsPage extends Vue {
  settings = this.$typedStore.getters['position/widgetSettings']

  get companyId () {
    return this.$typedStore.getters['position/companyId']
  }

  get minTime () {
    return {
      name: minutesToTime(this.settings.minutesBefore),
      value: this.settings.minutesBefore
    }
  }

  get durationList () {
    return SMS_REMIND_DURATIONS.map(minutes => ({
      name: minutesToTime(minutes),
      value: minutes
    }))
  }

  get htmlCode () {
    return code
      .trim()
      .replace('{ companyId }', this.companyId)
  }

  get htmlCodeButton () {
    return codeButton.trim()
  }

  setActive (event) {
    this.settings.isActive = event

    this.submit()
  }

  setMinutesBefore (event) {
    this.settings.minutesBefore = event.value

    this.submit()
  }

  async submit () {
    await this.$api.settings.widgetUpdate(
      this.settings
    )

    await this.$typedStore.dispatch('toasts/show', {
      title: 'Збережено!'
    })
  }
}
</script>

<style lang="scss" src="./WidgetSettingsPage.scss"></style>
