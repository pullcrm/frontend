export const statusesDict = {
  IN_PROGRESS: 'В работе',
  CANCELED: 'Отменено',
  COMPLETED: 'Выполнено'
}

export const sourcesDict = {
  ADMIN_PANEL: 'Админ панель',
  WIDGET: 'Виджет'
}

export function normalizeAppointmentParams (submitParams) {
  const {
    date,
    total,
    phone,
    status,
    isQueue,
    fullName,
    startTime,
    specialist,
    procedures,
    description,
    specialistId, // custom prop
    hasRemindSMS,
    hasCreationSMS
  } = submitParams

  return {
    date: date.format('YYYY-MM-DD'),
    total,
    phone: phone || undefined,
    status: status,
    isQueue: isQueue,
    fullName: fullName,
    startTime: isQueue ? null : `${startTime}:00`,
    procedures: procedures.map(({ id }) => id),
    description: description,
    specialistId: specialistId ?? specialist.id,
    hasRemindSMS: hasRemindSMS,
    hasCreationSMS: hasCreationSMS
  }
}

export function getProceduresDuration ({ procedures }) {
  return procedures.reduce((acc, { duration }) => acc + duration, 0)
}

export function getAppointmentSubtitle (appointment) {
  const { procedures, description } = appointment

  let text = procedures
    .map(({ name }) => name)
    .join(', ')

  if (description) {
    text += `\nКомментарий: ${description}`
  }

  return text
}
