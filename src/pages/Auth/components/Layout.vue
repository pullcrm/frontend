<template>
  <div class="auth-page-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class AuthLayout extends Vue {
}
</script>

<style lang="scss">
  .auth-page-layout {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding: 15vh 16px;
    background-color: $ui-black-10;

    @include ui-mobile-only {
      background: $ui-white;
    }
  }
</style>
