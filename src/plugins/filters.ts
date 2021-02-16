import Vue from 'vue'

import { formatMoney } from '@/utils/money'
import { formatDate } from '@/utils/date-time'
import { pluralize } from '@/utils/pluralize'

Vue.filter('formatDate', formatDate)
Vue.filter('pluralize', pluralize)

Vue.filter('formatPhone', (phone?: string) => {
  if (!phone) return ''

  return String(phone).replace(
    /(\d{3})(\d{3})(\d{2})(\d{2})/,
    '38 ($1) $2-$3-$4'
  )
})

Vue.filter('price', formatMoney)
