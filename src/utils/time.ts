import dayjs from './dayjs'
import { pluralize } from './pluralize'

export function slugFromTime (time) {
  return `time-${time.slice(0, 5).replace(':', '-')}`
}

export function minutesToTime (minutes: number) {
  const date = dayjs().hour(0).minute(0).minute(minutes)

  const hour = date.hour()
  const minute = date.minute()

  let str = ''

  if (hour > 0) {
    str += `${hour} ${pluralize(hour, 'час', 'часа', 'часов')} `
  }

  if (minute > 0) {
    str += `${minute} ${pluralize(minute, 'минута', 'минуты', 'минут')}`
  }

  return str
}
