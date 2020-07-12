import { getTime } from '@/utils/date-time'

import { START_TIME_OF_DAY, END_TIME_OF_DAY } from '@/constants'

export function normalizeTimeOffs (timeOffs) {
  return timeOffs.map(time => {
    const {
      id,
      employeeId,
      endDateTime,
      startDateTime
    } = time

    return {
      id,
      employeeId,
      endTime: getTime(endDateTime),
      startTime: getTime(startDateTime),
      endDateTime,
      startDateTime
    }
  })
}

export function isCloseDay ({ startDateTime, endDateTime }) {
  const endTime = getTime(endDateTime)
  const startTime = getTime(startDateTime)

  return (
    endTime === END_TIME_OF_DAY &&
    startTime === START_TIME_OF_DAY
  )
}
