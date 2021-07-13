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
        Онлайн запись
      </UiTitle>

      <Section
        title="Включить онлайн запись"
        sub-title="Разрешить пользователям записываться через виджет"
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
        <span>Клиент может записаться на запись не ранее чем за:</span>

        <UiSelect
          label-key="name"
          :value="minTime"
          :options="durationList"
          required
          :clearable="false"
          placeholder="Выбрать время"
          @input="setMinutesBefore"
        >
          <template #input="{ onFocus }">
            <UiText
              size="m"
              responsive
              right-icon="outlined/caret-down"
              @click.native="onFocus"
            >
              {{ minTime.name }} до начала
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
        Интеграция виджета на вашем сайте
      </UiTitle>

      <UiContent
        class="widget-settings-page__code"
      >
        <p>
          Виджет позволяет выбрать сотрудника, услугу, доступный день и время для создания записи в рамках вашей компании.
        </p>

        <p>Для открытия виджета, добавте на сайте тег с сылкой на сайт https://pullcrm.com, эта ссылка будет запускать виджет</p>

        <p>Код инициализации виджета на вашем сайте</p>

        <pre>
          <code v-text="htmlCode" />
        </pre>
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

import { code } from './code'

@Component({
  layout: 'dashboard',

  components: {
    Section,
    UiContent,
    SettingsLayout
  },

  head () {
    return {
      title: 'Настройки онлайн записи - pullcrm'
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
      title: 'Сохранено!'
    })
  }
}
</script>

<style lang="scss" src="./WidgetSettingsPage.scss"></style>
