function sortAppointments (a, b) {
  return new Date(a.step).getTime() - new Date(b.step).getTime()
}

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
    appointments: appointments.sort(sortAppointments)
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
