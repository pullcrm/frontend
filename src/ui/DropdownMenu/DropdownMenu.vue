<script lang="ts" setup>
import UiPopover from 'ui/Popover/Popover.vue'

// inheritAttrs: true,
// TODO: Remove

const popover = ref<typeof UiPopover | null>(null)

// function open() {
//   popover.value?.open()
// }

// function close() {
//   popover.value?.close()
// }
</script>

<template>
  <UiPopover
    ref="popover"
    class="ui-dropdown-menu"
    v-bind="$attrs"
  >
    <slot name="inner" />

    <template #body="{ close }">
      <div class="ui-dropdown-menu__popover">
        <slot v-bind="{ close }" />
      </div>
    </template>
  </UiPopover>
</template>

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
