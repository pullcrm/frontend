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

    <PopperMenu
      ref="popperMenu"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DashboardLayout from '@/Layout/Dashboard/Dashboard.vue'
import WidgetLayout from '@/Layout/widget.vue'
import BaseLayout from '@/Layout/base.vue'

import Popups from '@/components/Popups/Popups.vue'
import Toasts from '@/components/Toasts/Toasts.vue'
import PopperMenu from '@/components/PopperMenu/PopperMenu.vue'

@Component({
  components: {
    Popups,
    Toasts,
    BaseLayout,
    PopperMenu,
    WidgetLayout,
    DashboardLayout
  },

  watch: {
    async hasCompany (value) {
      if (value) {
        const isSMSAuthorize = this.$store.getters['sms/isAuthorize']

        await Promise.all([
          this.$store.dispatch('procedures/fetch'),
          this.$store.dispatch('specialists/fetch'),
          isSMSAuthorize && this.$store.dispatch('sms/balance')
        ])
      }
    }
  },

  provide () {
    return {
      getPopperMenu: () => {
        return this.$refs.popperMenu
      }
    }
  }
})
export default class App extends Vue {
  $refs: {
    popperMenu: PopperMenu
  }

  get hasCompany () {
    return this.$store.getters['company/current']
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
  @import '@/scss/_fonts.scss';
  @import '@/scss/styles.scss';

  body {
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0);

    color: $ui-black-100;
    font-family: Inter, sans-serif !important;
  }

  #app {
    min-height: 80vh;
    color: $ui-black-100;
    font-weight: 400;
    font-family: Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
</style>
