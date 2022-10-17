export default async function ({ currentRoute, redirect }: any) {
  try {
    const positionStore = usePositionStore()

    if (['companyCreate'].includes(currentRoute.name))
      return

    if (positionStore.current)
      return

    if (positionStore.hasPositions === false) {
      redirect({ name: 'companyCreate' })

      return
    }

    await positionStore.fetch()
  }
  catch {
    redirect({ name: 'login' })
  }
}
