import { normalizePrices } from './normalize-prices'
import { calculateControlPoints } from './calculate-control-points'

import {
  IPricesChartPrice,
  IPricesChartPoint,
  IPricesChartCurve,
  IPricesChartOptions
} from './types'

export default class PricesChart {
  prices: IPricesChartPrice[] = []
  options: IPricesChartOptions

  private _points:
    | IPricesChartPoint[]
    | null
    = null

  private _curves:
    | IPricesChartCurve[]
    | null
    = null

  constructor (
    prices: IPricesChartPrice[],
    options: IPricesChartOptions
  ) {
    this.prices = prices
    this.options = options
  }

  get points () {
    const padding = this.options.pointRadius + 5
    const realWidth = this.options.width - (padding * 2)
    const realHeight = this.options.height - (padding * 2)

    this._points = this._points || normalizePrices(
      this.prices,
      this.minAvailablePrice,
      this.maxAvailablePrice
    )
      .map(({ ratio, label, price, priceDifference }, index) => {
        const x = padding + (realWidth / (this.prices.length - 1)) * index
        const y = padding + (realHeight - (realHeight * ratio))

        return {
          x,
          y,
          label,
          price,
          priceDifference
        }
      })

    return this._points
  }

  get curves () {
    this._curves = this._curves || this.points
      .slice(0, -1)
      .map((_point, index) => {
        return {
          point0: this.points[index - 1],
          point1: this.points[index],
          point2: this.points[index + 1],
          point3: this.points[index + 2]
        }
      })
      .map(({ point0, point1, point2, point3 }) => {
        // Calculate the 1st control point of Bezier curve
        // based on the previous point (point0)
        const { point2: controlPoint1 } = calculateControlPoints(
          point0 ?? point1,
          point1,
          point2,
          { tense: 0.15 }
        )

        // Calculate the 2nd control point of Bezier curve
        // based on the next point (point3)
        const { point1: controlPoint2 } = calculateControlPoints(
          point1,
          point2,
          point3 ?? point2,
          { tense: 0.15 }
        )

        const { x: x1, y: y1, price: price1 } = point1
        const { x: x2, y: y2, price: price2 } = point2
        const { x: cx1, y: cy1 } = controlPoint1
        const { x: cx2, y: cy2 } = controlPoint2

        return {
          path: `
            M ${x1} ${y1}
            C ${cx1} ${cy1}
              ${cx2} ${cy2}
              ${x2} ${y2}
          `,
          controlPoint1,
          controlPoint2,
          price1,
          price2
        }
      })

    return this._curves
  }

  get width () {
    return this.options.width
  }

  get height () {
    return this.options.height
  }

  get minAvailablePrice () {
    return Math.min(...this.availablePrices)
  }

  get maxAvailablePrice () {
    return Math.max(...this.availablePrices)
  }

  get availablePrices () {
    return this.prices
      // .filter(({ price }) => price > 0)
      .map(({ price }) => price)
  }
}
