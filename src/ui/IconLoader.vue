<script lang="ts" setup>
</script>

<template>
  <UiIcon
    class="ui-icon-loader"
    name="solid/loader-fill"
    v-bind="$attrs"
  />
</template>

<style lang="scss">
  @keyframes ui-icon-loader-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .ui-icon-loader {
    animation: ui-icon-loader-spin 0.75s infinite linear;
  }
</style>
