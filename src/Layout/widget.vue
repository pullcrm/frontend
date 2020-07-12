<template>
  <div class="widget-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class WidgetLayout extends Vue {
}
</script>

<style lang="scss">
  .widget-layout {
    min-width: 300px;
  }
</style>
