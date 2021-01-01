<template>
  <div
    class="dashboard-layout"
    :class="[
      {'_has-sidebar': hasSidebar}
    ]"
  >
    <div class="dashboard-layout__nav">
      <Menu />
    </div>

    <div class="dashboard-layout__container">
      <Header />

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Menu from '@/components/Menu/Menu.vue'
import Header from '@/components/Header/Header.vue'

@Component({
  components: {
    Menu,
    Header
  }
})
export default class DashboardLayout extends Vue {
  get hasSidebar () {
    return Boolean(this.$route.meta.sidebar)
  }
}
</script>

<style lang="scss" src="./Dashboard.scss"></style>
