export default async function company ({ from, next, store }) {
  if (!store.state.auth.accessToken) {
    return
  }

  if (store.getters['company/current']) {
    return
  }

  const companies = await store.dispatch('companies/fetch')

  if (companies.length === 0) {
    return next({ name: 'companyCreate', query: { from } })
  }

  await store.dispatch('companies/selectCompany')
}
