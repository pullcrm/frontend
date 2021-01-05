<template>
  <SettingsLayout
    class="sms-settings-page"
  >
    <UiTitle
      class="sms-settings-page__title"
      size="l"
      responsive
    >
      SMS оповещение
    </UiTitle>

    <template
      v-if="hasSmsAuthorize"
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
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { DURATIONS } from '@/constants/generated'

import SettingsLayout from '../components/SettingsLayout.vue'

@Component({
  components: {
    SettingsLayout
  }
})
export default class SmsSettingsPage extends Vue {
  isLoading = false

  settings = this.$store.getters['sms/settings']

  get durationList () {
    return DURATIONS
  }

  get hasSmsAuthorize () {
    return this.$store.getters['sms/hasSmsAuthorize']
  }

  get remindBeforeInMinutes () {
    const item = this.durationList.find(item => {
      return item.value === this.settings.remindBeforeInMinutes
    })

    return item?.name
  }

  async save () {
    try {
      this.isLoading = true

      const {
        remindBefore,
        remindAfterCreation,
        remindBeforeInMinutes
      } = this.settings

      await this.$api.sms.settingUpdate({
        remindBefore,
        remindAfterCreation,
        remindBeforeInMinutes
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
