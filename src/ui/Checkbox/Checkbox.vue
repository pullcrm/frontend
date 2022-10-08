<script lang="ts" setup>
import UiIcon from '../Icon/Icon.vue'

// inheritAttrs: false,

const props = defineProps({
  size: {
    type: String,
    required: true,
  },

  value: {
    type: Boolean,
    required: true,
  },

  nativeValue: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['input'])

// readonly size:
// | 's'
// | 'm'
// | 'l'

const innerValue = computed<boolean>({
  get() {
    return props.value
  },

  set(val) {
    emit('input', val)
  },
})
</script>

<template>
  <label
    class="ui-checkbox"
    :class="`ui-checkbox_size_${size}`"
    data-test="ui-checkbox"
  >
    <input
      v-model="innerValue"
      :value="nativeValue"
      type="checkbox"
      class="ui-checkbox__input"
      data-test="ui-checkbox-input"
      v-bind="$attrs"
    >

    <div
      v-if="$slots.prepend"
      class="ui-checkbox__prepend"
    >
      <slot name="prepend" />
    </div>

    <div
      class="ui-checkbox__check"
      data-test="ui-checkbox-check"
    >
      <UiIcon
        name="outlined/check"
        size="custom"
      />
    </div>

    <div
      v-if="$slots.append"
      class="ui-checkbox__append"
    >
      <slot name="append" />
    </div>
  </label>
</template>

<style lang="scss" src="./Checkbox.scss" />
