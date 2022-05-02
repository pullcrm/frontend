
// import { FACEBOOK_ID } from '~/constants'

import { waitPageLoad } from '~/utils/wait-page-load'
import { waitIdle } from '~/utils/wait-idle'

import { AnalyticsInitializerError } from '../errors'

let initPromise: Promise<void>

async function loadFacebook (): Promise<void> {
  await waitPageLoad()
  await waitIdle({ timeout: 600 })

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.addEventListener('load', () => {
      resolve()
    })
    script.addEventListener('error', () => {
      reject(new AnalyticsInitializerError('Failed to load Facebook Pixel'))
    })
    document.body.appendChild(script)
  })
}

/* eslint-disable id-length */
export function initFacebook () {
  if (initPromise) return initPromise

  initPromise = Promise.resolve().then(() => {
    window.fbq = function (...args) {
      window.fbq.callMethod
        // eslint-disable-next-line prefer-spread
        ? window.fbq.callMethod.apply(window.fbq, args)
        : window.fbq.queue.push(args)
    }

    window._fbq = window.fbq
    window.fbq.push = window.fbq
    window.fbq.loaded = !0
    window.fbq.version = '2.0'
    window.fbq.queue = []
    // window.fbq('init', FACEBOOK_ID)

    loadFacebook()

    return null
  })

  return initPromise
}

declare global {
  interface Window {
    fbq: any,
    _fbq: any
  }
}
