<script lang="ts" setup>
const props = defineProps({
  hint: {
    type: String,
    default: undefined,
  },

  label: {
    type: String,
    default: undefined,
  },

  error: {
    type: [String, Boolean],
    default: undefined,
  },

  success: {
    type: [String, Boolean],
    default: undefined,
  },

  required: {
    type: Boolean,
    default: false,
  },
})

const hasError = computed(() => {
  return (
    props.error !== false
    && props.error !== null
    && props.error !== undefined
  )
})

const hasErrorText = computed(() => {
  return typeof props.error === 'string'
})

const hasSuccess = computed(() => {
  return (
    props.success !== false
    && props.success !== null
    && props.success !== undefined
  )
})

const hasSuccessText = computed(() => {
  return typeof props.success === 'string'
})
</script>

<template>
  <label
    class="ui-field"
    :class="{
      'ui-field_error': hasError,
      'ui-field_success': success,
      'ui-field_required': required,
    }"
  >
    <div
      v-if="label || $slots.label"
      class="ui-field__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>

    <div
      v-if="hint || $slots.hint"
      class="ui-field__hint"
    >
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>

    <div class="ui-field__content">
      <slot />
    </div>

    <UiMicroText
      v-if="hasErrorText"
      size="s"
      class="ui-field__error"
    >
      {{ error }}
    </UiMicroText>

    <UiMicroText
      v-if="hasSuccessText"
      size="s"
      class="ui-field__success"
    >
      {{ success }}
    </UiMicroText>
  </label>
</template>

<style lang="scss" src="./Field.scss" />
