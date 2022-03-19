<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Додати категорію
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Назва категорії"
            :error="getFieldError('name')"
            required
          >
            <UiInput
              v-model="name"
              left-icon="outlined/pencil"
              placeholder="Введіть назву"
              @input="resetFieldError('name')"
            />
          </UiField>

          <UiButton
            type="submit"
            size="l"
            theme="blue"
            :loading="isLoading"
          >
            Додати
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

@Component({})
export default class ProcedureEdit extends Vue {
  name = ''

  isLoading = false

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      name: {
        rules: {
          min: 4,
          max: 255,
          required: true
        },
        messages: {
          min: 'Мінімальна кількість символів: 4',
          max: 'Максимальна кількість символів: 255',
          required: 'Введіть назву категорії'
        }
      }
    }
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$api.categories.create({
        name: this.name,
        type: 'PROCEDURE'
      })

      await this.$typedStore.dispatch('procedures/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate({
      name: this.name
    })
  }
}
</script>

<style lang="scss">
  .new-procedures-category {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
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
