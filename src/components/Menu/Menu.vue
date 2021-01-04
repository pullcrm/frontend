<template>
  <div class="menu">
    <div
      class="menu__logo"
    >
      <img src="@/assets/logos/logo-2.svg">
    </div>

    <MenuItem
      :to="{ name: 'dashboard' }"
      icon="home"
    />

    <MenuItem
      :to="{ name: 'schedule' }"
      icon="calendar"
    />

    <!-- <MenuItem
      :to="{ name: 'timeOff' }"
      icon="clock"
    /> -->

    <MenuItem
      :to="{ name: 'specialists' }"
      icon="person/persones"
    />

    <MenuItem
      :to="{ name: 'procedures' }"
      icon="list"
    />

    <div class="menu__space" />

    <MenuItem
      :to="{ name: 'settings' }"
      icon="settings/setting-1"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import MenuItem from './MenuItem.vue'

@Component({
  components: {
    MenuItem
  }
})
export default class Menu extends Vue {}
</script>

<style lang="scss" src="./Menu.scss"></style>
