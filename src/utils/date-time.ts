import * as dayjs from 'dayjs'

import 'dayjs/locale/ru'

const isToday = require('dayjs/plugin/isToday')
const isTomorrow = require('dayjs/plugin/isTomorrow')

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

dayjs.locale('ru')

export function formatDate (date: Date, format: string) {
  const formattedDate = dayjs(date).format(format)

  return formattedDate
}

export function setTime (date: Date, time: string) {
  const [hour, minute] = time.split(':')

  return dayjs(date).hour(Number(hour)).minute(Number(minute)).second(0)
}

export function getTime (date: string) {
  date = date.split('.')[0]

  return dayjs(date).format('HH:mm')
}

export function toDate (date: string) {
  return dayjs(date.split('.')[0])
}

export function subtractTime (startTime, minutes) {
  const date = setTime(new Date(), startTime)

  return date.subtract(Number(minutes), 'm').format('HH:mm')
}
