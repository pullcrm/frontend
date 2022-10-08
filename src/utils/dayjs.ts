import dayjs from 'dayjs'

import 'dayjs/locale/uk'

import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

dayjs.locale('uk')

export default dayjs

declare module 'dayjs' {
  interface Dayjs {
    isToday(): boolean
    isTomorrow(): boolean
  }
}
