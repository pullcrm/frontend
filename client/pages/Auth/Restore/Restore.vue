<template>
  <Layout
    title="Восстановить доступ"
    sub-title="Введите номер телефона, чтобы восстановить доступ"
    class="auth-page-restore"
  >
    <form
      @submit.prevent="isValid ? submit() : confirmationPhone()"
    >
      <UiBack
        class="auth-page-restore__back"
        @click.native="onBack"
      />

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
            mask="+38 (###) #### ###"
            name="phone"
            left-icon="outlined/phone"
            inputmode="tel"
            placeholder="066"
            :disabled="isValid"
            @input="resetFieldError('phone')"
          />
        </UiField>

        <template
          v-if="isValid"
        >
          <UiField
            label="Код смс"
            :error="getFieldError('code')"
          >
            <UiInput
              v-model="code"
              left-icon="outlined/chat-centered-text"
              placeholder="Введите СМС-код"
              @input="resetFieldError('code')"
            />
          </UiField>

          <UiField
            label="Пароль"
            :error="getFieldError('password')"
          >
            <UiInput
              v-model="password"
              left-icon="outlined/key"
              name="password"
              type="password"
              placeholder="Введите новый пароль"
              @input="resetFieldError('password')"
            />
          </UiField>

          <UiField
            label="Повторите пароль"
            :error="getFieldError('repeatPassword')"
          >
            <UiInput
              v-model="repeatPassword"
              left-icon="outlined/key"
              name="repeatPassword"
              type="password"
              placeholder="Введите повторно новый пароль"
              @input="resetFieldError('repeatPassword')"
            />
          </UiField>
        </template>

        <UiButton
          class="auth-page-restore__button"
          type="submit"
          size="l"
          theme="blue"
          :loading="isLoading"
        >
          {{ isValid ? 'Изменить пароль' : 'Восстановить' }}
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
  middleware: [
    'redirects/dashboard'
  ],

  components: {
    Layout
  },

  head () {
    return {
      title: 'Восстановление пароля - pullcrm'
    }
  }
})
export default class Restore extends Vue {
  code = ''
  phone = ''
  password = ''
  repeatPassword = ''

  isValid = false
  isLoading = false

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
        },
        serverMessages: {
          invalid: 'Номер не найден'
        }
      },

      code: this.isValid && {
        rules: {
          min: 4,
          required: true
        },
        messages: {
          min: 'Код должен состоять с 4-х символов',
          required: 'Введите код'
        },
        serverMessages: {
          invalid: 'Не правильный код'
        }
      },

      password: this.isValid && {
        rules: {
          min: 4,
          required: true
        },
        messages: {
          min: 'Введите минимум 4 символа',
          required: 'Введите новый пароль'
        }
      },

      repeatPassword: this.isValid && {
        rules: 'required|confirmed:password',
        messages: {
          required: 'Введите повторно новый пароль',
          confirmed: 'Пароль не сходится'
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

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$api.auth.restore({
        code: this.code,
        phone: this.phone,
        newPassword: this.password
      })

      await this.$typedStore.dispatch('toasts/show', {
        title: 'Пароль изменен!'
      })

      this.onBack()
    } catch (err) {
      const serverErrors = [
        err.status === 403 && { field: 'code', error: 'invalid' }
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

  async confirmationPhone () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$api.users.confirmation({
        phone: this.phone,
        type: 'RESET_PASSWORD'
      })

      this.isValid = true
    } catch (err) {
      const serverErrors = [
        err.status === 404 && { field: 'phone', error: 'invalid' }
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

  validate () {
    return this.$refs.formValidator.validate({
      code: this.code,
      phone: this.phone,
      password: this.password,
      repeatPassword: this.repeatPassword
    })
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

<style lang="scss" src="./Restore.scss"></style>
