export class AnalyticsInitializerError extends Error {
  constructor (message: string) {
    super()

    this.name = 'AnalyticsInitializerError'
    this.message = message
  }
}
