/**
 * Format money
 *
 *  formatMoney(2.00) => '2'
 *
 *  formatMoney(2.333) => '2,33'
 */

function formatMoney(value: any) {
  const formattedValue = Number.parseFloat(value || 0)
    .toFixed(2)
    .replace('.00', '')
    .replace('.', ',')

  return `${formattedValue} грн`
}

export {
  formatMoney,
}
