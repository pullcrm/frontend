import uniqBy from 'lodash/uniqBy'
import { api } from '~/boot/api'
import { formatDate } from '~/utils/date-time'

export async function fetchTimetable(specialistId: number): Promise<Record<number, any>> {
  const result = await api.timetable.find(specialistId)

  const filtered = uniqBy(result.map((item: any) => {
    return {
      date: formatDate(item.startDateTime, 'YYYY-MM-DD'),
      start: formatDate(item.startDateTime, 'HH:mm'),
      end: formatDate(item.endDateTime, 'HH:mm'),
      ...item,
    }
  }), 'date')

  return {
    [specialistId]: filtered.reduce((dict, item) => {
      return {
        ...dict,
        // @ts-expect-error
        [item.date]: item,
      }
    }, {}),
  }
}
