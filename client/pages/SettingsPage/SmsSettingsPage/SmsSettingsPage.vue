<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <UiTitle
      size="s"
      responsive
      class="sms-settings-page__title"
    >
      Настройки СМС
    </UiTitle>

    <template
      v-if="isSMSAuthorize"
    >
      <SmsPlaceholder
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
      </SmsPlaceholder>

      <UiDivider />

      <SmsPlaceholder
        title="Уведомлять клиента после создания записи"
        sub-title="СМС отправится через 2 минуты после создания записи"
      >
        <template #append>
          <UiSwitch
            :value="settings.hasCreationSMS"
            size="m"
            @input="onSettings('hasCreationSMS', $event)"
          />
        </template>
      </SmsPlaceholder>

      <SmsTemplate
        class="sms-settings-page__sms-template"
        :template.sync="smsRemindTemplate"
        disclaimer="Поставьте в места для генерации данных по отдельным записям: %specialist%, %date%, %time%, %procedures%"
      />

      <UiDivider />

      <SmsPlaceholder
        title="Уведомлять клиента перед записью"
      >
        <template #append>
          <UiSwitch
            size="m"
            :value="settings.hasRemindSMS"
            @input="onSettings('hasRemindSMS', $event)"
          />
        </template>
      </SmsPlaceholder>

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
            @input="onSettings('remindSMSMinutes', $event.value)"
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
        :template.sync="smsRemindTemplate"
        disclaimer="Примерная стоимость: 1.20 грн"
      />

      <!-- <UiButton
        theme="blue"
        :loading="isLoading"
        responsive
        @click.native="save"
      >
        Сохранить
      </UiButton> -->
    </template>

    <SmsPlaceholder
      v-else
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
    </SmsPlaceholder>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { minutesToTime } from '~/utils/time'

import SmsTemplate from '../components/SmsTemplate.vue'
import SettingsLayout from '../components/Layout.vue'
import SmsPlaceholder from '../components/SmsPlaceholder.vue'

import { SMS_REMIND_DURATIONS } from '~/constants/time'

@Component({
  layout: 'dashboard',

  components: {
    SmsTemplate,
    SettingsLayout,
    SmsPlaceholder
  }
})
export default class SmsSettingsPage extends Vue {
  isLoading = false

  settings = this.$typedStore.getters['sms/settings']

  smsRemindTemplate = 'Вы записаны к Алексею Михайленко на 12 окт 2021 в 15:00'

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

  get isSMSAuthorize () {
    return this.$typedStore.getters['sms/isAuthorize']
  }

  async save () {
    try {
      this.isLoading = true

      const {
        hasRemindSMS,
        hasCreationSMS,
        remindSMSMinutes
      } = this.settings

      await this.$api.sms.settingUpdate({
        hasRemindSMS,
        hasCreationSMS,
        remindSMSMinutes
      })

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

  onSettings (key, value) {
    this.settings[key] = value
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
