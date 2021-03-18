export default async function auth ({ next, store }) {
  if (store.state.profile) {
    return
  }

  if (!store.state.auth.accessToken) {
    await store.dispatch('auth/fetchToken')
  }

  if (store.state.auth.accessToken) {
    return await store.dispatch('profile')
  }

  next({ name: 'login' })
}
