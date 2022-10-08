import dayjs from './dayjs'
import { pluralize } from './pluralize'

export function slugFromTime(time: string) {
  return `time-${time.slice(0, 5).replace(':', '-')}`
}

export function minutesToTime(minutes: number) {
  const date = dayjs().hour(0).minute(minutes)

  const hour = date.hour()
  const minute = date.minute()

  let str = ''

  if (hour > 0)
    str += `${hour} ${pluralize(hour, 'година', 'години', 'годин')}`

  if (str)
    str += ' '

  if (minute > 0)
    str += `${minute} ${pluralize(minute, 'хвилина', 'хвилини', 'хвилин')}`

  return str
}

export function setTime(date: Date, time: string): dayjs.Dayjs {
  const [hour, minute] = time.split(':')

  return dayjs(date).hour(Number(hour)).minute(Number(minute)).second(0)
}

export function getWorkingHours(start: string, end: string, options?: { step?: number }) {
  const { step = 15 } = options || {}

  const hours = []

  let from = setTime(new Date(), start)

  do {
    hours.push(from.format('HH:mm'))

    from = from.add(step, 'm')
  } while (from.format('HH:mm') !== end)

  return [...hours, end]
}
