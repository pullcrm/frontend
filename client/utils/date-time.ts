import * as dayjs from 'dayjs'

import 'dayjs/locale/uk'

const isToday = require('dayjs/plugin/isToday')
const isTomorrow = require('dayjs/plugin/isTomorrow')

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

dayjs.locale('ru')

export function formatDate (date: Date, format: string) {
  const formattedDate = dayjs(date).format(format)

  return formattedDate
}

export function toDate (date: string) {
  return dayjs(date.split('.')[0])
}

export function getTime (date: string) {
  date = date.split('.')[0]

  return dayjs(date).format('HH:mm')
}
