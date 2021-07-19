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
    total: count || 0,
    online: online || 0,
    offline: offline || 0,
    completed: completed || 0,
    appointments: appointments.sort(sortAppointments)
  }
}

export function normalizeAnalyticsStats (stats) {
  const {
    amount,
    procedures,
    actualIncome,
    potentialIncome
  } = stats

  return {
    total: amount,
    income: actualIncome,
    average: potentialIncome,
    procedures: normalizeAnalyticsStatsProcedures(procedures)
  }
}

function normalizeAnalyticsStatsProcedures (procedures) {
  return procedures.map(item => {
    return {
      name: item.name,
      total: item.amount,
      online: item.online,
      income: item.actualIncome,
      offline: item.offline,
      average: item.potentialIncome,
      avgPrice: item.avgPrice
    }
  })
}
