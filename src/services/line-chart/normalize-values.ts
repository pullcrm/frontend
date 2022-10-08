import type { IValuesChartValue } from './types'

/**
 * Calculate value ratio
 */
function calculateValueRatio(
  value: number,
  minValue: number,
  maxValue: number,
) {
  return (value - minValue) / (maxValue - minValue)
}

/**
 * Normalize values
 */
export function normalizeValues(
  values: IValuesChartValue[],
  minValue: number,
  maxValue: number,
) {
  if (minValue === maxValue) {
    return values.map(({ value, label, info }) => {
      return {
        info,
        label,
        ratio: 1 / 2,
        value,
        valueDifference: 0,
      }
    })
  }

  /*
    Keep the first available value that is greater 0
               ↓
     0    0   99   999
    |----|----|----|
  */
  // const firstAvailableValue = values.find(({ value }) => value > 0).value

  /*
    Keep the last seen value that is greater 0
          ↓
    88   99    0    0
    |----|----|----|
  */
  let lastSeenAvailableValue: number

  return values.map(({ value, label, info }) => {
    const result = {
      info,
      label,
      value,
      ratio: calculateValueRatio(
        value,
        minValue,
        maxValue,
      ),
      valueDifference: value - (lastSeenAvailableValue ?? value),
    }

    lastSeenAvailableValue = value

    return result
  })
}
