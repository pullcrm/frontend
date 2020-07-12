<template>
  <div
    class="auth-registration"
  >
    <div class="auth-registration__header">
      <UiTitle
        size="xl"
      >
        Регистрация
      </UiTitle>

      <UiText>
        Пройдите регистрацию чтобы получить доступ к своей компонии
      </UiText>
    </div>

    <form
      @submit.prevent="onSubmit"
    >
      <UiBack
        class="auth-registration__back"
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
            left-icon="edit/edit-1"
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
            left-icon="edit/edit-1"
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
            left-icon="phone"
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
            left-icon="key"
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
            @input="resetFieldError('password')"
          />
        </UiField>

        <div class="auth-registration__policy">
          <UiText
            size="s"
          >
            Нажимая на кнопку я соглашаюсь с <a href="#">Пользовательским соглашением</a> и <a href="#">Политикой обработки персональных данных</a>
          </UiText>
        </div>

        <div class="auth-registration__actions">
          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Зарегистрировать
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IRegistrationUserParams } from '@/services/api'

import UiFormValidator, { Validations } from '@/ui/FormValidator.vue'

@Component({
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
    const result = await this.$store.dispatch('popup/smsConfirmation', {
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
    await this.$store.dispatch('auth/login', form)
    await this.$store.dispatch('profile/fetch')
  }

  onBack () {
    this.$router.push({
      name: 'login'
    })
  }
}
</script>

<style lang="scss">
  .auth-registration {
    width: 460px;

    &__back {
      margin-bottom: 24px;
    }

    &__policy {
      margin-top: 16px;
      padding: 10px 16px;
      text-align: center;
      background: #f6f6f6;
      border-radius: 8px;

      a {
        color: #189eff;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__header {
      text-align: center;

      .ui-title {
        margin-bottom: 8px;
        font-weight: 700;
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      margin-top: 16px;
    }

    form {
      margin-top: 24px;
      padding: 24px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 0 16px rgba($ui-black-100, 0.1);
    }
  }
</style>
