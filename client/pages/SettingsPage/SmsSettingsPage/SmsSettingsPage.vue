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
          Налаштування СМС
        </UiTitle>

        <Section
          title="Ви авторизовані в СМС-сервісі"
          sub-title="Доступні функції надсилання користувачам повідомлень про статуси записів"
        >
          <template #append>
            <UiButton
              size="s"
              theme="danger-outlined"
              @click.native="deauthorize"
            >
              Відключити
            </UiButton>
          </template>
        </Section>
      </UiPanel>

      <UiPanel
        size="m"
        responsive
      >
        <Section
          title="Повідомити клієнта після створення запису"
          sub-title="СМС відправиться через 2 хвилини після створення запису"
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
            Використовуйте аліаси для генерації даних: <br>
            %date% - дата в форматі "28.06"; <br>
            %time% - час початку запису; <br>
            %specialist% - ім'я спеціаліста; <br>
            %procedures% - список вибраних послуг через кому.
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
              placeholder="Вибрати час"
              @input="settings.remindSMSMinutes = $event.value"
            >
              <template #input="{ onFocus }">
                <UiText
                  size="m"
                  responsive
                  right-icon="outlined/caret-down"
                  @click.native="onFocus"
                >
                  {{ remindTime.name }} до початку
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
            Використовуйте аліаси для генерації даних: <br>
            %date% - дата в форматі "28.06"; <br>
            %time% - час початку запису; <br>
            %specialist% - ім'я спеціаліста; <br>
            %procedures% - список вибраних послуг через кому.
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
        Зберегти
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
        Налаштування СМС
      </UiTitle>

      <Section
        title="Авторизація в СМС-сервісі"
        sub-title="Увімкніть функцію надсилання користувачам повідомлень про майбутні записи"
      >
        <template #append>
          <UiButton
            size="s"
            theme="blue"
            @click.native="smsPopup"
          >
            Підключитись
          </UiButton>
        </template>
      </Section>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_REMIND_TEMPLATE, SMS_CREATION_TEMPLATE } from '~/constants'

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
  },

  head () {
    return {
      title: 'Налаштування СМС - pullcrm'
    }
  }
})
export default class SmsSettingsPage extends Vue {
  isLoading = false

  settings = this.$typedStore.getters['sms/settings']

  get isAuthorize () {
    return this.$typedStore.getters['sms/isAuthorize']
  }

  get smsRemindTemplate () {
    return this.settings.remindSMSTemplate || SMS_REMIND_TEMPLATE
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

      this.$typedStore.dispatch('toasts/show', { title: 'Збережено!' })
    } catch {
      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Щось не так!'
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
      title: 'Ви впевнені, що хочете деавторизуватися?',
      acceptButtonTitle: 'Підтвердити'
    })

    if (result) {
      await this.$api.sms.settingRemove()

      window.location.reload()
    }
  }
}
</script>

<style lang="scss" src="./SmsSettingsPage.scss"></style>
