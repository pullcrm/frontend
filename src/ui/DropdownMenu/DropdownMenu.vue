<template>
  <UiPopover
    ref="popover"
    class="ui-dropdown-menu"
    size="xs"
    :placement="placement"
    @open="$emit('open', $event)"
  >
    <template #default="{ open, close, isOpened }">
      <slot
        name="inner"
        v-bind="{ open, close, isOpened }"
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

@Component({
  props: {
    placement: {
      type: String,
      default: 'bottom-left'
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

    .ui-dropdown-group {
      margin-right: calc(var(--ui-popover-padding) * -1);
      margin-left: calc(var(--ui-popover-padding) * -1);
      padding: 0 var(--ui-popover-padding);

      &:not(:last-child) {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid $ui-black-40;
      }

      .ui-text {
        white-space: nowrap;

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
