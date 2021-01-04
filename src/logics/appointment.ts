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
    description,
    specialistId, // custom prop
    smsRemindNotify,
    smsCreationNotify
  } = submitParams

  return {
    date: date.format('YYYY-MM-DD'),
    total,
    phone: phone,
    status: status,
    isQueue: isQueue,
    fullName: fullName,
    startTime: isQueue ? null : `${startTime}:00`,
    employeeId: specialistId ?? employee.id,
    procedures: procedures.map(({ id }) => id),
    description: description,
    smsRemindNotify: smsRemindNotify,
    smsCreationNotify: smsCreationNotify
  }
}

export function getProceduresDuration ({ procedures }) {
  return procedures.reduce((acc, { duration }) => (acc + duration), 0)
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
