<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    v-bind="$attrs"
    class="ui-panel"
    :class="[
      `ui-panel_size_${size}`,
      { 'ui-panel_clickable': clickable }
    ]"
  >
    <slot />
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    tag: {
      type: String,
      default: 'div'
    },

    size: {
      type: String,
      default: 'm'
    },

    responsive: {
      type: Boolean,
      default: false
    },

    clickable: {
      type: Boolean,
      default: false
    }
  }
})
export default class Panel extends Vue {

}
</script>

<style lang="scss">
  .ui-panel {
    display: block;
    background: #fff;
    border: 1px solid $ui-black-20;
    border-radius: 8px;

    &_size_xs {
      --ui-panel-padding: 8px;

      padding: 8px;
    }

    &_size_s {
      --ui-panel-padding: 16px;

      padding: 16px;
    }

    &_size_m {
      --ui-panel-padding: 24px;

      padding: 24px;
    }

    &_size_l {
      --ui-panel-padding: 32px;

      padding: 32px;
    }

    @include ui-hover {
      &_clickable {
        transition: box-shadow var(--ui-transition-hover);

        &:hover {
          @include ui-shadow-16;
        }
      }
    }

    @include ui-mobile-only {
      &_responsive {
        &.ui-panel {
          &_size_s {
            --ui-panel-padding: 8px;

            padding: 8px;
          }

          &_size_m {
            --ui-panel-padding: 16px;

            padding: 16px;
          }
        }
      }
    }
  }
</style>
