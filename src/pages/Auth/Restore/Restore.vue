<template>
  <Layout class="auth-page-restore">
    <div class="auth-page-restore__inner">
      <div class="auth-page-restore__header">
        <UiTitle
          size="xl"
          responsive
        >
          Восстановить доступ
        </UiTitle>

        <UiText
          size="m"
          responsive
        >
          Введите номер телефона чтобы востановить доступ
        </UiText>
      </div>

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
              mask="38 (###) #### ###"
              name="phone"
              left-icon="phone-fill"
              placeholder="066"
              :disabled="isValid"
              required
              @input="resetFieldError('phone')"
            />
          </UiField>

          <template
            v-if="isValid"
          >
            <UiField
              label="Пароль"
              :error="getFieldError('password')"
            >
              <UiInput
                v-model="password"
                left-icon="key-fill"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
                @input="resetFieldError('password')"
              />
            </UiField>

            <UiField
              label="Код смс"
              :error="getFieldError('code')"
            >
              <UiInput
                v-model="code"
                left-icon="paper-plane-tilt-fill"
                placeholder="Введите код с sms"
                required
                @input="resetFieldError('code')"
              />
            </UiField>
          </template>

          <UiButton
            class="auth-page-restore__button"
            type="submit"
            size="l"
            theme="blue"
          >
            {{ isValid ? 'Изменить пароль' : 'Востановить' }}
          </UiButton>
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
export default class Restore extends Vue {
  code = ''
  phone = ''
  password = ''

  isValid = false

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
          invalid: 'Номер не найден'
        }
      },

      code: {
        rules: 'required',
        messages: {
          required: 'Введите код'
        },
        serverMessages: {
          invalid: 'Не правильный код'
        }
      }
    }
  }

  async submit () {
    try {
      await this.$api.auth.restore({
        code: this.code,
        phone: this.phone,
        newPassword: this.password
      })

      // TODO: Add toast "password is changed"

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
    }
  }

  async confirmationPhone () {
    try {
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
    }
  }

  onBack () {
    this.$router.push({
      name: 'login'
    })
  }
}
</script>

<style lang="scss" src="./Restore.scss"></style>
