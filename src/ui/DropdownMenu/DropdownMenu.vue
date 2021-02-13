<template>
  <UiPopover
    ref="popover"
    class="ui-dropdown-menu"
    v-bind="$attrs"
  >
    <template #default="{ open, close, isOpened, toggle }">
      <slot
        name="inner"
        v-bind="{ open, close, isOpened, toggle }"
      />
    </template>

    <template #body="{ close }">
      <div class="ui-dropdown-menu__popover">
        <slot v-bind="{ close }" />
      </div>
    </template>
  </UiPopover>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiPopover from '@/ui/Popover/Popover.vue'

// TODO: Remove
@Component({
  inheritAttrs: true
})
export default class DropdownMenu extends Vue {
  $refs: {
    popover: UiPopover
  }

  open () {
    this.$refs.popover.open()
  }

  close () {
    this.$refs.popover.close()
  }
}
</script>

<style lang="scss">
  .ui-dropdown-menu {
    .ui-dropdown-list {
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid $ui-black-40;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
</style>
