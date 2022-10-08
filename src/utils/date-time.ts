import dayjs from 'dayjs'

import 'dayjs/locale/uk'

import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

dayjs.locale('ru')

export function formatDate(date: Date | string, format: string) {
  const formattedDate = dayjs(date).format(format)

  return formattedDate
}

export function toDate(date: string) {
  return dayjs(date.split('.')[0])
}

export function getTime(date: string) {
  date = date.split('.')[0]

  return dayjs(date).format('HH:mm')
}
