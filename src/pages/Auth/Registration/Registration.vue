<template>
  <Layout>
    <UiForm
      v-show="isWriteInfoForm"
      class="auth-registration-form"
      title="Регистрация"
      can-back
      @on-back="onBack"
      @on-submit="onSubmit"
    >
      <UiFormControl
        label="Имя"
        name="name"
        placeholder="Введите Имя"
        v-model="form.firstName"
        required
      />

      <UiFormControl
        label="Фамилия"
        name="surname"
        placeholder="Введите Фамилию"
        v-model="form.lastName"
        required
      />

      <UiFormControl
        label="Телефон"
        name="phone"
        type="phone"
        placeholder="+38 (0"
        v-model="form.phone"
        required
      />

      <UiFormControl
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        v-model="form.password"
        required
      />

      <div class="auth-registration-form__policy">
        Нажимая на кнопку я соглашаюсь с <a href="#">Пользовательским соглашением</a> и <a href="#">Политикой обработки персональных данных</a>
      </div>

      <template
        #actions
      >
        <UiButton
          tag="button"
          type="submit"
        >
          Зарегистрировать
        </UiButton>
      </template>
    </UiForm>

    <UiForm
      v-show="!isWriteInfoForm"
      class="auth-registration-form"
      title="Регистрация"
      :sub-title="`На ваш телефон ${form.phone} был выслан СМС-код для подтверждения регистрации`"
      can-back
      @on-back="onBackSms"
      @on-submit="onSubmitSms"
    >
      <UiFormControl
        label="Код подтверждения"
        placeholder="****"
        v-model="form.code"
        required
      />

      <template
        #actions
      >
        <UiButton
          tag="button"
          type="submit"
        >
          Подтвердить
        </UiButton>
      </template>
    </UiForm>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IRegistrationUserParams } from '@/services/api/'

import Layout from '../Layout/Layout.vue'
import UiForm from '../components/Form.vue'
import UiButton from '../components/Button.vue'
import UiFormControl from '../components/FormControl.vue'

@Component({
  components: {
    Layout,
    UiForm,
    UiButton,
    UiFormControl
  }
})
export default class Home extends Vue {
  isWriteInfoForm = true

  form: IRegistrationUserParams = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    code: null
  }

  async onSubmit () {
    try {
      await this.$api.users.confirmation({
        phone: this.form.phone
      })

      // show confirmation form
      this.isWriteInfoForm = false
    } catch (error) {
      if (error) {
        // TODO: refactor
        // this.$buefy.toast.open({
        //   message: 'упс'
        // })
      }
    }
  }

  async onSubmitSms () {
    try {
      const form = {
        ...this.form,
        code: this.form.code
      }

      await this.$api.auth.registration(form)
      await this.$store.dispatch('auth/login', form)
      await this.$store.dispatch('profile/fetch')

      this.$router.push({
        name: 'companyCreate'
      })
    } catch (err) {
      // TODO: why status (do code)
      if (err.status === 400) {
        // TODO: refactor
        // this.$buefy.toast.open({
        //   message: 'Такой пользователь уже существует'
        // })

        return
      }

      throw err
    }
  }

  onBack () {
    this.$router.push({
      name: 'login'
    })
  }

  onBackSms () {
    this.isWriteInfoForm = true
  }
}
</script>

<style lang="scss">
  .auth-registration-form {
    &__policy {
      margin-top: 16px;
      padding: 10px 16px;
      font-size: 12px;
      line-height: 17px;
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
  }
</style>
