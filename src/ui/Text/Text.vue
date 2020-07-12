<template>
  <Component
    :is="tag"
    class="ui-text"
    :class="[
      `ui-text_size_${size}`,
      { 'ui-text_responsive': responsive }
    ]"
    v-bind="$attrs"
  >
    <span
      v-if="leftIcon"
      class="ui-text__prepend"
    >
      <UiIcon
        :name="leftIcon"
        size="inherit"
      />
    </span>
    <span
      v-else-if="$slots.prepend"
      class="ui-text__prepend"
    >
      <slot name="prepend" />
    </span>

    <div class="ui-text__content">
      <slot>{{ text }}</slot>
    </div>

    <span
      v-if="rightIcon"
      class="ui-text__append"
    >
      <UiIcon
        :name="rightIcon"
        size="inherit"
      />
    </span>
    <span
      v-else-if="$slots.append"
      class="ui-text__append"
    >
      <slot name="append" />
    </span>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '../Icon.vue'

@Component({
  inheritAttrs: false,

  components: {
    UiIcon
  },

  props: {
    text: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'm'
    },

    tag: {
      type: String,
      default: 'div'
    },

    responsive: {
      type: Boolean,
      default: false
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    }
  }
})
export default class UiText extends Vue {
  readonly tag: string
  readonly text: string
  readonly size:
    | 'xs'
    | 's'
    | 'm'
    | 'l'

  readonly leftIcon?: string
  readonly rightIcon?: string
  readonly responsive: boolean
}
</script>

<style lang="scss" src="./Text.scss"></style>
