<template>
  <Component
    :is="tag"
    class="ui-form-validator"
  >
    <slot v-bind="this" />
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import {
  Fields,
  validateFields,
  FieldsValidations,
  IFieldServerError
} from '~/validators/validate-fields'

export type Validations = FieldsValidations;

@Component({
  props: {
    tag: {
      type: String,
      default: 'div'
    },

    validations: {
      type: Object,
      required: true
    }
  }
})
export default class FormValidator extends Vue {
  readonly validations: FieldsValidations

  errors = {}

  get isValid () {
    return Object.keys(this.errors).length === 0
  }

  async validate (fields: Fields) {
    const errors = await validateFields(fields, this.validations)

    this.reset()

    errors.forEach(({ field, errorMessage }) => {
      this.setFieldError(field, errorMessage)
    })

    return this.isValid
  }

  getFieldError (field: string) {
    return this.errors[field] || null
  }

  setFieldError (field: string, errorMessage: string) {
    Vue.set(this.errors, field, errorMessage || true)
  }

  resetFieldError (field: string) {
    Vue.delete(this.errors, field)
  }

  setServerErrors (errors: IFieldServerError[]) {
    errors.forEach(this.setServerError)
  }

  setServerError ({ field, error, constraint }: IFieldServerError) {
    let errorMessage = this.validations[field].serverMessages[error]

    if (typeof errorMessage === 'function') {
      errorMessage = errorMessage(field, constraint || {})
    }

    this.setFieldError(field, errorMessage)
  }

  reset () {
    this.errors = {}
  }
}
</script>
