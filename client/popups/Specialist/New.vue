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
          label="Имя и Фамилия"
          :error="getFieldError('fullName')"
        >
          <UiInput
            v-model="form.fullName"
            name="name"
            placeholder="Введите Имя и Фамилию"
            required
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
            theme="blue"
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

import { IRegistrationUserParams } from '~/services/api'

import { formatPhone } from '~/utils/format-phone'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import FileUpload from '~/components/FileUpload/FileUpload.vue'

@Component({
  components: {
    FileUpload
  }
})
export default class SpecialistNew extends Vue {
  form: IRegistrationUserParams = {
    fullName: '',
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

  get specialistsDict () {
    return this.$typedStore.getters['specialists/specialistsDict']
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
    const result = await this.$typedStore.dispatch('popup/smsConfirmation', {
      title: 'Регистрация',
      subTitle: `На телефон ${formatPhone(this.form.phone)} был выслан СМС-код для подтверждения регистрации`,
      submit: this.onCreateUser
    })

    if (result) {
      this.$emit('close')
    }
  }

  async onCreateUser (code) {
    const { id } = await this.$api.specialist.create({
      ...this.form,
      code
    })

    await this.$typedStore.dispatch('specialists/fetch')

    if (this.$typedStore.getters['procedures/total'] > 0) {
      const specialist = this.specialistsDict[id]

      this.$typedStore.dispatch('popup/show', {
        name: 'specialist-procedures',
        props: { specialist }
      })
    }
  }
}
</script>

<style lang="scss" src="./Specialist.scss"></style>
