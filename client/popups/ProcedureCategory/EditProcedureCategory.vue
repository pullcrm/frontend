<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Редагувати категорію
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
              v-model="category.name"
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
            Редагувати
          </UiButton>

          <UiButton
            size="m"
            theme="danger-outlined"
            :loading="isLoading"
            @click.native="remove"
          >
            Видалити категорію
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ICategory } from '~/services/api'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

@Component({
  props: {
    category: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  category!: ICategory

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

      await this.$api.categories.update(this.category.id, {
        name: this.category.name,
        type: 'PROCEDURE'
      })

      await this.$typedStore.dispatch('procedures/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  async remove () {
    try {
      this.isLoading = true

      await this.$api.categories.remove(this.category.id)

      await this.$typedStore.dispatch('procedures/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate({
      name: this.category.name
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

      & + .ui-button {
        margin-top: 20px;
      }
    }
  }
</style>
