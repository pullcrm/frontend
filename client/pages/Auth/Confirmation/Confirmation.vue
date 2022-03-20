<template>
  <Layout
    title="Завершення реєстрації"
    sub-title="Придумайте пароль для входу"
    class="auth-confirmation"
  >
    <form
      @submit.prevent="submit"
    >
      <UiFormValidator
        v-slot="{ resetFieldError, getFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Пароль"
          :error="getFieldError('password')"
        >
          <UiInput
            v-model="password"
            left-icon="outlined/key"
            name="password"
            type="password"
            placeholder="Введіть новий пароль"
            @input="resetFieldError('password')"
          />
        </UiField>

        <UiField
          label="Повторіть пароль"
          :error="getFieldError('repeatPassword')"
        >
          <UiInput
            v-model="repeatPassword"
            left-icon="outlined/key"
            name="repeatPassword"
            type="password"
            placeholder="Введіть повторно новий пароль"
            @input="resetFieldError('repeatPassword')"
          />
        </UiField>

        <UiButton
          class="auth-confirmation__button"
          type="submit"
          size="l"
          theme="blue"
          :loading="isLoading"
        >
          Підтвердити
        </UiButton>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import Layout from '../components/Layout.vue'

@Component({
  components: {
    Layout
  },

  head () {
    return {
      title: 'Завершення реєстрації - pullcrm'
    }
  }
})
export default class Confirmation extends Vue {
  password = ''
  repeatPassword = ''

  isLoading = false

  $refs: {
    formValidator: UiFormValidator
  }

  get slug () {
    return this.$route.params.slug
  }

  get validations (): Validations {
    return {
      password: {
        rules: {
          min: 4,
          required: true
        },
        messages: {
          min: 'Мінімальна кількість символів: 4',
          required: 'Введіть новий пароль'
        }
      },

      repeatPassword: {
        rules: 'required|confirmed:password',
        messages: {
          required: 'Введіть повторно новий пароль',
          confirmed: 'Пароль не збігається'
        }
      }
    }
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      const tokens = await this.$api.profile.confirm({
        token: this.slug,
        password: this.password
      })

      await this.$typedStore.dispatch('auth/saveTokens', tokens)

      await this.$typedStore.dispatch('profile')

      if (this.$typedStore.getters['position/hasPositions']) {
        const position = this.$typedStore.state.position.positions[0]

        await this.$typedStore.dispatch('auth/refreshTokenByPosition', position)

        this.$router.push({ name: 'dashboard' })

        return
      }

      await this.$router.push({ name: 'companyCreate' })
    } catch (err) {
      if (err.fieldName === 'code') {
        this.$typedStore.dispatch('toasts/show', {
          title: err.message,
          type: 'error'
        })

        return
      }

      if (err.status === 404) {
        this.$typedStore.dispatch('toasts/show', {
          title: 'Користувач не знайдений',
          type: 'error'
        })

        return
      }

      throw err
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate({
      password: this.password,
      repeatPassword: this.repeatPassword
    })
  }
}
</script>

<style lang="scss" src="./Confirmation.scss"></style>
