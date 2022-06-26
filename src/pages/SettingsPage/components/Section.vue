<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  subTitle: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <div class="settings-page-section">
    <div class="settings-page-section__text">
      <UiText
        size="l"
        responsive
        class="settings-page-section__title"
      >
        {{ title }}
      </UiText>

      <UiText
        v-if="subTitle"
        size="m"
        responsive
        class="settings-page-section__sub-title"
      >
        {{ subTitle }}
      </UiText>
    </div>

    <div
      v-if="$slots.append"
      class="settings-page-section__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss" src="./Section.scss"></style>
