import type { Ref } from 'vue'
import { reactive } from 'vue'

import useValidate from '@vuelidate/core'
import { helpers, maxLength, maxValue, minLength, minValue, required, sameAs } from '@vuelidate/validators'

export function ValidateRequired(message: string) {
  return { required: helpers.withMessage(message, required) }
}

export function ValidateSameAs(message: string, value: String | Number | Boolean | Ref) {
  return { sameAs: helpers.withMessage(message, sameAs(value)) }
}

export function ValidateMinLength(message: string, length: number) {
  return { minLength: helpers.withMessage(message, minLength(length)) }
}

export function ValidateMaxLength(message: string, length: number) {
  return { minLength: helpers.withMessage(message, maxLength(length)) }
}

export function ValidateMinValue(message: string, value: number) {
  return { minLength: helpers.withMessage(message, minValue(value)) }
}

export function ValidateMaxValue(message: string, value: number) {
  return { minLength: helpers.withMessage(message, maxValue(value)) }
}

export function ValidatePhone(message: string) {
  // TODO: Validate as phone
  return { minLength: helpers.withMessage(message, minLength(10)) }
}

export default function (validations: any, state: object, params: any = {}) {
  params = { $lazy: true, $externalResults: params.serverErrors || ref({}), ...params }

  return useValidate(validations, state, params)
}
