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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiMicroText from '../MicroText/MicroText.vue'

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
      type: [String, Boolean],
      default: undefined
    },

    success: {
      type: [String, Boolean],
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
  readonly error?: string | boolean
  readonly success?: string | boolean

  get hasError () {
    return (
      this.error !== false &&
      this.error !== null &&
      this.error !== undefined
    )
  }

  get hasErrorText () {
    return typeof this.error === 'string'
  }

  get hasSuccess () {
    return (
      this.success !== false &&
      this.success !== null &&
      this.success !== undefined
    )
  }

  get hasSuccessText () {
    return typeof this.success === 'string'
  }
}
</script>

<style lang="scss" src="./Field.scss" />
