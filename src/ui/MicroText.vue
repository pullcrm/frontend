<template>
  <Component
    :is="tag"
    :class="[`ui-micro-text ui-micro-text_size_${size}`, { 'ui-micro-text_responsive': responsive }]"
    v-bind="$attrs"
  >
    <span
      v-if="$slots.prepend"
      class="ui-micro-text__prepend"
    >
      <slot name="prepend" />
    </span>

    <span class="ui-micro-text__content">
      <slot />
    </span>

    <span
      v-if="$slots.append"
      class="ui-micro-text__append"
    >
      <slot name="append" />
    </span>
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
export default class MicroText extends Vue {
  readonly tag: string
  readonly size: 'xs' | 's' | 'm'
  readonly responsive: boolean
}
</script>

<style lang="scss">
  .ui-micro-text {
    display: flex;
    align-items: center;
    font-weight: bold;
    text-transform: uppercase;

    &_size_s {
      @include ui-typo-12;
    }

    &_size_m {
      @include ui-typo-14;
    }

    &__prepend,
    &__append {
      flex-shrink: 0;

      .ui-icon {
        display: block;
      }
    }

    &__prepend {
      margin-right: 8px;
    }

    &__content {
      flex: 1;
    }

    &__append {
      margin-left: 8px;
    }

    @media (max-width: $ui-laptop - 1px) {
      &_responsive {
        &.ui-micro-text {
          &_size_m {
            @include ui-typo-12;
          }
        }
      }
    }
  }
</style>
