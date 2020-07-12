<template>
  <div
    v-click-outside="{
      handler: onOutsideClick,
      isActive: isOpened
    }"
    class="ui-popover"
    :class="[
      `ui-popover_${placement}`,
      `ui-popover_size_${size}`
    ]"
  >
    <slot
      :open="open"
      :close="close"
      :is-opened="isOpened"
    />

    <template v-if="isOpened">
      <div class="ui-popover__arrow" />
      <div class="ui-popover__body">
        <slot
          name="body"
          :close="close"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    size: {
      type: String,
      required: true
    },

    placement: {
      type: String,
      default: null
    },

    opened: {
      type: Boolean,
      default: false
    },

    closeOnOutsideClick: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    $route () {
      this.close()
    },

    opened: {
      immediate: true,
      handler (isOpened: boolean) {
        this.isOpened = isOpened
      }
    },

    isOpened (opened) {
      this.$emit('open', opened)
    }
  }
})
export default class UiPopover extends Vue {
  readonly opened: boolean

  readonly size:
    | 'xs'
    | 's'
    | 'm'
    | 'l'

  readonly placement:
    | 'custom'
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'left-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'

  readonly closeOnOutsideClick: boolean

  isOpened = false

  onOutsideClick () {
    if (this.closeOnOutsideClick) {
      return this.close()
    }
  }

  open () {
    this.isOpened = true
  }

  close () {
    this.isOpened = false
  }
}
</script>

<style lang="scss" src="./Popover.scss"></style>
