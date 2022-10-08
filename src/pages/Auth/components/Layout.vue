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
  <div class="auth-page-layout">
    <div class="auth-page-layout__inner">
      <div class="auth-page-layout__header">
        <img
          class="auth-page-layout__logo"
          src="/static/img/logo.svg"
        >

        <UiTitle
          size="xl"
          responsive
        >
          {{ title }}
        </UiTitle>

        <UiText
          size="m"
          responsive
        >
          {{ subTitle }}
        </UiText>
      </div>

      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="./Layout.scss"></style>
