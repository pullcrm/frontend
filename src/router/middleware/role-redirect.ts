import { SPECIALIST } from '@/constants/roles'

export default async function roleRedirect ({ to, next, store }) {
  const role = store.state.company.role

  if (role.name === SPECIALIST) {
    if (/\/specialist\//.test(to.path)) return

    const { specialistId } = store.state.company.profile

    next({
      name: 'specialistAbout',
      params: { specialistId }
    })
  }
}
