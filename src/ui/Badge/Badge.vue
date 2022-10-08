<script lang="ts" setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },

  theme: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'm',
  },

  icon: {
    type: String,
    default: undefined,
  },

  leftIcon: {
    type: String,
    default: undefined,
  },

  rightIcon: {
    type: String,
    default: undefined,
  },

  clickable: {
    type: Boolean,
    default: false,
  },

  responsive: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const root = ref<HTMLElement | null>(null)

const hasPrepend = computed(() => slots.prepend || props.leftIcon)
const hasAppend = computed(() => slots.append || props.rightIcon)

defineExpose({ root })
</script>

<template>
  <Component
    :is="tag"
    ref="root"
    :class="[
      'ui-badge',
      `ui-badge_size_${size}`,
      `ui-badge_theme_${theme}`,
      { 'ui-badge_clickable': clickable },
      { 'ui-badge_responsive': responsive },
    ]"
  >
    <div
      v-if="hasPrepend"
      class="ui-badge__prepend"
    >
      <slot name="prepend">
        <UiIcon
          name="leftIcon"
          size="inherit"
        />
      </slot>
    </div>

    <template v-if="!hasPrepend && !hasAppend && !icon">
      <slot />
    </template>
    <div
      v-else
      class="ui-badge__content"
    >
      <UiIcon
        v-if="icon"
        :name="icon"
        size="inherit"
      />
      <slot />
    </div>

    <div
      v-if="hasAppend"
      class="ui-badge__append"
    >
      <slot name="append">
        <UiIcon
          name="rightIcon"
          size="inherit"
        />
      </slot>
    </div>
  </Component>
</template>

<style lang="scss" src="./Badge.scss"></style>
