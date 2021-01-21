<template>
  <div class="menu">
    <img
      class="menu__logo"
      src="@/assets/logos/logo.svg"
    >

    <MenuItem
      :to="{ name: 'dashboard' }"
      icon="solid/house-fill"
    />

    <MenuItem
      :to="{ name: 'schedule' }"
      icon="solid/calendar-fill"
    />

    <!-- <MenuItem
      :to="{ name: 'timeOff' }"
      icon="clock"
    /> -->

    <MenuItem
      :to="{ name: 'specialists' }"
      icon="solid/users-fill"
    />

    <MenuItem
      :to="{ name: 'procedures' }"
      icon="solid/list"
    />

    <div class="menu__space" />

    <MenuItem
      :to="{ name: 'settings' }"
      icon="solid/gear-fill"
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
