<template>
  <UiPopup
    class="popup-specialist"
    @close="$emit('close')"
  >
    <div class="popup-specialist__header">
      <UiTitle
        size="s"
      >
        Додати співробітника
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
          label="Ім'я та Прізвище"
          :error="getFieldError('fullName')"
        >
          <UiInput
            v-model="form.fullName"
            name="name"
            placeholder="Введіть Ім'я та Прізвище"
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

        <div class="popup-specialist__actions">
          <UiButton
            size="l"
            type="submit"
            theme="blue"
            :loading="isLoading"
          >
            Додати співробітника
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
      fullName: {
        rules: 'required',
        messages: {
          required: 'Введіть Ім\'я та Призвіще'
        }
      },
      phone: {
        rules: 'required',
        messages: {
          required: 'Введіть номер телефону'
        },
        serverMessages: {
          invalid: 'Номер телефону введено невірно'
        }
      }
    }
  }

  get specialistsDict () {
    return this.$typedStore.getters['specialists/specialistsDict']
  }

  async onSubmit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      const { id } = await this.$api.specialist.create(this.form)

      await this.$typedStore.dispatch('specialists/fetch')

      if (this.$typedStore.getters['procedures/total'] > 0) {
        const specialist = this.specialistsDict[id]

        this.$typedStore.dispatch('popup/show', {
          name: 'specialist-procedures',
          props: { specialist }
        })
      }
    } catch (err) {
      const serverErrors = [
        err.fieldName === 'phone' && { field: 'phone', error: 'invalid' }
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
      phone: this.form.phone,
      fullName: this.form.fullName
    })
  }
}
</script>

<style lang="scss" src="./Specialist.scss"></style>
