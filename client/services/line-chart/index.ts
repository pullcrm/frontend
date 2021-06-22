import { normalizeValues } from './normalize-values'

import {
  IValuesChartValue,
  IValuesChartPoint,
  IValuesChartCurve,
  IValuesChartOptions
} from './types'

export default class ValuesChart {
  values: IValuesChartValue[] = []
  options: IValuesChartOptions

  paddingX = 24
  paddingY = 0

  private _points:
    | IValuesChartPoint[]
    | null
    = null

  private _curves:
    | IValuesChartCurve[]
    | null
    = null

  private _splitCurves:
    | string[]
    | null
    = null

  private _valueLinesPoints:
    | IValuesChartPoint[]
    | null
    = null

  constructor (
    values: IValuesChartValue[],
    options: IValuesChartOptions
  ) {
    this.values = values
    this.options = options
  }

  get points () {
    const realWidth = this.options.width - (this.paddingX * 2)
    const realHeight = this.options.height - (this.paddingY * 2)

    this._points = this._points || normalizeValues(
      this.values,
      this.minAvailableLine,
      this.maxAvailableLine
    )
      .map(({ ratio, label, value, valueDifference, info }, index) => {
        const x = this.paddingX + (realWidth / (this.values.length - 1)) * index
        const y = this.paddingY + (realHeight - (realHeight * ratio))

        return {
          x,
          y,
          info,
          label,
          value,
          valueDifference
        }
      })

    return this._points
  }

  get splitCurves () {
    this._splitCurves = this._splitCurves || this.points
      .slice(0, -1)
      .map((_point, index) => {
        const { x: x1, y: y1 } = this.points[index]
        const { x: x2, y: y2 } = this.points[index + 1]

        return `L${x1} ${y1} ${x2} ${y2}`
      })

    const first = this.points[0]
    const last = this.points[this.points.length - 1]

    return [
      `M${first.x} ${this.options.height}`,
      ...this._splitCurves,
      `L${last.x} ${this.options.height}`
    ].join(' ')
  }

  get curves () {
    this._curves = this._curves || this.points
      .slice(0, -1)
      .map((_point, index) => {
        const { x: x1, y: y1, value: value1 } = this.points[index]
        const { x: x2, y: y2, value: value2 } = this.points[index + 1]

        return {
          path: `
            M ${x1} ${y1}
              ${x2} ${y2}
          `,
          value1,
          value2
        }
      })

    return this._curves
  }

  get valueLinesPoints () {
    const realWidth = this.options.width - (this.paddingX * 2)
    const realHeight = this.options.height - (this.paddingY * 2)

    this._valueLinesPoints = this._valueLinesPoints || normalizeValues(
      this.lines,
      this.minAvailableLine,
      this.maxAvailableLine
    )
      .map(({ ratio, label, value, valueDifference }, index) => {
        const x = this.paddingX + (realWidth / (this.lines.length - 1)) * index
        const y = this.paddingY + (realHeight - (realHeight * ratio))

        return {
          x,
          y,
          label,
          value,
          valueDifference
        }
      })

    return this._valueLinesPoints
  }

  get width () {
    return this.options.width
  }

  get height () {
    return this.options.height
  }

  // TODO: Refactor this
  get lines () {
    const lines = []

    for (let index = 0; index < this.valueLinesCount; index++) {
      const value = this.minAvailableLine + this.valueLinesStep * index

      lines.push({ value, label: `${value}` })
    }

    return lines
  }

  get valueLinesStep () {
    return Math.round((this.maxAvailableLine - this.minAvailableLine) / this.valueLinesCount)
  }

  get valueLinesCount () {
    const subtracting = this.maxAvailableLine - this.minAvailableLine

    if (subtracting <= 10) {
      return 3
    }

    if (subtracting <= 20) {
      return 4
    }

    return 10
  }

  get minAvailableLine () {
    const multiplier = Math.pow(10, `${this.minAvailableValue}`.length - 1)

    return Math.floor(this.minAvailableValue / multiplier) * multiplier
  }

  get maxAvailableLine () {
    const multiplier = Math.pow(10, `${this.maxAvailableValue}`.length - 1)

    return Math.ceil(this.maxAvailableValue / multiplier) * multiplier
  }

  get minAvailableValue () {
    return Math.min(...this.availableValues)
  }

  get maxAvailableValue () {
    return Math.max(...this.availableValues)
  }

  get availableValues () {
    // TODO: remove Number()
    return this.values.map(({ value }) => Number(value))
  }
}
