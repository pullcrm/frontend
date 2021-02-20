<template>
  <UiPopup
    class="popup-specialist"
    @close="$emit('close')"
  >
    <UiBack
      class="popup-specialist__back"
      @click.native="$emit('close')"
    />

    <div class="popup-specialist__header">
      <UiTitle
        size="s"
      >
        Добавить сотрудника
      </UiTitle>
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
          label="Имя"
          :error="getFieldError('firstName')"
        >
          <UiInput
            v-model="form.firstName"
            name="name"
            placeholder="Введите Имя"
            required
            @input="resetFieldError('firstName')"
          />
        </UiField>

        <UiField
          label="Фамилия"
          :error="getFieldError('lastName')"
        >
          <UiInput
            v-model="form.lastName"
            name="surname"
            placeholder="Введите Фамилию"
            required
            @input="resetFieldError('lastName')"
          />
        </UiField>

        <UiField
          label="Телефон"
          :error="getFieldError('phone')"
        >
          <UiInput
            v-model="form.phone"
            mask="38 (###) #### ###"
            name="phone"
            type="phone"
            required
            left-icon="outlined/phone"
            placeholder="066"
            @input="resetFieldError('phone')"
          />
        </UiField>

        <div class="popup-specialist__actions">
          <UiButton
            size="l"
            type="submit"
            theme="yellow"
            :loading="isLoading"
          >
            Добавить сотрудника
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

import { IRegistrationUserParams } from '@/services/api'

import UiFormValidator, { Validations } from '@/ui/FormValidator.vue'

@Component({
  components: {
    FileUpload
  }
})
export default class SpecialistNew extends Vue {
  form: IRegistrationUserParams = {
    firstName: '',
    lastName: '',
    phone: ''
  }

  isLoading = false

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
      }
    }
  }

  async onSubmit () {
    try {
      this.isLoading = true

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
    } finally {
      this.isLoading = false
    }
  }

  async confirmation () {
    const result = await this.$store.dispatch('popup/smsConfirmation', {
      title: 'Регистрация',
      subTitle: `На ваш телефон ${this.form.phone} был выслан СМС-код для подтверждения регистрации`,
      submit: this.onCreateUser
    })

    if (result) {
      await this.$store.dispatch('specialists/fetch')

      this.$emit('close')
    }
  }

  async onCreateUser (code) {
    return this.$api.specialist.create({
      ...this.form,
      code
    })
  }
}
</script>

<style lang="scss" src="./Specialist.scss"></style>
