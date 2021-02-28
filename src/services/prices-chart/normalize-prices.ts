import { IPricesChartPrice } from './types'

/**
 * Calculate price ratio
 */
function calculatePriceRatio (
  price: number,
  minPrice: number,
  maxPrice: number
) {
  return (price - minPrice) / (maxPrice - minPrice)
}

/**
 * Normalize prices
 */
export function normalizePrices (
  prices: IPricesChartPrice[],
  minPrice: number,
  maxPrice: number
) {
  if (minPrice === maxPrice) {
    return prices.map(({ price, label }) => {
      return {
        label,
        ratio: 1 / 2,
        price,
        priceDifference: 0
      }
    })
  }

  /*
    Keep the first available price that is greater 0
               ↓
     0    0   99   999
    |----|----|----|
  */
  // const firstAvailablePrice = prices.find(({ price }) => price > 0).price

  /*
    Keep the last seen price that is greater 0
          ↓
    88   99    0    0
    |----|----|----|
  */
  let lastSeenAvailablePrice: number

  return prices.map(({ price, label }) => {
    // if (price === 0 && lastSeenAvailablePrice) {
    //   // Use the last seen price that is greater 0
    //   return {
    //     label,
    //     price,
    //     ratio: calculatePriceRatio(
    //       lastSeenAvailablePrice,
    //       minPrice,
    //       maxPrice
    //     ),
    //     priceDifference: 0
    //   }
    // }

    // if (price === 0) {
    //   // Use the first price that is greater 0
    //   return {
    //     label,
    //     price,
    //     ratio: calculatePriceRatio(
    //       firstAvailablePrice,
    //       minPrice,
    //       maxPrice
    //     ),
    //     priceDifference: 0
    //   }
    // }

    const result = {
      label,
      price,
      ratio: calculatePriceRatio(
        price,
        minPrice,
        maxPrice
      ),
      priceDifference: price - (lastSeenAvailablePrice ?? price)
    }

    lastSeenAvailablePrice = price

    return result
  })
}
