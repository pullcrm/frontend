import { AnalyticsInitializerError } from '../errors'

let initPromise: Promise<void>
let loadPromise: Promise<void>

function loadGoogleAnalytics () {
  if (loadPromise) return loadPromise

  loadPromise = Promise.resolve().then(() => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.google-analytics.com/analytics.js'
      script.addEventListener('load', () => {
        resolve()
      })
      script.addEventListener('error', () => {
        reject(new AnalyticsInitializerError('Failed to load Google Analytics'))
      })
      document.body.appendChild(script)
    })
  })

  return loadPromise
}

export function initGoogleAnalytics (options: { id: string }) {
  if (initPromise) return initPromise

  initPromise = Promise.resolve().then(() => {
    window.ga = window.ga || ((...args) => {
      (window.ga.q = window.ga.q || []).push(args)
    })

    window.ga.l = Date.now()
    window.ga('create', options.id, {
      name: 'pullcrm',
      cookieFlags: 'samesite=none;secure'
    })
    window.ga('pullcrm.require', 'displayfeatures')

    loadGoogleAnalytics()

    return null
  })

  return initPromise
}

export async function getGoogleAnalyticsClientId (options: { id: string }): Promise<string | null> {
  try {
    await initGoogleAnalytics({ id: options.id })
    await loadGoogleAnalytics()

    const tracker = window.ga.getAll()[0]

    return tracker.get('clientId')
  } catch {
    return null
  }
}

declare global {
  interface Window {
    ga: any
  }
}
