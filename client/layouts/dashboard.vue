<template>
  <div class="dashboard-layout">
    <Navbar
      class="dashboard-layout__navbar"
    />

    <div
      class="dashboard-layout__container"
      :class="{'_has-sidebar': hasSidebar}"
    >
      <Nuxt />
    </div>

    <PortalTarget
      class="dashboard-layout__sidebar"
      name="sidebar"
    />

    <Popups />
    <Toasts />
    <PopperMenu
      ref="popperMenu"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Navbar from '~/components/Navbar/Navbar.vue'

import Popups from '~/components/Popups/Popups.vue'
import Toasts from '~/components/Toasts/Toasts.vue'
import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

@Component({
  components: {
    Navbar,
    Popups,
    Toasts,
    PopperMenu
  },

  watch: {
    async hasPosition (value) {
      if (value) {
        const isSMSAuthorize = this.$typedStore.getters['sms/isAuthorize']

        await Promise.all([
          this.$typedStore.dispatch('procedures/fetch'),
          this.$typedStore.dispatch('specialists/fetch'),
          isSMSAuthorize && this.$typedStore.dispatch('sms/balance')
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
export default class DashboardLayout extends Vue {
  $refs: {
    popperMenu: PopperMenu
  }

  get hasSidebar () {
    return this.$typedStore.state.schedule.isQueueOpened
  }

  get hasPosition () {
    return Boolean(this.$typedStore.state.position.current)
  }
}
</script>

<style lang="scss">
  .dashboard-layout {
    display: flex;
    align-items: flex-start;
    min-height: 100vh;
    padding: 24px 0;
    padding-left: $ui-navbar-desktop-width;
    background: $ui-black-10;

    &__navbar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 13;
    }

    &__container {
      width: 100%;
    }

    // @FIXME:
    @media (min-width: $ui-laptop) {
      &__container {
        &._has-sidebar {
          width: calc(100% - 296px);
        }
      }
    }

    @media (max-width: $ui-laptop - 1px) {
      padding-bottom: #{$ui-navbar-desktop-width + 16px};
      padding-bottom: calc(#{$ui-navbar-desktop-width + 16px} + var(--safe-area-inset-bottom));
      padding-left: 0;

      &__navbar {
        top: initial;
        right: 0;
      }
    }
  }
</style>
