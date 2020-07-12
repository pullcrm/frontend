export default async function auth ({ from, next, store }){
  if (!store.state.auth.accessToken) {
    await store.dispatch('auth/fetchToken')
  }

  if (!store.state.auth.accessToken) {
    next({ name: 'login', query: { from } })

    return true
  }
}
