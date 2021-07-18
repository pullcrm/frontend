import { initGoogleAnalytics } from '../initializers/google-analytics'

import { Integration, EventPayload } from '.'

type IConstructorParams = Pick<GoogleAnalyticsIntegration,
  | 'id'
  | 'host'
>

export default class GoogleAnalyticsIntegration extends Integration {
  id: string
  host: string

  constructor (params: IConstructorParams) {
    super()

    this.id = params.id
    this.host = params.host
  }

  pageView = async ({ to }: EventPayload<'pageView'>) => {
    await this.set('page', to.fullPath)

    return this.send('pageview')
  }

  /**
   * Web vitals
   */
  // webVitals = ({ name, delta, id }) => {
  //   this.send('event', {
  //     eventCategory: 'Web Vitals',
  //     eventAction: name,
  //     eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
  //     eventLabel: id,
  //     nonInteraction: true
  //   })
  // }

  /**
   * Widget
   */
  // widgetPickupPickerView = async ({ type, productId }: EventPayload<'widgetPickupPickerView'>) => {
  //   await this.send('event', `widget-${type}`, 'product-view', productId)
  // }

  // widgetPickupPickerFirstClick = async ({ type, productId }: EventPayload<'widgetPickupPickerFirstClick'>) => {
  //   await this.send('event', `widget-${type}`, 'product-first-click', productId)
  // }

  // widgetProductSelectorView = async ({ type }: EventPayload<'widgetProductSelectorView'>) => {
  //   // `document.referrer` doesn't change while the user navigates through the widget;
  //   // therefore, it can be considered to be the url of the partner site that the widget integrated into
  //   const referrerHost = document.referrer.match(/\/\/([^/]+)/)?.[1]

  //   await this.send('event', `widget-${type}`, 'product-selector-view', referrerHost)
  // }

  private async send (...args: any[]) {
    await initGoogleAnalytics({
      id: this.id
    })

    window.ga('pullcrm.send', ...args)
  }

  private async set (...args: any[]) {
    await initGoogleAnalytics({
      id: this.id
    })

    window.ga('pullcrm.set', ...args)
  }
}
