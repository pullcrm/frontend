<template>
  <div
    v-click-outside="{
      handler: onOutsideClick
    }"
    class="popper"
  >
    <div
      class="popper__arrow"
      data-popper-arrow
    />

    <div class="popper__container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { createPopper } from '@popperjs/core'
import type { Placement } from '@popperjs/core'

@Component({
  props: {
    reference: {
      required: true
    },

    placement: {
      type: String,
      default: 'auto'
    },

    offset: {
      type: Array,
      default: () => {
        return [0, 16]
      }
    }
  }
})
export default class Popper extends Vue {
  readonly offset: Number[]
  readonly reference: HTMLElement
  readonly placement: Placement

  popper

  async mounted () {
    const arrow = this.$el.querySelector('.popper__arrow')

    this.popper = await createPopper(this.reference, this.$el as HTMLElement, {
      placement: this.placement,
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrow
          }
        },
        {
          name: 'offset',
          options: {
            offset: this.offset
          }
        }
      ]
    })

    this.$on('hook:beforeDestroy', () => {
      this.popper.destroy()
    })
  }

  onOutsideClick () {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .popper {
    @include ui-shadow-16;

    z-index: 33;

    &__container {
      background: rgb(255, 255, 255);
      border-radius: 4px;
    }

    &__arrow {
      position: absolute;
      left: -4px;
      z-index: -1;
      width: 10px;
      height: 10px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 10px;
        height: 10px;
        background: rgb(255, 255, 255);
        box-shadow: 0 0 8px rgba(#000, 0.1);
        transform: translateX(0) rotate(45deg);
        transform-origin: center center;
        transition: transform 0.2s ease-out 0s, visibility 0.2s ease-out 0s;
        content: '';
      }
    }

    &[data-popper-placement='top'] {
      .popper {
        &__arrow {
          bottom: -4px;
        }
      }
    }

    &[data-popper-placement='right'] {
      .popper {
        &__arrow {
          left: -4px;
        }
      }
    }

    &[data-popper-placement='bottom'],
    &[data-popper-placement='bottom-end'],
    &[data-popper-placement='bottom-start'] {
      .popper {
        &__arrow {
          top: -4px;
        }
      }
    }

    &[data-popper-placement='left'] {
      .popper {
        &__arrow {
          right: -4px;
        }
      }
    }
  }
</style>
