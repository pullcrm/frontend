<template>
  <UiPopup
    class="sms-auth"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="sms-auth__title"
      size="s"
    >
      SMSC авторизация
    </UiTitle>

    <form @submit.prevent="submit">
      <UiField
        label="Логин"
        required
      >
        <UiInput
          v-model="form.login"
          left-icon="outlined/pencil"
          placeholder="Введите логин"
          required
        />
      </UiField>

      <UiField
        label="Пароль"
        required
      >
        <UiInput
          v-model="form.password"
          left-icon="outlined/pencil"
          placeholder="Введите пароль"
          required
        />
      </UiField>

      <UiButton
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Авторизоваться в smsc
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ISmsCreateParams } from '~/services/api'

@Component({})
export default class ProcedureEdit extends Vue {
  form: ISmsCreateParams = {
    login: '',
    password: '',
    hasRemindSMS: false,
    hasCreationSMS: false,
    remindSMSMinutes: 60
  }

  isLoading = false

  async submit () {
    try {
      this.isLoading = true

      await this.$api.sms.settingCreate(this.form)

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
