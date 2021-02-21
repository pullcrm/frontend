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
        class="ui-button__icon"
        size="custom"
        :name="leftIcon"
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
      <UiIconLoader
        class="ui-button__icon"
        size="custom"
      />
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
        class="ui-button__icon"
        size="custom"
        :name="rightIcon"
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

@Component({
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
  readonly size: 's' | 'm' | 'l'
  readonly theme:
    | 'primary'
    | 'green'
    | 'green-outlined'
    | 'yellow'
    | 'yellow-outlined'
    | 'blue'
    | 'info-outlined'
    | 'danger-outlined'
    | 'gray'
    | 'white'
    | 'transparent'

  readonly disabled: boolean
  readonly leftIcon?: string
  readonly rightIcon?: string
  readonly responsive: boolean
}
</script>

<style lang="scss" src="./Button.scss" />
