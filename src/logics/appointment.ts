import { TIME_STEP } from '@/constants'

import { getDurationName } from '@/logics/hours'

export const statusesDict = {
  IN_PROGRESS: 'В работе',
  CANCELED: 'Отменен',
  COMPLETED: 'Выполнен'
}

export function normalizeAppointmentParams (submitParams) {
  const {
    date,
    total,
    phone,
    status,
    isQueue,
    employee,
    fullName,
    startTime,
    procedures,
    description
  } = submitParams

  return {
    date: date.format('YYYY-MM-DD'),
    total,
    phone: phone,
    status: status,
    isQueue: isQueue,
    fullName: fullName,
    startTime: isQueue ? null : `${startTime}:00`,
    employeeId: employee.id,
    procedures: procedures.map(({ id }) => id),
    description: description
  }
}

export function creationNotifyMessage (payload) {
  const { procedures, date, startTime, employee } = payload

  const proceduresText = procedures.map(({ name }) => name).join(', ')

  return `Новая запись! ${proceduresText} на ${date.format('D MMMM')} в ${startTime}. Сотрудник ${employee.firstName}`
}

export function remindNotifyMessage ({ procedures }, minutes) {
  const proceduresText = procedures.map(({ name }) => name).join(', ')

  return `Через ${getDurationName(minutes)} у вас ${proceduresText}`
}

export function getHoursSlots (slots, { duration }) {
  if (duration === 0) {
    return []
  }

  const hours = []
  const slotCount = duration / TIME_STEP

  Object.keys(slots).forEach(time => {
    let isAvailable = true

    if (slots[time] === true) {
      return
    }

    const startIndex = Object.keys(slots).indexOf(time.slice(0, 5))

    for (let index = 1; index < slotCount; index++) {
      const key = Object.keys(slots)[startIndex + index]

      if (slots[key] !== false) {
        isAvailable = false
      }
    }

    if (isAvailable) {
      hours.push(time)
    }
  })

  return hours
}
