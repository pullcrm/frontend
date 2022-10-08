import { boot } from 'quasar/wrappers'
import { LoadingBar } from 'quasar'

export default boot(({ router }: any) => {
  router.beforeEach((from: any, to: any) => {
    if (process.env.CLIENT && from.path !== to.path)
      LoadingBar.start()
  })

  router.afterEach(() => {
    if (process.env.CLIENT)
      LoadingBar.stop()
  })
})
