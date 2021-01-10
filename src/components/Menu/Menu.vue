<template>
  <div class="menu">
    <div
      class="menu__logo"
    >
      <img src="@/assets/logos/logo.png">
    </div>

    <MenuItem
      :to="{ name: 'dashboard' }"
      icon="house-fill"
    />

    <MenuItem
      :to="{ name: 'schedule' }"
      icon="calendar-fill"
    />

    <!-- <MenuItem
      :to="{ name: 'timeOff' }"
      icon="clock-fill"
    /> -->

    <MenuItem
      :to="{ name: 'specialists' }"
      icon="users-fill"
    />

    <MenuItem
      :to="{ name: 'procedures' }"
      icon="list-bullets-fill"
    />

    <div class="menu__space" />

    <MenuItem
      :to="{ name: 'settings' }"
      icon="gear-fill"
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
