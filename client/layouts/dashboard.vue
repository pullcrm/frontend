<template>
  <ClientOnly>
    <div class="dashboard-layout">
      <Navbar
        class="dashboard-layout__navbar"
      />

      <div class="dashboard-layout__container">
        <SmsAlert
          class="dashboard-layout__sms-alert"
        />

        <Header
          class="dashboard-layout__header"
        />

        <Nuxt />

        <div class="dashboard-layout__footer" />
      </div>

      <PortalTarget name="sidebar" />

      <Loader
        v-if="loading"
      />

      <Popups />
      <Toasts />
      <PopperMenu
        ref="popperMenu"
      />
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Loader from '~/components/Loader.vue'
import Header from '~/components/Header/Header.vue'
import Navbar from '~/components/Navbar/Navbar.vue'
import Popups from '~/components/Popups/Popups.vue'
import Toasts from '~/components/Toasts/Toasts.vue'
import SmsAlert from '~/components/SmsAlert/SmsAlert.vue'
import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

@Component({
  components: {
    Loader,
    Header,
    Navbar,
    Popups,
    Toasts,
    SmsAlert,
    PopperMenu
  },

  watch: {
    hasPosition: {
      async handler (value) {
        if (value) {
          const isSMSAuthorize = this.$typedStore.getters['sms/isAuthorize']

          await Promise.all([
            this.$typedStore.dispatch('timetable/fetch'),
            this.$typedStore.dispatch('procedures/fetch'),
            this.$typedStore.dispatch('specialists/fetch'),
            isSMSAuthorize && this.$typedStore.dispatch('sms/balance')
          ])
        }
      },
      immediate: true
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
export default class DashboardLayout extends Vue {
  $refs: {
    popperMenu: PopperMenu
  }

  get hasPosition () {
    return Boolean(this.$typedStore.state.position.current)
  }

  get loading () {
    return this.$typedStore.state.loading
  }
}
</script>

<style lang="scss" src="./dashboard.scss"></style>
