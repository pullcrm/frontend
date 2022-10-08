export function formatPhone(phone?: string) {
  if (!phone)
    return ''

  return String(phone).replace(
    /(\d{3})(\d{3})(\d{2})(\d{2})/,
    '38 ($1) $2-$3-$4',
  )
}

export function getPhoneNumber(phone: string) {
  return String(phone || '').replace(/(\D)/g, '').replace(/^38/, '')
}
