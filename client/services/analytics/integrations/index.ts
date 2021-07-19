import { Route } from 'vue-router/types/router'

export type EventName = keyof Integration
export type EventPayload<K extends EventName> = Parameters<Integration[K]>[0]

/* eslint-disable @typescript-eslint/no-empty-function */
export abstract class Integration {
  pageView (
    _payload: { to: Route, from: Route | null }
  ) {}

  /* Web vitals */

  webVitals (
    _payload: { name: string, delta: number, id: string }
  ) {}

  /* Widget */

  widgetPickupPickerView (
    _payload: { type: 'slickjump' | 'full', productId: number, productIds?: number[] }
  ) {}

  widgetPickupPickerFirstClick (
    _payload: { type: 'slickjump' | 'full', productId: number, productIds?: number[] }
  ) {}

  widgetProductSelectorView (
    _payload: { type: 'slickjump' | 'full', productIds: number[] }
  ) {}

  widgetPick (
    _payload: { type: 'slickjump' | 'full', pharmacyId: number, pharmacyNetworkId?: number | null }
  ) {}

  widgetClose (
    _payload: any
  ) {}
}
