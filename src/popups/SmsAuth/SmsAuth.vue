<template>
  <UiPopup
    class="smsc-auth"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="smsc-auth__title"
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
          v-model="login"
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
          v-model="password"
          left-icon="edit/edit-1"
          placeholder="Введите пароль"
          required
        />
      </UiField>

      <UiButton
        theme="yellow"
        type="submit"
      >
        Авторизоваться в smsc
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { btoa } from 'isomorphic-base64'

@Component({})
export default class ProcedureEdit extends Vue {
  login = ''
  password = ''

  async submit () {
    try {
      const { balance } = await this.$api.smsc.balance({
        login: this.login,
        password: this.password
      })

      this.$store.commit('sms/SET_BALANCE', Number(balance))

      await this.$api.smsc.token({
        token: btoa(`${this.login}:${this.password}`)
      })

      this.$emit('close')

      return this.$store.dispatch('company/fetch')
    } catch {
      // TODO: Add validation
      this.$store.dispatch('toasts/show', {
        type: 'error',
        title: 'Что-то не так!'
      })
    }
  }
}
</script>

<style lang="scss">
  .smsc-auth {
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
