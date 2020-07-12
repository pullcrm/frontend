<template>
  <div class="dashboard-layout">
    <div
      class="dashboard-layout__inner"
      :class="[
        {'_has-sidebar': hasSidebar}
      ]"
    >
      <div class="dashboard-layout__nav">
        <Menu />
      </div>

      <div class="dashboard-layout__container">
        <LayoutHeader />

        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Menu from '@/components/Menu/Menu.vue'

import LayoutHeader from './components/Header.vue'

@Component({
  components: {
    Menu,
    LayoutHeader
  }
})
export default class DashboardLayout extends Vue {
  get hasSidebar () {
    return Boolean(this.$route.meta.sidebar)
  }
}
</script>

<style lang="scss">
  .dashboard-layout {
    min-height: 100vh;
    background: $body-color;

    &__inner {
      padding-left: 64px;

      &._has-sidebar {
        padding-left: calc(#{$SCHEDULE_APPOINTMENT_WIDTH} + #{64px + 26px});
      }
    }

    &__nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
      display: flex;
      background: #fff;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
    }
  }
</style>
