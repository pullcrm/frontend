import { initFacebook } from '../initializers/facebook'

import { Integration } from '.'

export default class FacebookIntegration extends Integration {
  pageView = () => {
    return this.track('PageView')
  }

  userRegistration = () => {
    return this.track('CompleteRegistration')
  }

  private async track (...args: any[]) {
    await initFacebook()

    window.fbq('track', ...args)
  }
}
