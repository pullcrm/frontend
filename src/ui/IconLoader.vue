<template>
  <UiIcon
    class="ui-icon-loader"
    name="loader"
    v-bind="$attrs"
  />
</template>

<script>
import UiIcon from './Icon.vue'

export default {
  components: {
    UiIcon
  },

  inheritAttrs: false
}
</script>

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
