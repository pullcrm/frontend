<template>
  <div
    :class="{
      'ui-container_narrow': narrow,
      'ui-container_wide': !narrow
    }"
    class="ui-container"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    narrow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .ui-container {
    &_wide {
      @include ui-container;
    }

    &_narrow {
      @include ui-container-narrow;
    }

    .ui-panel {
      &:not(:last-child) {
        margin-bottom: 32px;
      }
    }

    @include ui-mobile-only {
      .ui-panel {
        &:not(:last-child) {
          margin-bottom: 16px;
        }
      }
    }
  }
</style>
