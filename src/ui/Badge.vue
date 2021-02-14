<template>
  <Component
    :is="tag"
    class="ui-badge"
    :class="[
      `ui-badge_size_${size}`,
      `ui-badge_theme_${theme}`,
      { 'ui-badge_clickable': clickable },
      { 'ui-badge_responsive': responsive }
    ]"
    v-bind="$attrs"
  >
    <div
      v-if="leftIcon"
      class="ui-badge__prepend"
    >
      <UiIcon
        :name="leftIcon"
        size="xs"
      />
    </div>
    <div
      v-if="$slots.prepend"
      class="ui-badge__prepend"
    >
      <slot name="prepend" />
    </div>

    <div class="ui-badge__content">
      <slot>
        <UiIcon
          v-if="icon"
          :name="icon"
          size="xs"
        />
      </slot>
    </div>

    <div
      v-if="rightIcon"
      class="ui-badge__append"
    >
      <UiIcon
        :name="rightIcon"
        size="xs"
      />
    </div>
    <div
      v-if="$slots.append"
      class="ui-badge__append"
    >
      <slot name="append" />
    </div>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: true,

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    theme: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: 'm'
    },

    icon: {
      type: String,
      default: undefined
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    },

    clickable: {
      type: Boolean,
      default: false
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Badge extends Vue {
  readonly size:
    | 's'
    | 'm'
    | 'l'

  readonly theme:
    | 'primary'
    | 'custom'

  readonly tag: string
  readonly icon?: string
  readonly leftIcon?: string
  readonly clickable: boolean
  readonly rightIcon?: string
  readonly responsive: boolean
}
</script>

<style lang="scss">
  @mixin ui-badge_size_16 {
    @include ui-typo-8;

    height: 16px;
    padding: 0 6px;
    font-weight: 500;
    text-transform: uppercase;

    .ui-badge__prepend {
      margin-right: 2px;
      margin-left: -4px;
    }

    .ui-badge__append {
      margin-right: -4px;
      margin-left: 2px;
    }

    .ui-badge__content {
      > .ui-icon {
        margin-right: -4px;
        margin-left: -4px;
      }
    }

    .ui-icon_size_inherit {
      width: 12px;
      height: 12px;
    }
  }

  @mixin ui-badge_size_24 {
    @include ui-typo-12;

    height: 24px;
    padding: 0 8px;
    font-weight: 500;
    text-transform: uppercase;

    .ui-badge__prepend {
      margin-right: 2px;
      margin-left: -6px;
    }

    .ui-badge__append {
      margin-right: -6px;
      margin-left: 2px;
    }

    .ui-badge__content {
      > .ui-icon {
        margin-right: -6px;
        margin-left: -6px;
      }
    }

    .ui-icon_size_inherit {
      width: 20px;
      height: 20px;
    }
  }

  @mixin ui-badge_size_32 {
    @include ui-typo-12;

    height: 32px;
    padding: 0 16px;
    font-weight: 500;
    text-transform: uppercase;

    .ui-badge__prepend {
      margin-right: 4px;
      margin-left: -8px;
    }

    .ui-badge__append {
      margin-right: -8px;
      margin-left: 4px;
    }

    .ui-badge__content {
      > .ui-icon {
        margin-right: -12px;
        margin-left: -12px;
      }
    }

    .ui-icon_size_inherit {
      width: 24px;
      height: 24px;
    }
  }

  .ui-badge {
    display: inline-flex;
    align-items: center;
    vertical-align: baseline;
    border-radius: 6px;

    &_clickable {
      cursor: pointer;
      transition: background $ui-transition;
    }

    &_theme_primary {
      color: $ui-white;
      background: $ui-brand-blue;

      &.ui-badge_clickable {
        @media (hover: hover) {
          &:hover {
            background: $ui-blue-hover-15;
          }
        }

        &:active {
          background: $ui-blue-hover-15;
        }
      }
    }

    &_size_s {
      @include ui-badge_size_16;
    }

    &_size_m {
      @include ui-badge_size_24;
    }

    &_size_l {
      @include ui-badge_size_32;
    }

    &__append,
    &__prepend {
      flex-shrink: 0;

      .ui-icon {
        display: block;
      }
    }

    &__content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      > .ui-icon {
        display: block;
      }
    }

    @include ui-mobile-only {
      &_responsive {
        &.ui-badge {
          &_size_m {
            @include ui-badge_size_16;
          }

          &_size_l {
            @include ui-badge_size_24;
          }
        }
      }
    }
  }
</style>
