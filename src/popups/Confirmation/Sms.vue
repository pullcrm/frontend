<template>
  <UiPopup>
    <div class="popup-sms-confirmation">
      <UiBack
        @click.native="$emit('cancel')"
      />

      <UiTitle
        class="popup-sms-confirmation__title"
        size="m"
      >
        {{ confirmation.title }}
      </UiTitle>

      <UiText
        class="popup-sms-confirmation__subtitle"
        size="m"
      >
        {{ confirmation.subTitle }}
      </UiText>

      <form @submit.prevent="submit">
        <UiFormValidator
          v-slot="{ resetFieldError, getFieldError }"
          ref="formValidator"
          :validations="validations"
        >
          <UiField
            label="Код подтверждения"
            :error="getFieldError('code')"
          >
            <UiInput
              v-model="code"
              mask="####"
              placeholder="****"
              autofocus
              required
              @input="resetFieldError('code'), onInput()"
            />
          </UiField>
        </UiFormValidator>

        <UiButton
          class="popup-sms-confirmation__button"
          type="submit"
          size="l"
          theme="yellow"
        >
          Подтвердить
        </UiButton>
      </form>
    </div>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiFormValidator, { Validations } from '@/ui/FormValidator.vue'

@Component({
  props: {
    confirmation: {
      type: Object,
      required: true
    }
  }
})
export default class SmsConfirmation extends Vue {
  readonly confirmation: {
    title?: string
    subTitle?: string
    submit: Function
  }

  code = ''

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      code: {
        rules: 'required',
        messages: {
          required: ''
        },
        serverMessages: {
          invalid: 'Код введен неверно'
        }
      }
    }
  }

  onInput () {
    if (this.code.length === 4) {
      this.submit()
    }
  }

  async submit () {
    try {
      await this.confirmation.submit(this.code)

      this.$emit('ok')

      this.$store.commit('popup/SET_SMS_CONFIRMATION', null)
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
}
</script>

<style lang="scss">
  .popup-sms-confirmation {
    &__title {
      margin-top: 8px;
    }

    &__subtitle {
      margin: 8px 0 24px;
    }

    &__button {
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
