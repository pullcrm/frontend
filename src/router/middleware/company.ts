export default async function company ({ next, store }) {
  if (!store.state.auth.accessToken) {
    return
  }

  if (store.state.position.current) {
    return
  }

  if (store.getters['position/hasPositions'] === false) {
    return next({ name: 'companyCreate' })
  }

  await store.dispatch('position/fetch')
}
