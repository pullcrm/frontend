import { validate as veeValidate } from 'vee-validate'

export type FieldClientRules =
  | string
  | Record<string, any>

export type FieldServerErrorMessage =
  | string
  | ((field: string, constraints: object) => string)

export type FieldServerErrorMessages = Record<string, FieldServerErrorMessage>
export type FieldClientErrorMessages = Record<string, string>

export interface IFieldServerError {
  field: string,
  error: string,
  constraint?: object
}

export interface IFieldClientError {
  field: string,
  errorMessage: string
}

export interface IFieldValidation {
  rules?: FieldClientRules,
  messages?: FieldClientErrorMessages,
  serverMessages?: FieldServerErrorMessages
}

export type Fields = Record<string, any>
export type FieldsValidations = Record<string, IFieldValidation>

/**
 * Validate fields on the client side using `vee-validate` package
 */
export async function validate (fields: Fields, validations: FieldsValidations) {
  const errors: IFieldClientError[] = []

  for (const [field, { rules, messages }] of Object.entries(validations)) {
    const fieldValue = fields[field]

    const { valid, failedRules } = await veeValidate(fieldValue, rules, {
      values: fields
    })

    if (valid) continue

    const failedRule = Object.keys(failedRules)[0]

    errors.push({
      field,
      errorMessage: messages[failedRule]
    })
  }

  return errors
}
