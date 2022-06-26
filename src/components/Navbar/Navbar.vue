<script lang="ts" setup>
import NavbarMobile from './Navbar.mobile.vue'
import NavbarDesktop from './Navbar.desktop.vue'
</script>

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

<style lang="scss">
  .navbar {
    @media (max-width: ($ui-laptop - 1px)) {
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
