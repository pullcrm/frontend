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
        :value="settings.remindBeforeTime"
        size="m"
        @input="onSettings('remindBeforeTime', $event)"
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
          :value="beforeTime"
          label="name"
          placeholder="Выбрать время"
          :options="durationList"
          :clearable="false"
          required
          @input="onSettings('beforeTime', $event.value)"
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

  get beforeTime () {
    return getDurationName(this.settings.beforeTime)
  }

  get durationList () {
    return durations
  }

  async save () {
    this.isLoading = true

    await this.$store.dispatch('sms/updateSettings')

    this.isLoading = false
    this.$store.dispatch('toasts/show', { title: 'Сохранено!' })
  }

  onSettings (key, value) {
    this.$store.commit('sms/SET_SETTING_BY_KEY', { key, value })
  }

  smsPopup () {
    this.$store.dispatch('popup/show', 'smsc-auth')
  }
}
</script>

<style lang="scss" src="./SmsNotification.scss"></style>
