<template>
  <div
    id="app"
    class="app-layout"
  >
    <Component
      :is="`${layout}Layout`"
    >
      <RouterView />
    </Component>

    <Popups />

    <Toasts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DashboardLayout from '@/Layout/Dashboard/Dashboard.vue'
import WidgetLayout from '@/Layout/widget.vue'
import BaseLayout from '@/Layout/base.vue'

import Popups from '@/components/Popups/Popups.vue'
import Toasts from '@/components/Toasts/Toasts.vue'

@Component({
  components: {
    Popups,
    Toasts,
    BaseLayout,
    WidgetLayout,
    DashboardLayout
  },

  watch: {
    async hasCompany (value) {
      if (value) {
        const hasSmsAuthorize = this.$store.getters['sms/hasSmsAuthorize']

        await Promise.all([
          this.$store.dispatch('procedures/fetch'),
          this.$store.dispatch('specialists/fetch'),
          hasSmsAuthorize && this.$store.dispatch('sms/balance')
        ])
      }
    }
  }
})
export default class App extends Vue {
  get hasCompany () {
    return this.$store.getters['company/current']
  }

  get hasProfile () {
    return Boolean(this.$store.state.profile.profile)
  }

  get layout () {
    if (this.$route.meta?.layout) {
      return this.$route.meta?.layout
    }

    return 'Base'
  }
}
</script>

<style lang="scss">
  @import '@/scss/_reset.scss';
  @import '@/scss/_grid.scss';
  @import '@/scss/styles.scss';

  body {
    color: $ui-black-100;
    font-family: Roboto, sans-serif !important;
  }

  #app {
    min-height: 80vh;
    color: $ui-black-100;
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
