import { Middleware } from '@nuxt/types'

import { SPECIALIST } from '~/constants/roles'

const middleware: Middleware = async ({ typedStore, route, redirect }) => {
  if (route.meta.some((record) => record.public)) return

  if (['companyCreate'].includes(route.name)) {
    return
  }

  const role = typedStore.getters['position/role']
  const specialistId = typedStore.getters['position/currentId']

  if (role.name === SPECIALIST) {
    if (
      /\/specialist\//.test(route.path) &&
      Number(route.params.specialistId) === specialistId
    ) return

    redirect({
      name: 'specialistInfo',
      params: { specialistId }
    })
  }
}

export default middleware
