import { CANCELED, COMPLETED, IN_PROGRESS, IN_QUEUE } from '~/constants/appointment'
import { getPhoneNumber } from '~/utils/format-phone'

export const statusesDict = {
  [IN_PROGRESS]: 'В роботі',
  [CANCELED]: 'Відмінено',
  [COMPLETED]: 'Виконано',
  [IN_QUEUE]: 'В черзі',
}

export const sourcesDict = {
  ADMIN_PANEL: 'Адмін панель',
  WIDGET: 'Віджет',
}

export function normalizeAppointmentParams(submitParams: any) {
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
    hasCreationSMS,
  } = submitParams

  return {
    date: date.format('YYYY-MM-DD'),
    total,
    phone: getPhoneNumber(phone) || undefined,
    status,
    fullName,
    startTime: (startTime && `${startTime}:00`) ?? null,
    procedures: procedures.map(({ id }: any) => id),
    description,
    specialistId: specialistId ?? specialist.id,
    hasRemindSMS,
    hasCreationSMS,
  }
}

export function getProceduresDuration({ procedures }: any) {
  return procedures.reduce((acc: any, { duration }: any) => acc + duration, 0)
}

export function getAppointmentSubtitle(appointment: any) {
  const { procedures, description } = appointment

  let text = procedures
    .map(({ name }: any) => name)
    .join(', ')

  if (description)
    text += `\nКоментар: ${description}`

  return text
}
