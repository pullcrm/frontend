import Vue from 'vue'

import App from './App.vue'
import store from "./store/index";
import router from "./router/router";

// https://phoenixwong.github.io/vue2-timepicker/
// https://github.com/mengxiong10/vue2-datepicker

import ApiClient from './plugins/api'

// https://github.com/Akryum/v-tooltip
import { VTooltip, VPopover } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)
Vue.component('tooltip', VPopover)

// https://github.com/euvl/vue-js-modal
import VModal from 'vue-js-modal'
Vue.use(VModal, { componentName: "Popup" })

// https://vue-select.org/guide/install.html
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)


Vue.use(ApiClient)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
