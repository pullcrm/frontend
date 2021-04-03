<template>
  <div
    v-click-outside="{
      handler: close,
      isActive: clickable && isOpened
    }"
    class="ui-tooltip"
    :class="[
      `ui-tooltip_theme_${theme}`,
      `ui-tooltip_${computedPlacement.split('_')[0]}`,
      `ui-tooltip_${computedPlacement}`,
      { 'ui-tooltip_opened': isOpened }
    ]"
    @click.prevent="clickable && toggle()"
    @mouseout="clickable && !isTouchDevice && close()"
    @mouseover="clickable && !isTouchDevice && open()"
  >
    <slot />

    <div class="ui-tooltip__arrow" />

    <UiText
      ref="body"
      class="ui-tooltip__body"
      @click.native.stop
    >
      <slot name="body">
        {{ text }}
      </slot>
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { isTouchDevice } from '~/utils/device'
import { computePlacement, Placement } from '~/utils/placement'

import UiText from '../Text/Text.vue'

@Component({
  inject: {
    getContainer: {
      from: 'getUiTooltipContainer',
      default () {
        return () => document.body
      }
    }
  },

  components: {
    UiText
  },

  props: {
    theme: {
      type: String,
      default: 'dark'
    },

    placement: {
      type: String,
      default: 'right_middle'
    },

    clickable: {
      type: Boolean,
      default: true
    },

    text: {
      type: String,
      default: undefined
    },

    opened: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    opened: {
      handler (opened) {
        opened
          ? this.open()
          : this.close()
      }
    }
  }
})
export default class Tooltip extends Vue {
  readonly getContainer!: () => HTMLElement

  readonly text?: string
  readonly theme!:
    | 'dark'
    | 'custom'

  readonly opened!: boolean
  readonly clickable!: boolean
  readonly placement!: Placement

  isOpened = false
  computedPlacement: Placement

  $refs: {
    body: HTMLElement
  }

  constructor () {
    super()

    this.computedPlacement = this.placement
  }

  mounted () {
    requestAnimationFrame(() => {
      if (this.opened) {
        this.open()
      }
    })
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

<style lang="scss" src="./Tooltip.scss"></style>
