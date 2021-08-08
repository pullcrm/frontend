<template>
  <UiPopup
    class="sms-auth"
    @close="$emit('close')"
  >
    <UiTitle
      size="s"
      class="sms-auth__title"
    >
      Настройка API для отправки СМС
    </UiTitle>

    <UiText
      size="m"
      class="sms-auth__sub-title"
    >
      Для добавления СМС оповещений вам нужно выполнить действия описанные в
      <UiLink
        tag="a"
        theme="action"
        target="_blank"
        href="https://classic-helmet-a8f.notion.site/15550c9172b740b98d036829a93b7f95"
      >
        документации по ссылке
      </UiLink>.
    </UiText>

    <form @submit.prevent="submit">
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Имя отправителя"
            :error="getFieldError('companyName')"
            required
          >
            <UiInput
              v-model="companyName"
              left-icon="outlined/pencil"
              placeholder="Введите имя"
              @input="resetFieldError('companyName')"
            />
          </UiField>

          <UiField
            label="Публичный ключ"
            :error="getFieldError('publicKey')"
            required
          >
            <UiInput
              v-model="publicKey"
              left-icon="outlined/pencil"
              placeholder="Введите ключ"
              @input="resetFieldError('publicKey')"
            />
          </UiField>

          <UiField
            label="Приватный ключ"
            :error="getFieldError('privateKey')"
            required
          >
            <UiInput
              v-model="privateKey"
              left-icon="outlined/pencil"
              placeholder="Введите ключ"
              @input="resetFieldError('privateKey')"
            />
          </UiField>

          <UiButton
            type="submit"
            theme="blue"
            :loading="isLoading"
          >
            Авторизоваться
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SMS_CREATION_TEMPLATE, SMS_REMIND_TEMPLATE } from '~/constants'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

@Component({})
export default class ProcedureEdit extends Vue {
  publicKey = ''
  privateKey = ''
  companyName = ''

  isLoading = false

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      companyName: {
        rules: {
          max: 11,
          regex: /^([^!"#%'*,;<=>^{|}~]+)([A-Za-z]+)+$/,
          required: true
        },
        messages: {
          max: 'Максимальное количество символов 11',
          regex: 'Используйте только латинские буквы без спец символов',
          required: 'Введите имя компании'
        },
        serverMessages: {
          invalid: 'Имя введено неверно'
        }
      },
      publicKey: {
        rules: {
          required: true
        },
        messages: {
          required: 'Введите публичный ключ'
        }
      },
      privateKey: {
        rules: {
          required: true
        },
        messages: {
          required: 'Введите приватный ключ'
        }
      }
    }
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$api.sms.settingCreate({
        publicKey: this.publicKey,
        privateKey: this.privateKey,
        companyName: this.companyName,
        // default params
        hasRemindSMS: true,
        hasCreationSMS: false,
        remindSMSMinutes: 60,
        remindSMSTemplate: SMS_REMIND_TEMPLATE,
        creationSMSTemplate: SMS_CREATION_TEMPLATE
      })

      window.location.reload()
    } catch (err) {
      if (err.status === 404) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: 'Введены не верные данные'
        })

        return
      }

      this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Что-то не так!'
      })
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate({
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      companyName: this.companyName
    })
  }
}
</script>

<style lang="scss">
  .sms-auth {
    &__title {
      margin: 8px 0;
    }

    &__sub-title {
      margin-bottom: 24px;
      color: $ui-black-80;
    }

    .ui-button {
      width: 100%;
      margin-top: 24px;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
