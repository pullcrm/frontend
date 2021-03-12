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
