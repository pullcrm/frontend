<template>
  <div
    class="ui-input"
  >
    <span
      v-if="leftIcon"
      class="ui-input__prepend"
    >
      <UiIcon
        class="ui-input__icon"
        :name="leftIcon"
        size="s"
      />
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
      v-else-if="clearable && value && !disabled"
      class="ui-input__append"
      @click.prevent="onClear"
    >
      <UiIcon
        class="ui-input__clear"
        name="x-fill"
        size="s"
      />
    </span>
    <span
      v-else-if="rightIcon"
      class="ui-input__append"
    >
      <UiIcon
        class="ui-input__icon"
        :name="rightIcon"
        size="s"
      />
    </span>

    <span class="ui-input__content">
      <TheMask
        v-if="mask"
        ref="input"
        :value="value"
        :mask="mask"
        :masked="maskedValue"
        :type="type"
        :disabled="disabled"
        v-bind="$attrs"
        class="ui-input__input"
        @focus.native="$emit('focus')"
        @blur.native="$emit('blur')"
        @input="onInput"
      />
      <textarea
        v-else-if="tag === 'textarea'"
        ref="input"
        :value="value"
        :disabled="disabled"
        v-bind="$attrs"
        class="ui-input__input"
        v-on="listeners"
      />
      <input
        v-else
        ref="input"
        :value="value"
        :type="type"
        :disabled="disabled"
        v-bind="$attrs"
        class="ui-input__input"
        v-on="listeners"
      >
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { TheMask } from 'vue-the-mask'

@Component({
  components: {
    TheMask
  },

  inheritAttrs: false,

  props: {
    value: {
      required: true,
      validator: () => true
    },

    type: {
      type: String,
      default: 'text'
    },

    trim: {
      type: Boolean,
      default: false
    },

    mask: {
      type: String,
      default: undefined
    },

    maskedValue: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    clearable: {
      type: Boolean,
      default: false
    },

    autofocus: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    },

    tag: {
      type: String,
      default: 'input'
    }
  }
})
export default class Input extends Vue {
  readonly tag: 'input' | 'textarea'
  readonly type: string
  readonly trim: boolean
  readonly value: string
  readonly mask?: string
  readonly loading: boolean
  readonly clearable: boolean
  readonly autofocus: boolean
  readonly leftIcon?: string
  readonly rightIcon?: string
  readonly maskedValue: boolean

  $refs: {
    input: HTMLInputElement | TheMask;
  }

  get listeners () {
    return {
      ...this.$listeners,
      input: (event) => {
        return this.onInput(event.target.value)
      },
      change: (event) => {
        return this.onChange(event.target.value)
      }
    }
  }

  activated () {
    if (this.autofocus) {
      this.focus()
    }
  }

  mounted () {
    if (this.autofocus) {
      this.focus()
    }
  }

  focus () {
    if (this.mask) {
      this.$refs.input.$el.focus()
    } else {
      this.$refs.input.focus()
    }
  }

  blur () {
    this.$refs.input.blur()
  }

  onClear () {
    this.$emit('input', '')
    this.$emit('change', '')
    this.$emit('clear')
  }

  onInput (value) {
    if (this.trim) {
      value = value.trim()
    }

    this.$emit('input', value)
  }

  onChange (value) {
    if (this.trim) {
      value = value.trim()
    }

    this.$emit('change', value)
  }
}
</script>

<style lang="scss" src="./Input.scss" />
