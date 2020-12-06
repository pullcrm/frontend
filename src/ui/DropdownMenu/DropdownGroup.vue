<template>
  <div
    class="ui-dropdown-group"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class DropdownGroup extends Vue {

}
</script>

<style lang="scss">
  .ui-dropdown-group {
    max-width: 200px;
    padding: 12px 0;

    .ui-dropdown-list {
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid $ui-black-40;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
</style>
