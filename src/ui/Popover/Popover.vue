<template>
  <div
    v-click-outside="{
      handler: close,
      isActive: closedOutside && isOpened
    }"
    class="ui-popover"
    :class="[
      `ui-popover_size_${size}`,
      `ui-popover_theme_${theme}`,
      `ui-popover_${computedPlacement.split('_')[0]}`,
      `ui-popover_${computedPlacement}`,
      { 'ui-popover_opened': isOpened }
    ]"
    @mouseover="hover && !isTouchDevice && open()"
    @mouseout="hover && !isTouchDevice && close()"
  >
    <slot
      :open="open"
      :close="close"
      :toggle="toggle"
      :is-opened="isOpened"
    />

    <template v-if="enabled">
      <div class="ui-popover__arrow" />

      <div
        ref="body"
        class="ui-popover__body"
      >
        <slot name="body">
          <UiText
            size="m"
            responsive
          >
            {{ text }}
          </UiText>
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { isTouchDevice } from '@/utils/device'
import { computePlacement, Placement } from '@/utils/placement'

@Component({
  inject: {
    getContainer: {
      from: 'getUiTooltipContainer',
      default () {
        return () => document.body
      }
    }
  },

  props: {
    theme: {
      type: String,
      default: 'white'
    },

    size: {
      type: String,
      default: 'm'
    },

    placement: {
      type: String,
      default: 'right_middle'
    },

    enabled: {
      type: Boolean,
      default: true
    },

    hover: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: undefined
    },

    closedOutside: {
      type: Boolean,
      default: true
    }
  }
})
export default class Popover extends Vue {
  readonly getContainer!: () => HTMLElement

  readonly hover!: boolean
  readonly text?: string
  readonly theme!:
    | 'dark'
    | 'white'
    | 'custom'

  readonly size!:
    | 'm'
    | 'custom'

  readonly placement!: Placement
  readonly closedOutside! : Boolean

  isOpened = false
  computedPlacement: Placement

  $refs: {
    body: HTMLElement
  }

  constructor () {
    super()

    this.computedPlacement = this.placement
  }

  get isTouchDevice () {
    return isTouchDevice()
  }

  open () {
    this.computePlacement()

    this.isOpened = true
  }

  close () {
    this.isOpened = false
  }

  toggle () {
    if (this.isOpened) {
      this.close()
    } else {
      this.open()
    }
  }

  computePlacement () {
    const container = this.getContainer()

    const placement = computePlacement(this.$refs.body, {
      reference: this.$el as HTMLElement,
      container: container.getBoundingClientRect(),
      placement: this.placement
    })

    this.computedPlacement = placement
  }
}
</script>

<style lang="scss" src="./Popover.scss"></style>
