<template>
  <div
    class="ui-alert"
    :class="`ui-alert_theme_${theme}`"
  >
    <div class="ui-alert__vertical" />

    <div
      v-if="leftIcon"
      class="ui-alert__prepend"
    >
      <div class="ui-alert__icon">
        <UiIcon
          :name="leftIcon"
          size="custom"
        />
      </div>
    </div>
    <div
      v-else-if="$slots.prepend"
      class="ui-alert__prepend"
    >
      <slot name="prepend" />
    </div>

    <UiText
      size="m"
      responsive
      class="ui-alert__content"
    >
      <slot />
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    theme: {
      type: String,
      default: 'info'
    },

    leftIcon: {
      type: String,
      default: undefined
    }
  }
})
export default class Alert extends Vue {
  readonly theme:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'

  readonly leftIcon?: string
}
</script>

<style lang="scss" src="./Alert.scss" />
