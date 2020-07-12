<template>
  <div class="base-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class BaseLayout extends Vue {
}
</script>

<style lang="scss">
  .base-layout {
    min-width: 300px;
  }
</style>
