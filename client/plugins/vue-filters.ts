import Vue from 'vue'

import { formatMoney } from '~/utils/money'
import { formatDate } from '~/utils/date-time'
import { pluralize } from '~/utils/pluralize'
import { minutesToTime } from '~/utils/time'
import { formatPhone } from '~/utils/format-phone'

Vue.filter('formatDate', formatDate)
Vue.filter('pluralize', pluralize)
Vue.filter('minutesToTime', minutesToTime)

Vue.filter('formatPhone', formatPhone)

Vue.filter('price', formatMoney)
