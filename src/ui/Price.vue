<template>
  <div
    class="ui-price"
    :class="[
      `ui-price_size_${size}`,
      { 'ui-price_responsive': responsive }
    ]"
  >
    <div
      v-if="$slots.prepend"
      class="ui-price__prepend"
    >
      <slot name="prepend" />
    </div>

    <div
      class="ui-price__content"
    >
      <slot />
    </div>

    <div
      v-if="$slots.append"
      class="ui-price__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    size: {
      type: String,
      default: 'm'
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Price extends Vue {
  readonly size:
    | 'xs'
    | 's'
    | 'm'
    | 'xl'
}
</script>

<style lang="scss">
  .ui-price {
    display: flex;
    align-items: center;
    color: $ui-green-hover-25;
    font-weight: bold;

    &_size_s {
      @include ui-typo-14;
    }

    &_size_m {
      @include ui-typo-16;
    }

    &_size_xl {
      @include ui-typo-18;
    }

    &_size_xxl {
      @include ui-typo-24;
    }

    &__append,
    &__prepend {
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

    // @include ui-desktop-only {
    //   @media (max-width: $ui-laptop - 1px) {
    //     &_responsive {
    //       &.ui-price {
    //         &_size_m {
    //           @include ui-typo-22;
    //         }

    //         &_size_xl {
    //           @include ui-typo-36;
    //         }
    //       }
    //     }
    //   }
    // }

    // @include ui-mobile-only {
    //   &_responsive {
    //     &.ui-price {
    //       &_size_s {
    //         @include ui-typo-14;
    //       }

    //       &_size_m {
    //         @include ui-typo-20;
    //       }

    //       &_size_xl {
    //         @include ui-typo-24;
    //       }
    //     }
    //   }
    // }
  }
</style>
