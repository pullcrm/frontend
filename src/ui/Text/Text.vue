<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },

  size: {
    type: String,
    default: 'm',
  },

  tag: {
    type: String,
    default: 'div',
  },

  strong: {
    type: Boolean,
    default: false,
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
})

const slots = useSlots()

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
    :class="[
      'ui-text',
      `ui-text_size_${size}`,
      { 'ui-text_strong': strong },
      { 'ui-text_responsive': responsive },
      { 'ui-text_has-append': Boolean(append) },
      { 'ui-text_has-prepend': Boolean(prepend) },
    ]"
  >
    <div
      v-if="prepend"
      class="ui-text__prepend"
    >
      <slot name="prepend">
        <UiIcon
          size="inherit"
          :name="leftIcon"
        />
      </slot>
    </div>

    <div
      v-if="prepend || append"
      class="ui-text__content"
    >
      <slot>
        {{ text }}
      </slot>
    </div>

    <template
      v-else
    >
      <slot>
        {{ text }}
      </slot>
    </template>

    <div
      v-if="append"
      class="ui-text__append"
    >
      <slot name="append">
        <UiIcon
          size="inherit"
          :name="rightIcon"
        />
      </slot>
    </div>
  </Component>
</template>

<style lang="scss" src="./Text.scss"></style>
