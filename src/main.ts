import Vue from 'vue'

import router from '@/router/router'
import store from '@/store'

import App from './App.vue'

import './plugins/uikit'
import './plugins/filters'
import './plugins/click-outside.client'

import ApiClient from './plugins/api'
import TimeClient from './plugins/time'
import DataStorage from './plugins/data-storage'

Vue.use(ApiClient)
Vue.use(TimeClient)
Vue.use(DataStorage)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
