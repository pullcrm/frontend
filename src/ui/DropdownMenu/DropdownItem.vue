<template>
  <UiText
    class="ui-dropdown-item"
    :size="size"
    :left-icon="leftIcon"
  >
    <slot />
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    size: {
      type: String,
      default: 'm'
    },

    leftIcon: {
      type: String,
      default: null
    }
  }
})
export default class UiDropdownItem extends Vue {

}
</script>

<style lang="scss">
  .ui-dropdown-item {
    cursor: pointer;
  }
</style>
