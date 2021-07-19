import * as Sentry from '@sentry/browser'

import { Integration, EventName, EventPayload } from './integrations'

/**
 * Analytics
 *
 * The purpose of the service is to integrate marketing services with the project.
 * It is listening to events from the project and delegates them to an appropriate integration.
 * Each integration is responsible for a domain area like Google Analytics, Yandex Metrika, etc.
 * It receives events, transforms them to a suitable form, and sends them to a marketing service.
 */
export default class Analytics {
  mode:
    | 'stub'
    | 'default'

  integrations: Integration[] = []

  constructor ({ mode }: { mode: Analytics['mode'] }) {
    this.mode = mode
  }

  track = async<T extends EventName>(eventName: T, payload: EventPayload<T>) => {
    try {
      const tasks = this.integrations.map((integration) => {
        if (!integration[eventName]) return null

        if (this.mode === 'stub') {
          console.log(`[Analytics] Track '${eventName}' by '${integration.constructor.name}'`, payload)
          return null
        }

        return integration[eventName](payload)
      })

      await Promise.all(tasks)
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setTags({ category: 'analytics' })
        Sentry.captureException(err)
      })
    }
  }

  install = (integration: Integration) => {
    this.integrations.push(integration)
  }
}
