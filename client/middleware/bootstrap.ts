import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ typedStore }) => {
  if (typedStore.state.isSiteLoaded) {
    return
  }

  if (!typedStore.state.position.current) {
    return
  }

  const isSMSAuthorize = typedStore.getters['sms/isAuthorize']

  await Promise.all([
    typedStore.dispatch('position/fetchTimetable'),
    typedStore.dispatch('procedures/fetch'),
    typedStore.dispatch('specialists/fetch'),
    isSMSAuthorize && typedStore.dispatch('sms/balance')
  ])
}

export default middleware
