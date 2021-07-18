<template>
  <UiPopup
    class="sms-auth"
    @close="$emit('close')"
  >
    <UiTitle
      class="sms-auth__title"
      size="s"
    >
      Настройка API для отправки СМС
    </UiTitle>

    <form @submit.prevent="submit">
      <UiField
        label="Имя отправителя"
        required
      >
        <UiInput
          v-model="companyName"
          left-icon="outlined/pencil"
          placeholder="Введите имя"
          required
        />
      </UiField>

      <UiField
        label="Публичный ключ"
        required
      >
        <UiInput
          v-model="publicKey"
          left-icon="outlined/pencil"
          placeholder="Введите ключ"
          required
        />
      </UiField>

      <UiField
        label="Приватный ключ"
        required
      >
        <UiInput
          v-model="privateKey"
          left-icon="outlined/pencil"
          placeholder="Введите ключ"
          required
        />
      </UiField>

      <UiButton
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Авторизоваться
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_CREATION_TEMPLATE, SMS_REMIND_TEMPLATE } from '~/constants'

@Component({})
export default class ProcedureEdit extends Vue {
  publicKey = ''
  privateKey = ''
  companyName = ''

  isLoading = false

  async submit () {
    try {
      this.isLoading = true

      await this.$api.sms.settingCreate({
        publicKey: this.publicKey,
        privateKey: this.privateKey,
        companyName: this.companyName,
        // default params
        hasRemindSMS: true,
        hasCreationSMS: false,
        remindSMSMinutes: 60,
        remindSMSTemplate: SMS_REMIND_TEMPLATE,
        creationSMSTemplate: SMS_CREATION_TEMPLATE
      })

      window.location.reload()
    } catch (err) {
      if (err.status === 404) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: 'Введены не верные данные'
        })

        return
      }

      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Что-то не так!'
      })
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
  .sms-auth {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    .ui-button {
      width: 100%;
      margin-top: 24px;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
