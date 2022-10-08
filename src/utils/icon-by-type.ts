// TODO: Move to logics
export function getIconByType(type: string) {
  if (type === 'error')
    return 'solid/x-circle-fill'

  if (type === 'warning')
    return 'solid/warning-fill'

  if (type === 'info')
    return 'solid/info-fill'

  return 'solid/check-circle-fill'
}
