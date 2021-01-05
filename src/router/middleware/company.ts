export default async function company ({ from, next, store }) {
  if (!store.getters['company/current']) {
    await store.dispatch('companies/fetch')
  }

  if (!store.getters['company/current']) {
    return next({ name: 'companyCreate', query: { from } })
  }
}
