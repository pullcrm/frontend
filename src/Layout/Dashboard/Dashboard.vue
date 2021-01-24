<template>
  <div class="dashboard-layout">
    <Navbar
      class="dashboard-layout__navbar"
    />

    <div class="dashboard-layout__container">
      <Header />

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
import Header from '@/components/Header/Header.vue'

@Component({
  components: {
    Navbar,
    Header
  }
})
export default class DashboardLayout extends Vue {}
</script>

<style lang="scss" src="./Dashboard.scss"></style>
