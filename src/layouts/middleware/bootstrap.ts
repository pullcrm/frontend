export default async function (_ctx: any) {
  const smsStore = useSmsStore()
  const positionStore = usePositionStore()
  const timetableStore = useTimetableStore()
  const proceduresStore = useProceduresStore()
  const specialistsStore = useSpecialistsStore()

  if (!positionStore.current)
    return

  const isSMSAuthorize = smsStore.isAuthorize

  await Promise.all([
    timetableStore.fetch(),
    proceduresStore.fetch(),
    specialistsStore.fetch(),
    isSMSAuthorize && smsStore.fetchBalance(),
  ])
}
