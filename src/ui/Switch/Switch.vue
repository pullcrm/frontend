<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    required: true,
  },

  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:model-value'])
// readonly size:
// | 'm'
// | 'l'

const innerValue = computed<boolean>({
  get() {
    return props.modelValue
  },

  set(value) {
    emit('update:model-value', value)
  },
})
</script>

<template>
  <label
    class="ui-switch"
    :class="`ui-switch_size_${size}`"
    data-test="ui-switch"
  >
    <input
      v-model="innerValue"
      type="checkbox"
      class="ui-switch__input"
      data-test="ui-switch-input"
      v-bind="$attrs"
    >

    <div
      v-if="$slots.prepend"
      class="ui-switch__prepend"
    >
      <slot name="prepend" />
    </div>

    <div
      class="ui-switch__check"
      data-test="ui-switch-check"
    />

    <div
      v-if="$slots.append"
      class="ui-switch__append"
    >
      <slot name="append" />
    </div>
  </label>
</template>

<style lang="scss" src="./Switch.scss" />
