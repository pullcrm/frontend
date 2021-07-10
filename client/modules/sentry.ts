import { Module } from '@nuxt/types'
import * as Sentry from '@sentry/node'
import { Transaction, Dedupe, ExtraErrorData, RewriteFrames } from '@sentry/integrations'

const SentryModule: Module = function () {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
    environment: process.env.SENTRY_ENV,
    integrations: [
      new Dedupe(),
      new Transaction(),
      new RewriteFrames(),
      new ExtraErrorData()
    ],
    beforeSend (event, hint) {
      if (!hint || !hint.originalException || !(hint.originalException instanceof Error)) {
        return event
      }

      const exception = hint.originalException

      // Set the event category
      // @ts-ignore
      const category = exception.sentryCategory

      if (category) {
        event.tags = { ...event.tags, category }
      }

      // Set the event fingerprint
      // @ts-ignore
      const fingerprint = exception.sentryFingerprint

      if (fingerprint) {
        event.fingerprint = fingerprint
      }

      // Set the event IP address
      // event.user.ip_address = event.request
      //   ? event.request.headers['x-real-ip']
      //   : undefined

      return event
    }
  })

  this.nuxt.hook('render:setupMiddleware', (app) => app.use(Sentry.Handlers.requestHandler()))
  this.nuxt.hook('render:errorMiddleware', (app) => app.use(Sentry.Handlers.errorHandler()))
}

export default SentryModule
