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
      required: true
    },

    value: {
      type: Boolean,
      required: true
    },

    nativeValue: {
      type: String,
      default: undefined
    }
  }
})
export default class Checkbox extends Vue {
  readonly size:
    | 's'
    | 'm'
    | 'l'

  readonly value: boolean
  readonly nativeValue?: string

  get innerValue () {
    return this.value
  }

  set innerValue (value) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" src="./Checkbox.scss" />
