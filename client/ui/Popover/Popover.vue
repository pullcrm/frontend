<template>
  <div
    v-click-outside="{
      handler: close,
      isActive: clickable && isOpened
    }"
    class="ui-popover"
    :class="[
      `ui-popover_size_${size}`,
      `ui-popover_theme_${theme}`,
      `ui-popover_${computedPlacement.split('_')[0]}`,
      `ui-popover_${computedPlacement}`,
      { 'ui-popover_opened': isOpened }
    ]"
    @click.prevent="clickable && toggle()"
  >
    <slot
      :is-opened="isOpened"
    />

    <div class="ui-popover__arrow" />

    <div
      ref="body"
      class="ui-popover__body"
      @click.stop
    >
      <slot
        name="body"
        :close="close"
      >
        <UiText
          size="m"
          responsive
        >
          {{ text }}
        </UiText>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { computePlacement, Placement } from '~/utils/placement'

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

    opened: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: undefined
    },

    clickable: {
      type: Boolean,
      default: true
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
export default class Popover extends Vue {
  readonly getContainer!: () => HTMLElement

  readonly opened!: boolean
  readonly text?: string
  readonly theme!:
    | 'dark'
    | 'white'
    | 'custom'

  readonly size!:
    | 's'
    | 'm'
    | 'l'
    | 'custom'

  readonly placement!: Placement
  readonly clickable! : Boolean

  isOpened = false
  computedPlacement: Placement

  $refs: {
    body: HTMLElement
  }

  constructor () {
    super()

    this.computedPlacement = this.placement
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
