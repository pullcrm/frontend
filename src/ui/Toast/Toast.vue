<template>
  <div
    class="ui-toast"
    :class="[
      `ui-toast_theme_${theme}`,
      { 'ui-toast_closable': closable }
    ]"
    data-test="ui-toast"
  >
    <div class="ui-toast__vertical" />

    <div
      v-if="leftIcon"
      class="ui-toast__prepend"
    >
      <div class="ui-toast__icon">
        <UiIcon
          :name="leftIcon"
          size="s"
        />
      </div>
    </div>
    <div
      v-else-if="$slots.prepend"
      class="ui-toast__prepend"
    >
      <slot name="prepend" />
    </div>

    <div class="ui-toast__content">
      <slot>
        <UiToastTitle
          v-if="title"
          class="ui-toast__title"
        >
          <span v-html="title" />
        </UiToastTitle>

        <UiToastText
          v-if="text"
          class="ui-toast__text"
        >
          <span v-html="text" />
        </UiToastText>
      </slot>
    </div>

    <div
      v-if="$slots.append"
      class="ui-toast__append"
    >
      <slot name="append" />
    </div>

    <div
      v-if="closable"
      class="ui-toast__close"
      data-test="ui-toast-close"
      @click="onClose"
    >
      <UiIcon
        name="close/close-1"
        size="s"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiToastText from '../ToastText/ToastText.vue'
import UiToastTitle from '../ToastTitle/ToastTitle.vue'

@Component({
  components: {
    UiToastText,
    UiToastTitle
  },

  props: {
    theme: {
      type: String,
      default: 'success'
    },

    title: {
      type: String,
      default: undefined
    },

    text: {
      type: String,
      default: undefined
    },

    timeout: {
      type: Number,
      default: undefined
    },

    closable: {
      type: Boolean,
      default: true
    },

    leftIcon: {
      type: String,
      default: undefined
    }
  }
})
export default class UiToast extends Vue {
  readonly theme:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'

  readonly text?: string
  readonly title?: string
  readonly timeout?: number
  readonly closable: boolean
  readonly leftIcon?: string

  mounted () {
    if (this.timeout) {
      const timerId = setTimeout(this.onClose, this.timeout)

      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timerId)
      })
    }
  }

  onClose () {
    this.$emit('close')
  }
}
</script>

<style lang="scss" src="./Toast.scss" />
