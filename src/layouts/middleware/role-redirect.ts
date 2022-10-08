import { SPECIALIST } from '~/constants/roles'

export default async function ({ currentRoute, redirect }: any) {
  const positionStore = usePositionStore()

  if (['companyCreate'].includes(currentRoute.name))
    return

  const role = positionStore.role
  const specialistId = positionStore.currentId

  if (role.name === SPECIALIST) {
    if (
      /\/specialist\//.test(currentRoute.path)
      && Number(currentRoute.params.slug) === specialistId
    ) return

    redirect({
      name: 'specialistInfo',
      params: { slug: specialistId },
    })
  }
}
