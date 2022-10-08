<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,

  props: {
    size: {
      type: String,
      default: 'm',
    },

    tag: {
      type: String,
      default: 'div',
    },

    responsive: {
      type: Boolean,
      default: false,
    },

    leftIcon: {
      type: String,
      default: undefined,
    },

    rightIcon: {
      type: String,
      default: undefined,
    },
  },

  setup(_props, ctx) {
    return {
      attrs: computed(() => ctx.attrs),
    }
  },

  // readonly tag: string
  // readonly size: 's' | 'm' | 'l' | 'xl'
  // readonly leftIcon?: string
  // readonly rightIcon?: string
  // readonly responsive: boolean
})
</script>

<template>
  <Component
    :is="tag"
    class="ui-title"
    :class="[
      `ui-title_size_${size}`,
      { 'ui-title_responsive': responsive },
    ]"
    v-bind="attrs"
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

<style lang="scss" src="./Title.scss"></style>
