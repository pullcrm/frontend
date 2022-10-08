<script lang="ts" setup>
// inheritAttrs: false,

defineProps({
  theme: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    default: 'a',
  },

  underlined: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : tag"
    v-bind="$attrs"
    class="ui-link"
    :class="[
      `ui-link_theme_${theme}`,
      { 'ui-link_underlined': underlined },
    ]"
  >
    <slot />
  </Component>
</template>

<style lang="scss" src="./Link.scss"></style>
