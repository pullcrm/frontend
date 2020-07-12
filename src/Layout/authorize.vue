<template>
  <div class="empty-layout">
    <div class="empty-layout__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class EmptyLayout extends Vue {
}
</script>

<style lang="scss">
  .empty-layout {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding-top: 15vh;
    padding-bottom: 15vh;
    background-color: $ui-black-10;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 55vh;
      min-height: 600px;
      background-image: url('~@/assets/svg/auth-background.svg');
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: 100% auto;
      content: '';
    }

    &__content {
      position: relative;
      z-index: 2;
    }
  }
</style>
