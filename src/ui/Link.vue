<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    v-bind="$attrs"
    class="ui-link"
    :class="[
      `ui-link_theme_${theme}`
    ]"
  >
    <slot />
  </Component>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    theme: {
      type: String,
      required: true
    },

    tag: {
      type: String,
      default: 'a'
    }
  }
}
</script>

<style lang="scss">
  .ui-link {
    display: inline-flex;
    align-items: center;
    vertical-align: baseline;
    cursor: pointer;
    transition: color var(--ui-transition-hover);
    user-select: none;

    &_theme_primary {
      color: $ui-black-100;
      text-decoration: underline;

      &:active {
        color: $ui-black-hover-15;
      }

      @media (hover: hover) {
        &:hover {
          color: $ui-black-hover-15;
        }
      }
    }

    &_theme_secondary {
      color: $ui-blue-info;
      text-decoration: underline;

      &:active {
        color: $ui-blue-hover-15;
      }

      @media (hover: hover) {
        &:hover {
          color: $ui-blue-hover-15;
        }
      }
    }

    &_theme_action {
      color: $ui-green-brand;

      &:active {
        color: $ui-green-hover-15;
      }

      @media (hover: hover) {
        &:hover {
          color: $ui-green-hover-15;
        }
      }
    }

    &_theme_secondary-action {
      color: $ui-blue-info;

      &:active {
        color: $ui-blue-hover-15;
      }

      @media (hover: hover) {
        &:hover {
          color: $ui-blue-hover-15;
        }
      }
    }
  }
</style>
