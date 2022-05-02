import { Plugin } from '@nuxt/types'

import { Route } from 'vue-router/types/router'

// import { getCLS, getFID, getLCP } from 'web-vitals'

// import { GA_ID } from '~/constants'

import Analytics from '~/services/analytics'
// import FacebookIntegration from '~/services/analytics/integrations/facebook-integration'
// import GoogleAnalyticsIntegration from '~/services/analytics/integrations/google-analytics-integration'
// import WidgetPostMessageIntegration from '~/services/analytics/integrations/widget-post-message-integration'

const plugin: Plugin = async ({ app }, inject) => {
  // const host = window.location.host

  // const widget = route.meta.find(({ widget }) => widget)

  // Initialize the analytics service
  const analytics = new Analytics({
    mode: process.env.NODE_ENV === 'development'
      ? 'stub'
      : 'default'
  })

  // Install the widget post message integration
  // if (widget) {
  //   analytics.install(new WidgetPostMessageIntegration({
  //     widget
  //   }))
  // }

  // Install the facebook integration
  // analytics.install(new FacebookIntegration())

  // Install the google analytics integration
  // analytics.install(new GoogleAnalyticsIntegration({
  //   id: GA_ID,
  //   host
  // }))

  app.router.afterEach(async (to: Route, from: Route) => {
    analytics.track('pageView', {
      to,
      // Set `null` if the router couldn't resolve a previous component
      from: from.matched.length > 0 ? from : null
    })
  })

  // const sendWebVitals = ({ name, delta, id }) => {
  //   analytics.track('webVitals', { name, delta, id })
  // }

  // if (Math.random() <= 0.25) {
  //   getCLS(sendWebVitals)
  //   getFID(sendWebVitals)
  //   getLCP(sendWebVitals)
  // }

  inject('track', analytics.track)
}

export default plugin

declare module 'vuex/types' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $track: Analytics['track']
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $track: Analytics['track']
  }
}
