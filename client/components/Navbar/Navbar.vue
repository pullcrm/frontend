<template>
  <div class="navbar">
    <NavbarDesktop
      class="navbar__desktop"
    />

    <NavbarMobile
      class="navbar__mobile"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NavbarMobile from './Navbar.mobile.vue'
import NavbarDesktop from './Navbar.desktop.vue'

@Component({
  components: {
    NavbarMobile,
    NavbarDesktop
  }
})
export default class Navbar extends Vue {}
</script>

<style lang="scss">
  .navbar {
    @media (max-width: $ui-laptop - 1px) {
      &__desktop {
        display: none;
      }
    }

    @media (min-width: $ui-laptop) {
      &__mobile {
        display: none;
      }
    }
  }
</style>
