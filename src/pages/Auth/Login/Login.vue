<template>
  <Layout class="auth-page-login">
    <div class="auth-page-login__inner">
      <div class="auth-page-login__header">
        <UiTitle
          size="xl"
          responsive
        >
          Авторизация
        </UiTitle>

        <UiText
          size="m"
          responsive
        >
          Войдите в систему чтобы получить доступ к своей компании
        </UiText>
      </div>

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
              name="phone"
              left-icon="phone"
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
              v-model="password"
              type="password"
              name="password"
              left-icon="key"
              placeholder="Введите пароль"
              required
              @input="resetFieldError('password')"
            />
          </UiField>

          <UiText
            class="auth-page-login__reset"
            tag="RouterLink"
            :to="{ name: 'restore' }"
            size="s"
          >
            Восстановить доступ
          </UiText>

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
                name: 'registration'
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
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiFormValidator, { Validations } from '@/ui/FormValidator.vue'

import Layout from '../components/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class Login extends Vue {
  password = ''
  phone = ''

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
      await this.$store.dispatch('auth/login', {
        phone: this.phone,
        password: this.password
      })

      await Promise.all([
        this.$store.dispatch('approaches/fetch'),
        this.$store.dispatch('profile/fetch')
      ])

      if (this.$store.getters['company/current']) {
        await this.$store.dispatch('auth/fetchRefreshToken')

        this.$router.push({
          name: 'dashboard'
        })

        return
      }

      this.$router.push({
        name: 'companyCreate'
      })
    } catch (err) {
      const serverErrors = [
        err.code === 401 && { field: 'password', error: 'invalid' },
        err.status === 400 && { field: 'phone', error: 'invalid' }
      ].filter(Boolean)

      if (serverErrors.length > 0) {
        this.$refs.formValidator.setServerErrors(serverErrors)
        return
      }

      throw err
    }
  }
}
</script>

<style lang="scss" src="./Login.scss"></style>
