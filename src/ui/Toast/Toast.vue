<template>
  <div
    class="ui-toast"
    :class="[
      `ui-toast_theme_${theme}`
    ]"
    data-test="ui-toast"
  >
    <div
      v-if="leftIcon"
      class="ui-toast__prepend"
    >
      <UiIcon
        :name="leftIcon"
        size="m"
      />
    </div>
    <div
      v-else-if="$slots.prepend"
      class="ui-toast__prepend"
    >
      <slot name="prepend" />
    </div>

    <div class="ui-toast__content">
      <slot>
        <UiText
          size="l"
          responsive
        >
          {{ title }}
        </UiText>
      </slot>
    </div>

    <div
      v-if="$slots.append"
      class="ui-toast__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
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
