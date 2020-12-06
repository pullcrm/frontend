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
          left-icon="edit/edit-1"
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
          left-icon="edit/edit-1"
          placeholder="Введите пароль"
          required
        />
      </UiField>

      <UiButton
        type="submit"
        theme="yellow"
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

import { ISmsCreateParams } from '@/services/api'

import { btoa } from 'isomorphic-base64'

@Component({})
export default class ProcedureEdit extends Vue {
  form: ISmsCreateParams = {
    login: '',
    password: ''
  }

  isLoading = false

  async submit () {
    try {
      this.isLoading = true

      const token = btoa(`${this.form.login}:${this.form.password}`)

      await this.$api.sms.settingCreate({
        token,
        ...this.form
      })

      await this.$store.dispatch('company/fetch')

      this.$emit('close')
    } catch {
      // TODO: Add validation
      this.$store.dispatch('toasts/show', {
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
  }
</style>
