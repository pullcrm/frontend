import Vue from 'vue'
import Router from 'vue-router'

import routes from '~/routes'

// Fix NavigationDuplicated error
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}
// end fix

Vue.use(Router)

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'

  window.addEventListener('beforeunload', () => {
    window.history.scrollRestoration = 'auto'
  })

  window.addEventListener('load', () => {
    window.history.scrollRestoration = 'manual'
  })
}

export function createRouter () {
  return new Router({
    mode: 'history',

    fallback: true,

    scrollBehavior (_to, _from, savedPosition) {
      let position = { x: 0, y: 0 }

      if (savedPosition) {
        position = savedPosition
      }

      return new Promise((resolve) => {
        this.app.$root.$once('triggerScroll', () => {
          resolve(position)
        })
      })
    },

    routes: routes
      .filter(Boolean)
      .map((route) => {
        return { ...route, pathToRegexpOptions: { strict: true } }
      })
  })
}
