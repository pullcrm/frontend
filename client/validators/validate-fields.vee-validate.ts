import { extend, validate } from 'vee-validate'

import {
  min,
  max,
  email,
  regex,
  required,
  confirmed,
  max_value,
  min_value
} from 'vee-validate/dist/rules'

extend('confirmed', confirmed)
extend('required', required)
extend('email', email)
extend('regex', regex)
extend('min', min)
extend('max', max)
extend('min_value', min_value)
extend('max_value', max_value)

export { validate }
