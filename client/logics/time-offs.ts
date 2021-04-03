import { START_TIME_OF_DAY, END_TIME_OF_DAY } from '~/constants'

import { getTime } from '~/utils/date-time'

export function normalizeTimeOffs (timeOffs) {
  return timeOffs.map(timeOff => {
    const {
      id,
      specialistId,
      endDateTime,
      startDateTime
    } = timeOff

    return {
      id,
      specialistId,
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
