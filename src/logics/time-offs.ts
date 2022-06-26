import { getTime } from '~/utils/date-time'

export function normalizeTimeOffs(timeOffs: any) {
  return timeOffs.map((timeOff: any) => {
    const {
      id,
      description,
      specialistId,
      endDateTime,
      startDateTime,
    } = timeOff

    return {
      id,
      description,
      specialistId,
      endTime: getTime(endDateTime),
      startTime: getTime(startDateTime),
      endDateTime,
      startDateTime,
    }
  })
}

export function isCloseDay({ startDateTime, endDateTime }: any, timeWork: any) {
  const endTime = getTime(endDateTime)
  const startTime = getTime(startDateTime)

  return (
    endTime === timeWork.to
    && startTime === timeWork.from
  )
}
