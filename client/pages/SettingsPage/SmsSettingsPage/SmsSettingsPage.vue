<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <template v-if="isAuthorize">
      <UiPanel
        size="m"
        responsive
      >
        <UiTitle
          size="s"
          responsive
          class="sms-settings-page__title"
        >
          Настройки СМС
        </UiTitle>

        <Section
          title="Вы атворизованы в СМС-сервисе"
          sub-title="Вам доступны функции отправки пользователям сообщений о предстоящих записях"
        >
          <template #append>
            <UiButton
              size="s"
              theme="danger-outlined"
              @click.native="deauthorize"
            >
              Деавторизоваться
            </UiButton>
          </template>
        </Section>
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <Section
          title="Уведомить клиента после создания записи"
          sub-title="СМС отправится через 2 минуты после создания записи"
        >
          <template #append>
            <UiSwitch
              v-model="settings.hasCreationSMS"
              size="m"
            />
          </template>
        </Section>

        <SmsTemplate
          class="sms-settings-page__sms-template"
          :template="smsCreationTemplate"
          @update:template="settings.creationSMSTemplate = $event"
        >
          <template #disclaimer>
            Используйте алиасы для генерации данных: <br>
            %date% - дата в формате "28:06", <br>
            %time% - время начала онлайн записи, <br>
            %specialist% - Имя специалиста, <br>
            %procedures% - список выбранных услуг через запятую
          </template>
        </SmsTemplate>
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <Section
          title="Уведомить клиента перед записью"
        >
          <template #append>
            <UiSwitch
              v-model="settings.hasRemindSMS"
              size="m"
            />
          </template>
        </Section>

        <UiText
          class="sms-settings-page__notify-selector"
          size="l"
          responsive
        >
          Уведомлять за:

          <template #append>
            <UiSelect
              label-key="name"
              :value="remindTime"
              :options="durationList"
              required
              :clearable="false"
              placeholder="Выбрать время"
              @input="settings.remindSMSMinutes = $event.value"
            >
              <template #input="{ onFocus }">
                <UiText
                  size="m"
                  responsive
                  right-icon="outlined/caret-down"
                  @click.native="onFocus"
                >
                  {{ remindTime.name }} до начала
                </UiText>
              </template>
            </UiSelect>
          </template>
        </UiText>

        <SmsTemplate
          class="sms-settings-page__sms-template"
          :template="smsRemindTemplate"
          @update:template="settings.remindSMSTemplate = $event"
        >
          <template #disclaimer>
            Используйте алиасы для генерации данных: <br>
            %date% - дата в формате "28:06", <br>
            %time% - время начала онлайн записи, <br>
            %specialist% - Имя специалиста, <br>
            %procedures% - список выбранных услуг через запятую
          </template>
        </SmsTemplate>
      </UiPanel>

      <UiButton
        class="sms-settings-page__button"
        theme="blue"
        :loading="isLoading"
        responsive
        @click.native="save"
      >
        Сохранить
      </UiButton>
    </template>

    <UiPanel
      v-else
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="sms-settings-page__title"
      >
        Настройки СМС
      </UiTitle>

      <Section
        title="Авторизация в СМС-сервисе"
        sub-title="Включите функцию отправки пользователям сообщений о предстоящих записях"
      >
        <template #append>
          <UiButton
            size="s"
            theme="blue"
            @click.native="smsPopup"
          >
            Авторизоваться
          </UiButton>
        </template>
      </Section>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_CREATION_TEMPLATE } from '~/constants'

import { SMS_REMIND_DURATIONS } from '~/constants/time'

import { minutesToTime } from '~/utils/time'

import { normalizeSmsSettingsParams } from '~/logics/company'

import Section from '../components/Section.vue'
import SmsTemplate from '../components/SmsTemplate.vue'
import SettingsLayout from '../components/Layout.vue'

@Component({
  layout: 'dashboard',

  components: {
    Section,
    SmsTemplate,
    SettingsLayout
  }
})
export default class SmsSettingsPage extends Vue {
  isLoading = false

  settings = this.$typedStore.getters['sms/settings']

  get isAuthorize () {
    return this.$typedStore.getters['sms/isAuthorize']
  }

  get smsRemindTemplate () {
    return this.settings.remindSMSTemplate || SMS_CREATION_TEMPLATE
  }

  get smsCreationTemplate () {
    return this.settings.creationSMSTemplate || SMS_CREATION_TEMPLATE
  }

  get remindTime () {
    return {
      name: minutesToTime(this.settings.remindSMSMinutes),
      value: this.settings.remindSMSMinutes
    }
  }

  get durationList () {
    return SMS_REMIND_DURATIONS.map(minutes => ({
      name: minutesToTime(minutes),
      value: minutes
    }))
  }

  async save () {
    try {
      this.isLoading = true

      await this.$api.sms.settingUpdate(
        normalizeSmsSettingsParams(this.settings)
      )

      this.$typedStore.dispatch('toasts/show', { title: 'Сохранено!' })
    } catch {
      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Что-то не так!'
      })
    } finally {
      this.isLoading = false
    }
  }

  smsPopup () {
    this.$typedStore.dispatch('popup/show', 'sms-auth')
  }

  async deauthorize () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Вы уверены что хотите деавторизоваться?',
      acceptButtonTitle: 'Подтвердить'
    })

    if (result) {
      await this.$api.sms.settingRemove()

      window.location.reload()
    }
  }
}
</script>

<style lang="scss" src="./SmsSettingsPage.scss"></style>
