<template>
  <UiPopover
    ref="popover"
    class="ui-dropdown-menu"
    :size="size"
    :placement="placement"
    @open="$emit('open', $event)"
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
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },

    size: {
      type: String,
      default: 'm'
    }
  }
})
export default class DropdownMenu extends Vue {
  $refs: {
    popover: UiPopover
  }

  close () {
    this.$refs.popover.close()
  }
}
</script>

<style lang="scss">
  .ui-dropdown-menu {
    .ui-badge {
      .ui-icon {
        width: 16px;
        height: 16px;
      }
    }

    .ui-dropdown-list {
      position: relative;
      margin-right: calc(var(--ui-popover-padding) * -1);
      margin-left: calc(var(--ui-popover-padding) * -1);
      padding: 0 var(--ui-popover-padding);

      &:not(:last-child) {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid $ui-black-40;
      }

      .ui-text {
        white-space: nowrap;

        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
