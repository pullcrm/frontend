<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    class="ui-title"
    :class="[
      `ui-title_size_${size}`,
      { 'ui-title_responsive': responsive }
    ]"
    v-bind="$attrs"
  >
    <span
      v-if="leftIcon"
      class="ui-title__prepend"
    >
      <UiIcon
        :name="leftIcon"
        size="inherit"
      />
    </span>
    <span
      v-else-if="$slots.prepend"
      class="ui-title__prepend"
    >
      <slot name="prepend" />
    </span>

    <div class="ui-title__content">
      <slot />
    </div>

    <span
      v-if="rightIcon"
      class="ui-title__append"
    >
      <UiIcon
        :name="rightIcon"
        size="inherit"
      />
    </span>
    <span
      v-else-if="$slots.append"
      class="ui-title__append"
    >
      <slot name="append" />
    </span>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiIcon from '../Icon/Icon.vue'

@Component({
  inheritAttrs: false,

  components: {
    UiIcon
  },

  props: {
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
export default class Title extends Vue {
  readonly tag: string
  readonly size: 's' | 'm' | 'l' | 'xl'
  readonly leftIcon?: string
  readonly rightIcon?: string
  readonly responsive: boolean
}
</script>

<style lang="scss" src="./Title.scss"></style>
