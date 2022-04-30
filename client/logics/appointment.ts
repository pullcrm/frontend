import { IN_PROGRESS, CANCELED, COMPLETED, IN_QUEUE } from '~/constants/appointment'

export const statusesDict = {
  [IN_PROGRESS]: 'В работі',
  [CANCELED]: 'Відмінено',
  [COMPLETED]: 'Виконано',
  [IN_QUEUE]: 'В черзі'
}

export const sourcesDict = {
  ADMIN_PANEL: 'Адмін панель',
  WIDGET: 'Віджет'
}

export function normalizeAppointmentParams (submitParams) {
  const {
    date,
    total,
    phone,
    status,
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
    status,
    fullName: fullName,
    startTime: (startTime && `${startTime}:00`) ?? null,
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
    text += `\nКоментар: ${description}`
  }

  return text
}
