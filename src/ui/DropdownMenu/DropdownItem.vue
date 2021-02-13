<template>
  <UiText
    class="ui-dropdown-item"
    v-bind="$attrs"
  >
    <slot />
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: true
})
export default class UiDropdownItem extends Vue {}
</script>

<style lang="scss">
  .ui-dropdown-item {
    cursor: pointer;
  }
</style>
