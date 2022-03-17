<template>
  <Layout
    title="Реєстрація"
    sub-title="Пройдіть реєстрацію, щоб отримати доступ до своєї компанії"
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
          label="Ім'я та Прізвище"
          :error="getFieldError('fullName')"
        >
          <UiInput
            v-model="form.fullName"
            left-icon="outlined/pencil"
            name="name"
            placeholder="Введіть Ім'я і Призвіще"
            @input="resetFieldError('fullName')"
          />
        </UiField>

        <UiField
          label="Телефон"
          :error="getFieldError('phone')"
        >
          <UiInput
            v-model="form.phone"
            mask="+38 (###) #### ###"
            name="phone"
            type="phone"
            inputmode="tel"
            left-icon="outlined/phone"
            placeholder="066"
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
            placeholder="Введіть пароль"
            @input="resetFieldError('password')"
          />
        </UiField>

        <UiText
          class="auth-page-registration__policy"
          size="s"
        >
          Натискаючи на кнопку, я погоджуюсь із <a href="#">Угодою користувача</a> та <a href="#">Політикою обробки персональних даних</a>
        </UiText>

        <UiButton
          class="auth-page-registration__button"
          type="submit"
          size="l"
          theme="blue"
          :loading="isLoading"
        >
          Зареєструватись
        </UiButton>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import pick from 'lodash/pick'

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
      title: 'Реєстрація - pullcrm'
    }
  }
})
export default class Home extends Vue {
  form: IRegistrationUserParams = {
    fullName: '',
    phone: '',
    password: ''
  }

  isLoading = false

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      fullName: {
        rules: {
          min: 4,
          required: true
        },
        messages: {
          min: 'Мінімальна кількість символів: 4',
          required: 'Введіть ваше ім\'я'
        }
      },
      phone: {
        rules: {
          min: 10,
          regex: /^0\d+$/,
          required: true
        },
        messages: {
          min: 'Не вірний формат номеру',
          regex: 'Не вірний формат номеру',
          required: 'Введіть номер телефону'
        },
        serverMessages: {
          invalid: 'Номер телефону введено невірно'
        }
      },
      password: {
        rules: {
          min: 4,
          required: true
        },
        messages: {
          min: 'Мінімальна кількість символів: 4',
          required: 'Введіть пароль'
        },
        serverMessages: {
          invalid: 'Пароль введено невірно'
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
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$api.users.confirmation({
        phone: this.form.phone,
        type: 'REGISTRATION'
      })

      return this.confirmation()
    } catch (err) {
      const serverErrors = [
        err.code === 400 && { field: 'phone', error: 'invalid' }
      ].filter(Boolean)

      if (serverErrors.length > 0) {
        this.$refs.formValidator.setServerErrors(serverErrors)
        return
      }

      throw err
    } finally {
      this.isLoading = false
    }
  }

  async confirmation () {
    const result = await this.$typedStore.dispatch('popup/smsConfirmation', {
      title: 'Реєстрація',
      subTitle: `На ваш телефон ${this.form.phone} був відправлений СМС-код для підтвердження реєстрації`,
      submit: this.onCreateUser
    })

    if (result) {
      await this.$track('userRegistration', {})

      return this.$router.push({
        name: 'companyCreate',
        query: pick(this.$route.query, [
          'companyType'
        ])
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

  validate () {
    return this.$refs.formValidator.validate(this.form)
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
