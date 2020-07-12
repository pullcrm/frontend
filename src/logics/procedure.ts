import { pluralize } from '@/utils/pluralize'

export function durations () {
  let i = 0
  const minutes = ['00', '15', '30', '45']

  let list = []

  while (i <= 3) {
    list = [
      ...list,
      ...minutes.map(minute => ({
        name: `${i > 0 ? `${i} ${pluralize(i, 'час', 'часа', 'часов')} ` : ''}${minute} минут`,
        value: (i * 60 + parseInt(minute)) * 60
      }))
    ]

    i++
  }

  list.splice(0, 1)

  return list
}

export function getDurationName (time) {
  return durations().find(item => item.value === time)?.name
}