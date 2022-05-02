export const IN_PROGRESS = 'IN_PROGRESS'
export const CANCELED = 'CANCELED'
export const COMPLETED = 'COMPLETED'
export const IN_QUEUE = 'IN_QUEUE'

export type AppointmentStatuses = typeof IN_PROGRESS | typeof CANCELED | typeof COMPLETED | typeof IN_QUEUE
