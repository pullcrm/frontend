import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ typedStore }) => {
  if (typedStore.state.isSiteLoaded === false) {
    typedStore.commit('SITE_LOADED')
  }
}

export default middleware
