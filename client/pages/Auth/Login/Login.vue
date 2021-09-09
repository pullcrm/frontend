<template>
  <Layout
    title="Авторизация"
    sub-title="Войдите в систему, чтобы получить доступ к своей компании"
    class="auth-page-login"
  >
    <form
      @submit.prevent="onSubmit"
    >
      <UiFormValidator
        v-slot="{ resetFieldError, getFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Телефон"
          :error="getFieldError('phone')"
        >
          <UiInput
            v-model="phone"
            mask="38 (###) #### ###"
            type="phone"
            name="phone"
            left-icon="outlined/phone"
            placeholder="066"
            autocomplete="on"
            @input="
              error = null,
              resetFieldError('phone')
            "
          />
        </UiField>

        <UiField
          label="Пароль"
          :error="getFieldError('password')"
        >
          <UiInput
            v-model="password"
            type="password"
            name="password"
            left-icon="outlined/key"
            placeholder="Введите пароль"
            autocomplete="on"
            @input="
              error = null,
              resetFieldError('password')
            "
          />
        </UiField>

        <UiText
          tag="RouterLink"
          :to="{
            name: 'restore',
            query: { phone }
          }"
          size="s"
          class="auth-page-login__reset"
        >
          Восстановить доступ
        </UiText>

        <UiAlert
          v-if="error"
          theme="error"
          left-icon="solid/warning-circle-fill"
          class="auth-page-login__error"
        >
          {{ error.message }}
        </UiAlert>

        <div class="auth-page-login__actions">
          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Войти
          </UiButton>

          <UiButton
            :to="{
              name: 'registration',
              query: { phone }
            }"
            type="submit"
            size="l"
            theme="info-outlined"
          >
            Регистрация
          </UiButton>
        </div>
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
  middleware: [
    'redirects/dashboard'
  ],

  components: {
    Layout
  },

  head () {
    return {
      title: 'Авторизация - pullcrm'
    }
  }
})
export default class Login extends Vue {
  password = ''
  phone = ''

  error = null

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      phone: {
        rules: {
          min: 10,
          regex: /^0\d+$/,
          required: true
        },
        messages: {
          min: 'Не верный формат номера',
          regex: 'Не верный формат номера',
          required: 'Введите номер телефона'
        }
      },
      password: {
        rules: 'required',
        messages: {
          required: 'Введите пароль'
        }
      }
    }
  }

  mounted () {
    const { phone } = this.$route.query

    if (phone) {
      this.phone = String(phone)
    }
  }

  async onSubmit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      await this.$typedStore.dispatch('auth/login', {
        phone: this.phone,
        password: this.password
      })

      await this.$typedStore.dispatch('profile')

      if (this.$typedStore.getters['position/hasPositions']) {
        const position = this.$typedStore.state.position.positions[0]

        await this.$typedStore.dispatch('auth/refreshTokenByPosition', position)

        this.$router.push({ name: 'dashboard' })

        return
      }

      await this.$router.push({ name: 'companyCreate' })
    } catch (err) {
      if (err.fieldName) {
        this.error = err

        return
      }

      throw err
    }
  }

  validate () {
    return this.$refs.formValidator.validate({
      phone: this.phone,
      password: this.password
    })
  }
}
</script>

<style lang="scss" src="./Login.scss"></style>
