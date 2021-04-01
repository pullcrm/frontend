<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <template
      v-if="isSMSAuthorize"
    >
      <div class="ui-grid">
        <UiTitle
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          size="s"
          responsive
        >
          Авторизовано в SMSC.UA
        </UiTitle>

        <UiSwitch
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          :value="settings.hasCreationSMS"
          size="m"
          @input="onSettings('hasCreationSMS', $event)"
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
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          size="m"
          :value="settings.hasRemindSMS"
          @input="onSettings('hasRemindSMS', $event)"
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
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          label="За сколько времени напоминать о записи?"
        >
          <UiSelect
            label-key="name"
            :value="remindTime | minutesToTime"
            :options="durationList"
            required
            :clearable="false"
            placeholder="Выбрать время"
            @input="onSettings('remindSMSMinutes', $event.value)"
          />
        </UiField>

        <UiButton
          :class="[
            'ui-grid-item',
            'ui-grid-item_12'
          ]"
          theme="blue"
          :loading="isLoading"
          responsive
          @click.native="save"
        >
          Сохранить
        </UiButton>
      </div>
    </template>

    <UiButton
      v-else
      theme="info-outlined"
      responsive
      @click.native="smsPopup"
    >
      Авторизоваться в smsc
    </UiButton>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_REMIND_DURATIONS } from '@/constants/time'

import { minutesToTime } from '@/utils/time'

import SettingsLayout from '../components/SettingsLayout.vue'

@Component({
  components: {
    SettingsLayout
  }
})
export default class SmsSettingsPage extends Vue {
  isLoading = false

  settings = this.$store.getters['sms/settings']

  get remindTime () {
    return this.settings.remindSMSMinutes
  }

  get durationList () {
    return SMS_REMIND_DURATIONS.map(minutes => minutesToTime(minutes))
  }

  get isSMSAuthorize () {
    return this.$store.getters['sms/isAuthorize']
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
    this.settings[key] = value
  }

  smsPopup () {
    this.$store.dispatch('popup/show', 'sms-auth')
  }
}
</script>

<style lang="scss" src="./SmsSettingsPage.scss"></style>
