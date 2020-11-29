<template>
  <div class="ui-toast-title">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({

})
export default class UiToastTitle extends Vue {

}
</script>

<style lang="scss">
  .ui-toast-title {
    @include ui-typo-18;

    font-weight: bold;

    @include ui-mobile-only {
      @include ui-typo-16;
    }
  }
</style>
