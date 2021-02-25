<template>
  <label
    class="ui-field"
    :class="{
      'ui-field_error': hasError,
      'ui-field_success': success,
      'ui-field_required': required
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
      v-if="hasError"
      size="s"
      class="ui-field__error"
    >
      {{ error }}
    </UiMicroText>

    <UiMicroText
      v-if="hasSuccess"
      size="s"
      class="ui-field__success"
    >
      {{ success }}
    </UiMicroText>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiMicroText from '@/ui/MicroText/MicroText.vue'

@Component({
  components: {
    UiMicroText
  },

  props: {
    hint: {
      type: String,
      default: undefined
    },

    label: {
      type: String,
      default: undefined
    },

    error: {
      type: String,
      default: undefined
    },

    success: {
      type: String,
      default: undefined
    },

    required: {
      type: Boolean,
      default: false
    }
  }
})
export default class Field extends Vue {
  readonly hint?: string
  readonly label?: string
  readonly error?: string
  readonly success?: string

  get hasError () {
    return (
      this.error !== null &&
      this.error !== undefined
    )
  }

  get hasSuccess () {
    return (
      this.success !== null &&
      this.success !== undefined
    )
  }
}
</script>

<style lang="scss" src="./Field.scss" />
