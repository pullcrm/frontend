import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import * as Sentry from '@sentry/browser'
import { Dedupe, ExtraErrorData, Vue as VueIntegration } from '@sentry/integrations'

const plugin: Plugin = ({ runtimeConfig }) => {
  Sentry.init({
    dsn: runtimeConfig.SENTRY_DSN,
    release: runtimeConfig.SENTRY_RELEASE,
    environment: runtimeConfig.SENTRY_ENV,
    integrations: [
      new Dedupe(),
      new ExtraErrorData(),
      new VueIntegration({ Vue }),
      new Sentry.Integrations.Breadcrumbs({
        dom: false,
        xhr: true,
        fetch: true,
        sentry: true,
        history: true,
        console: true
      })
    ],
    ignoreErrors: [
      /NavigationDuplicated/,
      /Redirected when going from/,
      /Navigation cancelled/,
      'AnalyticsInitializerError',
      /javacalljswithargs/i
    ],
    beforeSend (event, hint) {
      if (!hint || !hint.originalException || !(hint.originalException instanceof Error)) return event

      const originalException = hint.originalException

      // @ts-ignore
      if (originalException.sentryFingerprint) {
        // @ts-ignore
        event.fingerprint = originalException.sentryFingerprint
      }

      // @ts-ignore
      if (originalException.sentryCategory) {
        // @ts-ignore
        event.tags = { ...event.tags, category: originalException.sentryCategory }
      }

      return event
    }
  })
}

export default plugin
