import { SPECIALIST } from '@/constants/roles'

export default async function roleRedirect ({ to, next, store }) {
  const role = store.state.company.role
  const { specialistId } = store.state.company.profile

  if (role.name === SPECIALIST) {
    if (
      /\/specialist\//.test(to.path) &&
      Number(to.params.specialistId) === specialistId
    ) return

    next({
      name: 'specialistInfo',
      params: { specialistId }
    })
  }
}
