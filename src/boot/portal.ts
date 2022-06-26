import { boot } from 'quasar/wrappers'

// @ts-expect-error
import Portal from 'vue3-portal'

export default boot(({ app }: any) => {
  app.use(Portal)
})
