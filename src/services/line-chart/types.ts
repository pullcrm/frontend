export interface IValuesChartOptions {
  width: number
  height: number
}

export interface IValuesChartPoint {
  x: number
  y: number
  label: string
  value: number
  valueDifference: number
}

export interface IValuesChartCurve {
  path: string
  value1: number
  value2: number
}

export interface IValuesChartValue {
  value: number
  label: string
  info?: any
}

export interface IValuesChart {
  width: number
  height: number
  curves: IValuesChartCurve[]
  points: IValuesChartPoint[]
  minAvailableValue: number
  maxAvailableValue: number
}
