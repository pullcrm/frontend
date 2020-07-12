// import { SDK } from '@directus/sdk-js/dist/esm/index.js'
import DirectusSDK from '@directus/sdk-js'

const client = new DirectusSDK({
  url: 'http://api.pullcrm.com/public/',
  project: 'pullcrm',
  mode: 'cookie'
})

export default client
