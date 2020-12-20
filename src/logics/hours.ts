import { pluralize } from '@/utils/pluralize'

export const durations = getDurations()

export function getDurationName (time) {
  return durations.find(item => item.value === time)?.name
}

function getDurations () {
  const list = []

  let hour = 0
  let minute = 0

  while (hour < 4) {
    const time = []

    minute += 15

    if (minute === 60) {
      hour++
      minute = 0
    }

    if (hour > 0) {
      time.push(`${hour} ${pluralize(hour, 'час', 'часа', 'часов')}`)
    }

    if (minute > 0) {
      time.push(`${minute} минут`)
    }

    list.push({
      name: time.join(' '),
      value: hour * 60 + minute
    })
  }

  return list
}
