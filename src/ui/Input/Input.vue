<script lang="ts" setup>
import { maska as vMaska } from 'maska'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  trim: {
    type: Boolean,
    default: false,
  },

  mask: {
    type: String,
    default: undefined,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  clearable: {
    type: Boolean,
    default: false,
  },

  autofocus: {
    type: Boolean,
    default: false,
  },

  loading: {
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

  tag: {
    type: String,
    default: 'input',
  },
})

const emit = defineEmits([
  'clear',
  'change',
  'update:modelValue',
])

const input = ref<HTMLInputElement | null>(null)

const focus = () => {
  input.value?.focus()
}

const blur = () => {
  input.value?.blur()
}

onMounted(() => {
  if (props.autofocus)
    focus()
})

const onClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

const onInput = (event: Event) => {
  let value = (event.target as HTMLInputElement).value

  if (props.trim)
    value = value.trim()

  emit('update:modelValue', value)
}

const onChange = (event: Event) => {
  let value = (event.target as HTMLInputElement).value

  if (props.trim)
    value = value.trim()

  emit('change', value)
}

defineExpose({ blur })
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    class="ui-input"
  >
    <span
      v-if="leftIcon"
      class="ui-input__prepend"
    >
      <UiIcon
        class="ui-input__icon _left"
        :name="leftIcon"
        size="s"
      />
    </span>
    <span
      v-else-if="$slots.prepend"
      class="ui-input__prepend"
    >
      <slot name="prepend" />
    </span>

    <span
      v-if="loading"
      class="ui-input__append"
    >
      <UiIconLoader
        class="ui-input__loader"
        size="s"
      />
    </span>
    <span
      v-else-if="clearable && modelValue && !disabled"
      class="ui-input__append"
      @click.prevent="onClear"
    >
      <UiIcon
        class="ui-input__clear"
        name="outlined/x"
        size="s"
      />
    </span>
    <span
      v-else-if="rightIcon"
      class="ui-input__append"
    >
      <UiIcon
        class="ui-input__icon _right"
        :name="rightIcon"
        size="s"
      />
    </span>
    <span
      v-else-if="$slots.append"
      class="ui-input__append"
    >
      <slot name="append" />
    </span>

    <span class="ui-input__content">
      <textarea
        v-if="tag === 'textarea'"
        ref="input"
        :value="modelValue"
        :disabled="disabled"
        v-bind="$attrs"
        class="ui-input__input"
        @input="onInput"
        @change="onChange"
      />
      <input
        v-else
        ref="input"
        v-maska="mask"
        :value="modelValue"
        :type="type"
        :disabled="disabled"
        v-bind="$attrs"
        class="ui-input__input"
        @input="onInput"
        @change="onChange"
      >
    </span>
  </div>
</template>

<style lang="scss" src="./Input.scss" />
