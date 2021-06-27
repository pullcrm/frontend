import { TIME_STEP } from '~/constants'

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

// TODO: Refactor
export function shiftTimeDownBySteps (workingHours, time, steps) {
  let timeIndex = workingHours.indexOf(time) - steps

  while (!workingHours[timeIndex]) {
    timeIndex += 1
  }

  return workingHours[timeIndex]
}

// TODO: Refactor
export function shiftTimeUpBySteps (workingHours, time, steps) {
  let timeIndex = workingHours.indexOf(time) + steps

  while (!workingHours[timeIndex]) {
    timeIndex -= 1
  }

  return workingHours[timeIndex]
}

// TODO: Refactor
export function getTimePoints (workingHours, { timeStart, totalTime }) {
  const fromIndex = workingHours.indexOf(timeStart)

  let toIndex = fromIndex + (totalTime / Number(TIME_STEP)) - 1

  if (!workingHours[toIndex]) {
    toIndex = workingHours.length - 1
  }

  return workingHours.slice(fromIndex, toIndex + 1)
}
