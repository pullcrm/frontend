import { WORKING_HOURS } from '@/constants/generated'

import { getTime } from './date-time'

const TIME_STEP = process.env.VUE_APP_CALENDAR_TIME_STEP

export function slugFromTime (time) {
  return `time-${time.slice(0, 5).replace(':', '-')}`
}

export function timeFromSlug (slug) {
  return slug.replace('time-', '').replace('-', ':')
}

export function timeIndexOnTimeline ({ hours, time }) {
  return hours.findIndex(hour => hour === time)
}

export function getDurationFromTo (params: { timeStart?: string, date?: string, totalTime: number }) {
  let { date, totalTime, timeStart } = params

  if (!timeStart) {
    timeStart = getTime(date)
  }

  const timeStartIndex = WORKING_HOURS.indexOf(timeStart)
  const timeEndIndex = timeStartIndex + (totalTime / Number(TIME_STEP))

  return {
    from: timeStart,
    to: WORKING_HOURS[timeEndIndex]
  }
}

export function getDurationSlotsFromTo (params: { timeStart: string, totalTime: number }) {
  const { totalTime, timeStart } = params

  const timeStartIndex = WORKING_HOURS.indexOf(timeStart)
  let timeEndIndex = timeStartIndex + (totalTime / Number(TIME_STEP)) - 1

  if (timeEndIndex > 40) {
    timeEndIndex = 40
  }

  return {
    from: `${slugFromTime(timeStart)}-start`,
    to: `${slugFromTime(WORKING_HOURS[timeEndIndex])}-end`
  }
}
