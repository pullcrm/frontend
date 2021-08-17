import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ redirect, route }) => {
  if (route.query.homescreen) {
    return redirect({ name: 'dashboard' })
  }
}

export default middleware
