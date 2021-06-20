import dayjs from './dayjs'
import { pluralize } from './pluralize'

export function slugFromTime (time) {
  return `time-${time.slice(0, 5).replace(':', '-')}`
}

export function minutesToTime (minutes: number) {
  const date = dayjs().hour(0).minute(minutes)

  const hour = date.hour()
  const minute = date.minute()

  let str = ''

  if (hour > 0) {
    str += `${hour} ${pluralize(hour, 'час', 'часа', 'часов')}`
  }

  if (str) {
    str += ' '
  }

  if (minute > 0) {
    str += `${minute} ${pluralize(minute, 'минута', 'минуты', 'минут')}`
  }

  return str
}

export function setTime (date: Date, time: string) {
  const [hour, minute] = time.split(':')

  return dayjs(date).hour(Number(hour)).minute(Number(minute)).second(0)
}

export function getWorkingHours (open, close) {
  const hours = []

  let from = setTime(new Date(), open)

  do {
    hours.push(from.format('HH:mm'))

    from = from.add(15, 'm')
  } while (from.format('HH:mm') !== close)

  return [...hours, close]
}
