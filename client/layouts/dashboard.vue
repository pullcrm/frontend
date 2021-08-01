<template>
  <div class="dashboard-layout">
    <Navbar
      class="dashboard-layout__navbar"
    />

    <div
      class="dashboard-layout__container"
      :class="{'_has-sidebar': hasSidebar}"
    >
      <UiContainer
        class="dashboard-layout__header"
      >
        <Header />

        <UiAlert
          v-if="hasSmsError"
          theme="error"
          left-icon="solid/warning-circle-fill"
        >
          Оповещения по СМС отключены! Попробуйте обновить настройки поставщика.
          <UiLink
            theme="action"
            @click.native="resetSms"
          >
            Сбросить настройки
          </UiLink>
        </UiAlert>
      </UiContainer>

      <Nuxt />
    </div>

    <PortalTarget
      class="dashboard-layout__sidebar"
      name="sidebar"
    />

    <Loader
      v-if="loading"
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

import Loader from '~/components/Loader.vue'
import Header from '~/components/Header/Header.vue'
import Navbar from '~/components/Navbar/Navbar.vue'
import Popups from '~/components/Popups/Popups.vue'
import Toasts from '~/components/Toasts/Toasts.vue'
import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

@Component({
  components: {
    Loader,
    Header,
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
          this.$typedStore.dispatch('timetable/fetch'),
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

  get hasSmsError () {
    return this.$typedStore.state.sms.hasSmsError
  }

  get hasSidebar () {
    return this.$typedStore.state.schedule.isQueueOpened
  }

  get hasPosition () {
    return Boolean(this.$typedStore.state.position.current)
  }

  get loading () {
    return this.$typedStore.state.loading
  }

  async resetSms () {
    await this.$api.sms.settingRemove()

    const { href } = this.$router.resolve({
      name: 'smsSettings'
    })

    window.location.href = href
  }
}
</script>

<style lang="scss">
  .dashboard-layout {
    display: flex;
    align-items: flex-start;
    min-height: 100vh;
    padding-top: 16px;
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

    &__header {
      margin-bottom: 16px;

      .ui-alert {
        margin-top: 16px;
      }
    }

    // @FIXME:
    @media (min-width: $ui-laptop) {
      padding-top: 24px;
      padding-bottom: 24px;

      &__container {
        &._has-sidebar {
          width: calc(100% - 296px);
        }
      }

      &__header {
        margin-bottom: 24px;
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
