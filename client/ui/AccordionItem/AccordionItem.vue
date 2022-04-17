<template>
  <div
    class="ui-accordion-item"
    :class="{
      'ui-accordion-item_opened': isOpened,
      'ui-accordion-item_responsive': responsive
    }"
  >
    <div
      class="ui-accordion-item__toggle"
      @click="toggle"
    >
      <slot name="toggle" />

      <UiIcon
        name="outlined/caret-down"
        size="s"
      />
    </div>

    <UiCollapse :opened="isOpened">
      <div class="ui-accordion-item__body">
        <slot />
      </div>
    </UiCollapse>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '../Icon/Icon.vue'
import UiCollapse from '../Collapse.vue'
import UiAccordion from '../Accordion/Accordion.vue'

@Component({
  components: {
    UiIcon,
    UiCollapse
  },

  props: {
    name: {
      type: [String, Number],
      required: true
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Item extends Vue {
  readonly name: string | number
  readonly responsive: boolean

  $parent: UiAccordion

  get isOpened () {
    return this.$parent.isItemOpened(this.name)
  }

  toggle () {
    this.$parent.toggleItem(this.name)
  }

  open () {
    this.$parent.openItem(this.name)
  }
}
</script>

<style lang="scss">
  .ui-accordion-item {
    &_opened {
      .ui-accordion-item {
        &__toggle {
          .ui-icon {
            transform: rotate(180deg);
          }
        }
      }
    }

    &__toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .ui-icon {
        flex: 0 0 24px;
        margin-left: 16px;
        transition: transform var(--ui-transition);
      }
    }

    &__body {
      margin-top: 16px;
    }

    @media (min-width: $ui-laptop) {
      &_responsive {
        .ui-icon {
          display: none;
        }

        .ui-collapse {
          max-height: none !important;
        }

        .ui-accordion-item {
          &__toggle {
            cursor: text;
          }
        }
      }
    }
  }
</style>
