<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Добавить категорию
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Название категории"
            :error="getFieldError('name')"
            required
          >
            <UiInput
              v-model="name"
              left-icon="outlined/pencil"
              placeholder="Введите название"
              @input="resetFieldError('name')"
            />
          </UiField>

          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Добавить
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
          min: 'Минимальное количество символов: 4',
          max: 'Максимальное количество символов: 255',
          required: 'Введите название категории'
        }
      }
    }
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    await this.$api.categories.create({
      name: this.name,
      type: 'PROCEDURE'
    })

    await this.$typedStore.dispatch('procedures/fetch')

    this.$emit('close')
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
