<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    class="ui-title"
    :class="[
      `ui-title_size_${size}`,
      { 'ui-title_responsive': responsive }
    ]"
    v-bind="$attrs"
  >
    <slot />
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: false,

  props: {
    size: {
      type: String,
      default: 'm'
    },

    tag: {
      type: String,
      default: 'div'
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Title extends Vue {
  readonly tag: string
  readonly size: 's' | 'm' | 'l' | 'xl'
  readonly responsive: boolean
}
</script>

<style lang="scss">
  .ui-title {
    font-weight: 500;

    &_size_s {
      @include ui-typo-18;
    }

    &_size_m {
      @include ui-typo-24;
    }

    &_size_l {
      @include ui-typo-28;
    }

    &_size_xl {
      @include ui-typo-32;
    }

    @media (max-width: $ui-laptop - 1px) {
      &_responsive {
        &.ui-title {
          &_size_m {
            @include ui-typo-20;
          }

          &_size_l {
            @include ui-typo-24;
          }

          &_size_xl {
            @include ui-typo-28;
          }
        }
      }
    }
  }
</style>
