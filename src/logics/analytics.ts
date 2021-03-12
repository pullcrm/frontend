export function normalizeAppointmentsStats (stats) {
  const {
    count,
    online,
    offline,
    completed,
    appointments
  } = stats

  return {
    total: count,
    online,
    offline,
    completed,
    appointments: appointments.reverse()
  }
}

export function normalizeAnalyticsStats (stats) {
  const {
    avg,
    count,
    income,
    procedures
  } = stats

  return {
    total: count,
    income,
    average: avg,
    procedures
  }
}
