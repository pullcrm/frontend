export default async function company ({ from, next, store }){
  if (!store.getters['company/current']) {
    await store.dispatch('approaches/fetch')
  }

  if (!store.getters['company/current']) {
    return next({ name: 'companyCreate', query: { from } })
  }

  await Promise.all([
    store.dispatch('employee/fetch'),
    store.dispatch('procedures/fetch')
  ])
}
