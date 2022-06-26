<script lang="ts" setup>
import UiIcon from '../Icon/Icon.vue'
import UiIconLoader from '../IconLoader.vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },

  type: {
    type: String,
    default: 'button',
  },

  theme: {
    type: String,
    default: 'primary',
  },

  leftIcon: {
    type: String,
    default: '',
  },

  rightIcon: {
    type: String,
    default: '',
  },

  size: {
    type: String,
    default: 'l',
  },

  loading: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  responsive: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const attrs = useAttrs()

const tag = attrs?.to
  ? 'RouterLink'
  : props.tag

const prepend = computed(() => {
  return props.leftIcon || slots.prepend
})

const append = computed(() => {
  return props.rightIcon || slots.append
})
</script>

<template>
  <Component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :class="[
      'ui-button',
      `ui-button_size_${size}`,
      `ui-button_theme_${theme}`,
      {
        'ui-button_loading': loading,
        'ui-button_disabled': disabled,
        'ui-button_responsive': responsive,
      },
    ]"
  >
    <template
      v-if="!prepend && !append && !loading && $slots.default"
    >
      <slot />
    </template>
    <span
      v-else-if="$slots.default"
      class="ui-button__content"
    >
      <slot />
    </span>

    <span
      v-if="prepend"
      class="ui-button__prepend"
    >
      <slot name="prepend">
        <UiIcon
          size="s"
          :name="leftIcon"
        />
      </slot>
    </span>

    <span
      v-if="append"
      class="ui-button__append"
    >
      <slot name="append">
        <UiIcon
          size="s"
          :name="rightIcon"
        />
      </slot>
    </span>

    <span
      v-if="loading"
      class="ui-button__loader"
    >
      <UiIconLoader
        size="s"
      />
    </span>
  </Component>
</template>

<style lang="scss" src="./Button.scss" />
