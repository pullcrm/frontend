<template>
  <div class="ui-toast-text">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({

})
export default class UiToastText extends Vue {

}
</script>

<style lang="scss">
  .ui-toast-text {
    @include ui-typo-16;

    // @include ui-mobile-only {
    //   @include ui-typo-14;
    // }
  }
</style>
