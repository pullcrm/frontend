export interface IPricesChartOptions {
  width: number,
  height: number,
  pointRadius: number
}

export interface IPricesChartPoint {
  x: number,
  y: number,
  label: string,
  price: number,
  priceDifference: number
}

export interface IPricesChartCurve {
  path: string,
  price1: number,
  price2: number
}

export interface IPricesChartPrice {
  price: number,
  label: string
}

export interface IPricesChart {
  width: number,
  height: number,
  pointRadius: number,
  curves: IPricesChartCurve[],
  points: IPricesChartPoint[],
  minAvailablePrice: number,
  maxAvailablePrice: number
}
