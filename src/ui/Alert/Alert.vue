<script lang="ts" setup>
type theme =
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

defineProps({
  theme: {
    type: String as theme,
    default: 'info',
  },

  leftIcon: {
    type: String,
    default: undefined,
  },
})
</script>

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

    <div
      v-if="$slots.append"
      class="ui-alert__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss" src="./Alert.scss" />
