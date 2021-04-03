<template>
  <label
    class="ui-switch"
    :class="`ui-switch_size_${size}`"
    data-test="ui-switch"
  >
    <input
      v-model="innerValue"
      :value="nativeValue"
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: false,

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
export default class UiSwitch extends Vue {
  readonly size:
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

<style lang="scss" src="./Switch.scss" />
