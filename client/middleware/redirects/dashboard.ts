import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ redirect, typedStore }) => {
  if (typedStore.state.auth.accessToken) {
    redirect({ name: 'dashboard' })
  }
}

export default middleware
