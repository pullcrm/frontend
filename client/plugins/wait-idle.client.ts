import { Plugin } from '@nuxt/types'

const waitIdlePlugin: Plugin = async () => {
  if (process.client) {
    // Wait in order to give a time for other tasks, before it's going to start hydration
    await new Promise((resolve) => {
      return setTimeout(resolve, 0)
    })
  }
}

export default waitIdlePlugin
