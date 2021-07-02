<template>
  <Layout
    title="Регистрация"
    sub-title="Пройдите регистрацию, чтобы получить доступ к своей компании"
    class="auth-page-registration"
  >
    <form
      @submit.prevent="onSubmit"
    >
      <UiBack
        class="auth-page-registration__back"
        @click.native="onBack"
      />

      <UiFormValidator
        v-slot="{ resetFieldError, getFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Имя"
        >
          <UiInput
            v-model="form.firstName"
            left-icon="outlined/pencil"
            name="name"
            placeholder="Введите Имя"
            required
          />
        </UiField>

        <UiField
          label="Фамилия"
        >
          <UiInput
            v-model="form.lastName"
            left-icon="outlined/pencil"
            name="surname"
            placeholder="Введите Фамилию"
            required
          />
        </UiField>

        <UiField
          label="Телефон"
          :error="getFieldError('phone')"
        >
          <UiInput
            v-model="form.phone"
            mask="38 (###) #### ###"
            left-icon="outlined/phone"
            name="phone"
            type="phone"
            placeholder="066"
            required
            @input="resetFieldError('phone')"
          />
        </UiField>

        <UiField
          label="Пароль"
          :error="getFieldError('password')"
        >
          <UiInput
            v-model="form.password"
            left-icon="outlined/key"
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
            @input="resetFieldError('password')"
          />
        </UiField>

        <UiText
          class="auth-page-registration__policy"
          size="s"
        >
          Нажимая на кнопку, я соглашаюсь с <a href="#">Пользовательским соглашением</a> и <a href="#">Политикой обработки персональных данных</a>
        </UiText>

        <UiButton
          class="auth-page-registration__button"
          type="submit"
          size="l"
          theme="blue"
        >
          Зарегистрировать
        </UiButton>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IRegistrationUserParams } from '~/services/api'

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
      title: 'Регистрация - pullcrm'
    }
  }
})
export default class Home extends Vue {
  form: IRegistrationUserParams = {
    firstName: '',
    lastName: '',
    phone: '',
    password: ''
  }

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      phone: {
        rules: 'required',
        messages: {
          required: 'Введите номер телефона'
        },
        serverMessages: {
          invalid: 'Номер телефона введен неверно'
        }
      },
      password: {
        rules: 'required',
        messages: {
          required: 'Введите пароль'
        },
        serverMessages: {
          invalid: 'Пароль введен неверно'
        }
      }
    }
  }

  mounted () {
    const { phone } = this.$route.query

    if (phone) {
      this.form.phone = String(phone)
    }
  }

  async onSubmit () {
    try {
      await this.$api.users.confirmation({
        phone: this.form.phone,
        type: 'REGISTRATION'
      })

      return this.confirmation()
    } catch (err) {
      const serverErrors = [
        err.status === 500 && { field: 'phone', error: 'invalid' }
      ].filter(Boolean)

      if (serverErrors.length > 0) {
        this.$refs.formValidator.setServerErrors(serverErrors)
        return
      }

      throw err
    }
  }

  async confirmation () {
    const result = await this.$typedStore.dispatch('popup/smsConfirmation', {
      title: 'Регистрация',
      subTitle: `На ваш телефон ${this.form.phone} был выслан СМС-код для подтверждения регистрации`,
      submit: this.onCreateUser
    })

    if (result) {
      return this.$router.push({
        name: 'companyCreate'
      })
    }
  }

  async onCreateUser (code) {
    const form = {
      ...this.form,
      code
    }

    await this.$api.auth.registration(form)
    await this.$typedStore.dispatch('auth/login', form)
  }

  onBack () {
    this.$router.push({
      name: 'login',
      query: {
        ...this.$route.query
      }
    })
  }
}
</script>

<style lang="scss" src="./Registration.scss"></style>
