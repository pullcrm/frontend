<template>
  <div
    class="company-settings-page-sms-notification"
  >
    <UiTitle
      class="company-settings-page-sms-notification__title"
      size="l"
      responsive
    >
      SMS оповещение
    </UiTitle>

    <template
      v-if="hasSMSAuthorize"
    >
      <UiText
        size="m"
        responsive
      >
        Авторизовано в SMSC.UA
      </UiText>

      <UiSwitch
        :value="settings.remindAfterCreation"
        size="m"
        @input="onSettings('remindAfterCreation', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Отправлять смс клиенту после создания записи (по умолчанию)
          </UiText>
        </template>
      </UiSwitch>

      <UiSwitch
        size="m"
        :value="settings.remindBefore"
        @input="onSettings('remindBefore', $event)"
      >
        <template #append>
          <UiText
            size="m"
            responsive
          >
            Напоминать клиенту о записи (по умолчанию)
          </UiText>
        </template>
      </UiSwitch>

      <UiField
        label="За сколько времени напоминать о записи?"
      >
        <UiSelect
          label="name"
          :value="remindBeforeInMinutes"
          :options="durationList"
          required
          :clearable="false"
          placeholder="Выбрать время"
          @input="onSettings('remindBeforeInMinutes', $event.value)"
        />
      </UiField>

      <UiButton
        theme="blue"
        :loading="isLoading"
        responsive
        @click.native="save"
      >
        Сохранить
      </UiButton>
    </template>

    <UiButton
      v-else
      theme="info-outlined"
      responsive
      @click.native="smsPopup"
    >
      Авторизоваться в smsc
    </UiButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { durations, getDurationName } from '@/logics/hours'

@Component({})
export default class SmsNotification extends Vue {
  isLoading = false

  get settings () {
    return this.$store.state.sms.settings
  }

  get hasSMSAuthorize () {
    return this.$store.getters['sms/hasSMSAuthorize']
  }

  get remindBeforeInMinutes () {
    return getDurationName(this.settings.remindBeforeInMinutes)
  }

  get durationList () {
    return durations
  }

  async save () {
    try {
      this.isLoading = true

      await this.$store.dispatch('sms/updateSettings')

      this.$store.dispatch('toasts/show', { title: 'Сохранено!' })
    } catch {
      this.$store.dispatch('toasts/show', {
        type: 'error',
        title: 'Что-то не так!'
      })
    } finally {
      this.isLoading = false
    }
  }

  onSettings (key, value) {
    this.$store.commit('sms/SET_SETTING_BY_KEY', { key, value })
  }

  smsPopup () {
    this.$store.dispatch('popup/show', 'sms-auth')
  }
}
</script>

<style lang="scss" src="./SmsNotification.scss"></style>
