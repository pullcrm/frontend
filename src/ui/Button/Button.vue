<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    :type="tag === 'button' ? type : null"
    v-bind="$attrs"
    class="ui-button"
    :class="[
      `ui-button_size_${size}`,
      `ui-button_theme_${theme}`,
      {
        'ui-button_loading': loading,
        'ui-button_disabled': disabled,
        'ui-button_responsive': responsive
      }
    ]"
  >
    <span
      v-if="leftIcon"
      class="ui-button__prepend"
    >
      <UiIcon
        :name="leftIcon"
        :size="iconSize"
      />
    </span>
    <span
      v-else-if="$slots.prepend"
      class="ui-button__prepend"
    >
      <slot name="prepend" />
    </span>

    <span
      v-if="loading"
      class="ui-button__loader"
    >
      <UiIconLoader size="s" />
    </span>
    <span
      v-if="$slots.default"
      class="ui-button__content"
    >
      <slot />
    </span>

    <span
      v-if="rightIcon"
      class="ui-button__append"
    >
      <UiIcon
        :name="rightIcon"
        :size="iconSize"
      />
    </span>
    <span
      v-else-if="$slots.append"
      class="ui-button__append"
    >
      <slot name="append" />
    </span>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '@/ui/Icon.vue'
import UiIconLoader from '@/ui/IconLoader.vue'

@Component({
  components: {
    UiIcon,
    UiIconLoader
  },

  inheritAttrs: false,

  props: {
    tag: {
      type: String,
      default: 'button'
    },

    type: {
      type: String,
      default: 'button'
    },

    theme: {
      type: String,
      default: 'primary'
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    },

    size: {
      type: String,
      default: 'l'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class Button extends Vue {
  readonly tag: string
  readonly size: 'm' | 'l'
  readonly theme:
    | 'primary'
    | 'primary-outlined'
    | 'green'
    | 'green-outlined'
    | 'yellow'
    | 'yellow-outlined'
    | 'blue'
    | 'info-outlined'
    | 'danger-outlined'
    | 'gray'
    | 'white'

  readonly disabled: boolean
  readonly leftIcon?: string
  readonly rightIcon?: string
  readonly responsive: boolean

  iconSize = this.size === 'l' ? 's' : 'xs'
}
</script>

<style lang="scss" src="./Button.scss" />
