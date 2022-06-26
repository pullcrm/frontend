<script lang="ts" setup>
import UiIcon from '../Icon/Icon.vue'
import UiCollapse from '../Collapse.vue'
import type UiAccordion from '../Accordion/Accordion.vue'

const props = defineProps({
  name: {
    type: [String, Number],
    required: true,
  },

  openItem: {
    type: Function,
    required: true,
  },

  toggleItem: {
    type: Function,
    required: true,
  },

  isItemOpened: {
    type: Function,
    required: true,
  },

  responsive: {
    type: Boolean,
    default: false,
  },
})

// $parent: UiAccordion

const isOpened = computed(() => {
  return props.isItemOpened(props.name)
})

function toggle() {
  props.toggleItem(props.name)
}

function open() {
  props.openItem(props.name)
}

defineExpose({ open, toggle, isOpened })
</script>

<template>
  <div
    class="ui-accordion-item"
    :class="{
      'ui-accordion-item_opened': isOpened,
      'ui-accordion-item_responsive': responsive,
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
