<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpened = ref(true)
</script>

<template>
  <div class="base-widget-procedures-group">
    <UiText
      tag="a"
      href="#"
      size="l"
      responsive
      :right-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
      class="base-widget-procedures-group__title"
      @click.prevent="isOpened = !isOpened"
    >
      {{ title }}
    </UiText>

    <div
      v-show="isOpened"
      class="base-widget-procedures-group__inner"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="./ProceduresGroup.scss"></style>
