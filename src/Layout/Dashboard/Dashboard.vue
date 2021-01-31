<template>
  <div class="dashboard-layout">
    <Navbar
      class="dashboard-layout__navbar"
    />

    <div
      class="dashboard-layout__container"
      :class="{'_has-sidebar': hasSidebar}"
    >
      <slot />
    </div>

    <PortalTarget
      class="dashboard-layout__sidebar"
      name="sidebar"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Navbar from '@/components/Navbar/Navbar.vue'

@Component({
  components: {
    Navbar
  }
})
export default class DashboardLayout extends Vue {
  get hasSidebar () {
    return this.$store.state.schedule.isQueueOpened
  }
}
</script>

<style lang="scss" src="./Dashboard.scss"></style>
