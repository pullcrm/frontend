<script lang="ts" setup>
defineEmits(['back'])
</script>

<template>
  <UiText
    class="ui-back"
    tag="a"
    href="#"
    size="s"
    data-test="back-button"
    @click.prevent="$emit('back')"
  >
    <template #prepend>
      <UiIcon
        name="outlined/arrow-left"
        size="xs"
      />
    </template>

    Назад
  </UiText>
</template>

<style lang="scss">
  .ui-back {
    color: $ui-black-80;
    cursor: pointer;
  }
</style>
