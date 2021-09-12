<template>
  <div
    :class="[
      'ui-container',
      `ui-container_${type}`
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    narrow: {
      type: Boolean,
      default: false
    },

    large: {
      type: Boolean,
      default: false
    }
  }
})
export default class Container extends Vue {
  get type () {
    if (this.narrow) {
      return 'narrow'
    }

    return 'wide'
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
  }
</style>
