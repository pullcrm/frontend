<template>
  <div class="landing-container">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Container extends Vue {}
</script>

<style lang="scss">
.landing-container {
  @include ui-container;

  // @TODO: Refactor
  max-width: 956px !important;
}
</style>
