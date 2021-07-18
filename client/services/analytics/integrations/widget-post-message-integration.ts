import { Integration, EventPayload } from '.'

export default class WidgetPostMessageIntegration extends Integration {
  widget: string

  constructor ({ widget }) {
    super()

    this.widget = widget
  }

  widgetView = () => {
    // TODO: Refactor later when widget analytics will be better understood
    if (this.widget === 'yandex') return

    return this.postMessage('pullcrm:widgetView')
  }

  widgetFirstClick = () => {
    // TODO: Refactor later when widget analytics will be better understood
    if (this.widget === 'yandex') return

    return this.postMessage('pullcrm:widgetFirstClick')
  }

  widgetPick = ({ pharmacyId, pharmacyNetworkId }: EventPayload<'widgetPick'>) => {
    // TODO: Refactor later when widget analytics will be better understood
    if (this.widget === 'yandex') return

    return this.postMessage('pullcrm:widgetPick', {
      pharmacyId,
      pharmacyNetworkId
    })
  }

  widgetClose = () => {
    return this.postMessage('pullcrm:widgetClose')
  }

  private postMessage (event: string, payload: object = {}) {
    parent.postMessage(`${event}|${JSON.stringify(payload)}`, '*')
  }
}
