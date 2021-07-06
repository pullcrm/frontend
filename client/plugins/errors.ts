import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ app }) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const decorate = (fn) => {
    return async function (err) {
      if (err.status !== 401) {
        return fn.call(this, err)
      }
    }
  }

  app.nuxt.error = decorate(app.nuxt.error)
}

export default plugin
