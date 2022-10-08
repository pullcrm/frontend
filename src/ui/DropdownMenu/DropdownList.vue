<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div
    class="ui-dropdown-list"
  >
    <UiText
      v-if="name"
      class="ui-dropdown-list__name"
      size="s"
    >
      {{ name }}
    </UiText>

    <div class="ui-dropdown-list__inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  .ui-dropdown-list {
    width: max-content;
    max-width: 207px;
    margin-right: calc(var(--ui-popover-padding) * -1);
    margin-left: calc(var(--ui-popover-padding) * -1);
    padding: 0 var(--ui-popover-padding);

    &__name {
      margin-bottom: 8px;
      color: $ui-black-80;
    }

    &__inner {
      & > .ui-text {
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
