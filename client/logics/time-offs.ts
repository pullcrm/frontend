import { getTime } from '~/utils/date-time'

export function normalizeTimeOffs (timeOffs) {
  return timeOffs.map(timeOff => {
    const {
      id,
      description,
      specialistId,
      endDateTime,
      startDateTime
    } = timeOff

    return {
      id,
      description,
      specialistId,
      endTime: getTime(endDateTime),
      startTime: getTime(startDateTime),
      endDateTime,
      startDateTime
    }
  })
}

export function isCloseDay ({ startDateTime, endDateTime }, timeWork) {
  const endTime = getTime(endDateTime)
  const startTime = getTime(startDateTime)

  return (
    endTime === timeWork.to &&
    startTime === timeWork.from
  )
}
