import { boot } from 'quasar/wrappers'

export default boot(() => {
  // const decorate = (fn: any) => {
  //   return async function(err: any) {
  //     if (err?.status === 403 && err?.method === 'token')
  //       return

  //     if (err?.status !== 401) {
  //       // @ts-expect-error
  //       return fn.call(this, err)
  //     }
  //   }
  // }

  // app.config.errorHandler = decorate(app.config.errorHandler)
})
